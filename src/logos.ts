/**
 * Registro de logos disponibles.
 * Los SVG se copiaron de @lobehub/icons-static-svg (IA/LLM) y simple-icons (tecnología).
 * Se muestran sobre un contenedor claro neutro para respetar el color original.
 */
export type LogoSource = "lobehub" | "simple-icons";

export type LogoEntry = {
  readonly name: string;
  readonly file: string;
  readonly source: LogoSource;
};

export const logos: Readonly<Record<string, LogoEntry>> = {
  openai: {name: "OpenAI", file: "assets/logos/openai.svg", source: "lobehub"},
  anthropic: {name: "Anthropic", file: "assets/logos/anthropic.svg", source: "lobehub"},
  gemini: {name: "Gemini", file: "assets/logos/gemini.svg", source: "lobehub"},
  meta: {name: "Meta", file: "assets/logos/meta.svg", source: "lobehub"},
  mistral: {name: "Mistral", file: "assets/logos/mistral.svg", source: "lobehub"},
  deepseek: {name: "DeepSeek", file: "assets/logos/deepseek.svg", source: "lobehub"},
  github: {name: "GitHub", file: "assets/logos/github.svg", source: "simple-icons"},
  postgresql: {name: "PostgreSQL", file: "assets/logos/postgresql.svg", source: "simple-icons"},
  googlecloud: {name: "Google Cloud", file: "assets/logos/googlecloud.svg", source: "simple-icons"},
  typescript: {name: "TypeScript", file: "assets/logos/typescript.svg", source: "simple-icons"},
  react: {name: "React", file: "assets/logos/react.svg", source: "simple-icons"},
  nodedotjs: {name: "Node.js", file: "assets/logos/nodedotjs.svg", source: "simple-icons"},
  google: {name: "Google", file: "assets/logos/google.svg", source: "simple-icons"},
};

export const getLogo = (key: string): LogoEntry | undefined => logos[key];
