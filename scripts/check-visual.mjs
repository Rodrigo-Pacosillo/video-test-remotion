import {existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync} from "node:fs";
import {join, relative} from "node:path";
import {bundle} from "@remotion/bundler";
import {renderStill, selectComposition} from "@remotion/renderer";
import sharp from "sharp";

const root = process.cwd();
const videoId = process.argv[2] ?? "recorrido-de-un-prompt";
const outputRoot = join(root, "out", "check", videoId);
const stillsRoot = join(outputRoot, "stills");

const COMPOSITIONS = [
  {id: `${videoId}-16x9`, orientation: "landscape"},
  {id: `${videoId}-9x16`, orientation: "portrait"},
];

const SCENES = [
  {id: 1, start: 0, end: 222},
  {id: 2, start: 222, end: 555},
  {id: 3, start: 555, end: 1170},
  {id: 4, start: 1170, end: 1734},
  {id: 5, start: 1734, end: 2034},
  {id: 6, start: 2034, end: 2430},
  {id: 7, start: 2430, end: 2706},
  {id: 8, start: 2706, end: 3117},
];

const SAFE = {
  landscape: {top: 0.05, bottom: 0.05, left: 0.05, right: 0.05},
  portrait: {top: 0.1, bottom: 0.2, left: 0.06, right: 0.12},
};

const LIMITS = {
  landscape: {width: 0.6, height: 0.45, centerX: 0.08, centerY: 0.1},
  portrait: {width: 0.75, height: 0.4, centerX: 0.08, centerY: 0.1},
};

const BANNED = [
  [/transition\s*:/, "CSS transition"],
  [/animation\s*:/, "CSS animation"],
  [/@keyframes/, "CSS keyframes"],
  [/setTimeout\s*\(/, "setTimeout"],
  [/setInterval\s*\(/, "setInterval"],
  [/Math\.random\s*\(/, "Math.random"],
  [/Date\.now\s*\(/, "Date.now"],
  [/fetch\s*\(/, "fetch"],
  [/https?:\/\//, "URL de red"],
  [/lorem/i, "lorem ipsum"],
  [/placeholder/i, "placeholder"],
  [/\bTODO\b/, "TODO"],
  [/\bxxx\b/i, "xxx"],
  [/fontSize\s*:\s*\d/, "fontSize literal"],
];

const walk = (dir) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(tsx?|jsx?)$/.test(entry.name) ? [full] : [];
  });
};

const staticLint = () => {
  const files = [
    ...walk(join(root, "src", "scenes")),
    ...walk(join(root, "src", "templates")),
    ...walk(join(root, "src", "components", "core")),
  ];
  const violations = [];
  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      for (const [pattern, label] of BANNED) {
        if (pattern.test(line)) {
          violations.push({file: relative(root, file), line: index + 1, label});
        }
      }
    });
  }
  return {files: files.length, violations};
};

const measure = async (file, orientation, u) => {
  const {data, info} = await sharp(file).raw().toBuffer({resolveWithObject: true});
  const bg = [11, 15, 23];
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      const diff = Math.max(
        Math.abs(data[i] - bg[0]),
        Math.abs(data[i + 1] - bg[1]),
        Math.abs(data[i + 2] - bg[2]),
      );
      if (diff > 14) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) {
    return {status: "FAIL", reason: "sin contenido visible", widthRatio: 0, heightRatio: 0};
  }

  const s = SAFE[orientation];
  const safe = {
    x: info.width * s.left,
    y: info.height * s.top,
    w: info.width * (1 - s.left - s.right),
    h: info.height * (1 - s.top - s.bottom),
  };
  const widthRatio = (maxX - minX + 1) / safe.w;
  const heightRatio = (maxY - minY + 1) / safe.h;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const offsetX = Math.abs(centerX - (safe.x + safe.w / 2)) / safe.w;
  const offsetY = Math.abs(centerY - (safe.y + safe.h / 2)) / safe.h;
  const edge = Math.round((Math.min(minX - safe.x, safe.x + safe.w - maxX, minY - safe.y, safe.y + safe.h - maxY) / u) * 10) / 10;
  const limit = LIMITS[orientation];
  const failures = [];
  if (widthRatio < limit.width) failures.push(`ancho ${(widthRatio * 100).toFixed(1)}%`);
  if (heightRatio < limit.height) failures.push(`alto ${(heightRatio * 100).toFixed(1)}%`);
  if (offsetX > limit.centerX) failures.push(`centro X ${(offsetX * 100).toFixed(1)}%`);
  if (offsetY > limit.centerY) failures.push(`centro Y ${(offsetY * 100).toFixed(1)}%`);
  if (edge < 4) failures.push(`borde ${edge.toFixed(1)}u`);

  const status = failures.length === 0 ? "PASS" : failures.length <= 2 ? "WARN" : "FAIL";
  return {
    status,
    reason: failures.join(", ") || "ok",
    widthRatio,
    heightRatio,
    offsetX,
    offsetY,
    edge,
  };
};

