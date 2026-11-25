import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import {spawnSync} from "node:child_process";

const root = process.cwd();
const mode = process.argv[2] ?? "all";
const videoId = process.argv[3] ?? process.env.VIDEO_ID;

if (!videoId) {
  console.error("Uso: npm run render:long -- <video-id>  (o define VIDEO_ID)");
  process.exit(1);
}

const storyboardPath = join(root, "data", videoId, "storyboard.json");
const modulesPath = join(root, "data", videoId, "modules.json");
const fps = existsSync(storyboardPath)
  ? (JSON.parse(readFileSync(storyboardPath, "utf8")).fps ?? 30)
  : 30;

const run = (args) => {
  const result = spawnSync("npx", ["remotion", ...args], {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

const toFrames = (seconds) => Math.round(seconds * fps);

const readModules = () => {
  if (!existsSync(modulesPath)) return null;
  const data = JSON.parse(readFileSync(modulesPath, "utf8"));
  return Array.isArray(data) ? data : (data.modules ?? []);
};

const writeChapters = (modules) => {
  mkdirSync(join(root, "out"), {recursive: true});
  const lines = modules.map((module) => {
    const total = Math.max(0, Math.floor(module.start));
    const mm = String(Math.floor(total / 60)).padStart(2, "0");
    const ss = String(total % 60).padStart(2, "0");
    return `${mm}:${ss} ${module.title ?? module.id}`;
  });
  const chaptersPath = join(root, "out", `${videoId}-chapters.txt`);
  writeFileSync(chaptersPath, `${lines.join("\n")}\n`, "utf8");
  console.log(`Capítulos: ${chaptersPath}`);
};

const renderLong = () => {
  mkdirSync(join(root, "out"), {recursive: true});
  run(["render", `${videoId}-16x9`, `out/${videoId}-16x9.mp4`]);
};

const renderVertical = () => {
  mkdirSync(join(root, "out"), {recursive: true});
  run(["render", `${videoId}-9x16`, `out/${videoId}-9x16.mp4`]);
};

const renderDraft = () => {
  mkdirSync(join(root, "out", "draft"), {recursive: true});
  run(["render", `${videoId}-16x9`, `out/draft/${videoId}-16x9-draft.mp4`, "--scale=0.5"]);
};

const renderClips = () => {
  const modules = readModules();
  if (!modules) {
    console.log("No hay modules.json: se omiten los clips.");
    return;
  }
  mkdirSync(join(root, "out", "clips"), {recursive: true});

  for (const module of modules) {
    if (module.clip === false) continue;
    const from = toFrames(module.start);
    const to = toFrames(module.end);
    run([
      "render",
      `${videoId}-9x16`,
      `out/clips/${module.id}-9x16.mp4`,
      `--frames=${from}-${to}`,
    ]);
  }
};

if (mode === "long" || mode === "all") {
  renderLong();
}
if (mode === "vertical" || mode === "all") {
  renderVertical();
}
if (mode === "clips" || mode === "all") {
  renderClips();
}
if (mode === "draft") {
  renderDraft();
}

const modules = readModules();
if (modules) {
  writeChapters(modules);
}