const contactSheet = async (files, orientation, target) => {
  const landscape = orientation === "landscape";
  const thumbW = landscape ? 320 : 180;
  const thumbH = landscape ? 180 : 320;
  const cols = landscape ? 3 : 6;
  const gap = 12;
  const rows = Math.ceil(files.length / cols);
  const thumbs = await Promise.all(
    files.map((file) => sharp(file).resize(thumbW, thumbH, {fit: "cover"}).toBuffer()),
  );
  const sheet = sharp({
    create: {
      width: gap + cols * (thumbW + gap),
      height: gap + rows * (thumbH + gap),
      channels: 3,
      background: "#0B0F17",
    },
  });
  await sheet
    .composite(
      thumbs.map((input, index) => ({
        input,
        left: gap + (index % cols) * (thumbW + gap),
        top: gap + Math.floor(index / cols) * (thumbH + gap),
      })),
    )
    .png()
    .toFile(target);
};

const main = async () => {
  mkdirSync(stillsRoot, {recursive: true});
  const lint = staticLint();
  const serveUrl = await bundle({entryPoint: join(root, "src", "index.ts")});
  const rows = [];
  const allStills = {landscape: [], portrait: []};

  for (const compositionInfo of COMPOSITIONS) {
    const composition = await selectComposition({
      serveUrl,
      id: compositionInfo.id,
      inputProps: {checkMode: true},
    });
    const u = Math.min(composition.width, composition.height) / 100;

    for (const scene of SCENES) {
      for (const ratio of [0.2, 0.5, 0.85]) {
        const frame = Math.round(scene.start + (scene.end - scene.start) * ratio);
        const output = join(stillsRoot, `${compositionInfo.orientation}-s${scene.id}-f${frame}.png`);
        await renderStill({
          composition,
          serveUrl,
          output,
          frame,
          imageFormat: "png",
          inputProps: {checkMode: true},
        });
        allStills[compositionInfo.orientation].push(output);
        const metrics = await measure(output, compositionInfo.orientation, u);
        rows.push({scene: scene.id, orientation: compositionInfo.orientation, frame, ...metrics});
      }
    }
  }

  const reportLines = [
    `# Verificación visual · ${videoId}`,
    "",
    `Lint estático: ${lint.violations.length === 0 ? "sin violaciones" : `${lint.violations.length} violaciones`}`,
    "",
  ];
  if (lint.violations.length > 0) {
    reportLines.push("## Lint estático", "");
    for (const violation of lint.violations) {
      reportLines.push(`- ${violation.file}:${violation.line} · ${violation.label}`);
    }
    reportLines.push("");
  }

  reportLines.push("## Medición de stills", "", "| Escena | Formato | Frame | Ancho | Alto | Centro X | Centro Y | Borde | Estado |", "|---|---|---|---|---|---|---|---|---|");
  for (const row of rows) {
    reportLines.push(
      `| ${row.scene} | ${row.orientation} | ${row.frame} | ${(row.widthRatio * 100).toFixed(1)}% | ${(row.heightRatio * 100).toFixed(1)}% | ${(row.offsetX * 100).toFixed(1)}% | ${(row.offsetY * 100).toFixed(1)}% | ${row.edge?.toFixed(1) ?? "-"}u | **${row.status}** ${row.reason} |`,
    );
  }

  writeFileSync(join(outputRoot, "report.md"), reportLines.join("\n"), "utf8");
  await contactSheet(allStills.landscape, "landscape", join(outputRoot, "sheet-16x9.png"));
  await contactSheet(allStills.portrait, "portrait", join(outputRoot, "sheet-9x16.png"));

  const count = (status) => rows.filter((row) => row.status === status).length;
  console.log(`Lint: ${lint.violations.length} violaciones`);
  console.log(`Stills: ${rows.length} · PASS ${count("PASS")} · WARN ${count("WARN")} · FAIL ${count("FAIL")}`);
  console.log(`Reporte: ${join(outputRoot, "report.md")}`);
  if (count("FAIL") > 0 || lint.violations.length > 0) process.exit(1);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
