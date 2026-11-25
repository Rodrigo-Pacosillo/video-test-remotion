/**
 * Tokens del sistema de diseño. Las escenas y componentes no definen tamaños
 * propios: todo sale de aquí y se expresa en múltiplos de `u`.
 */
export type Orientation = "landscape" | "portrait";

export const theme = {
  fps: 30,
  colors: {
    bg: "#0B0F17",
    surface: "#1E2738",
    surface2: "#263247",
    border: "#3A4A66",
    text: "#F2F5FA",
    text2: "#A9B4C7",
    cyan: "#38BDF8",
    green: "#34D399",
    red: "#F43F5E",
    amber: "#FBBF24",
    violet: "#A78BFA",
    // Alias heredados para componentes antiguos que aún no se migraron.
    background: "#0B0F17",
    surfaceAlt: "#263247",
    textMuted: "#A9B4C7",
    accent: "#38BDF8",
    accentAlt: "#F43F5E",
    success: "#34D399",
    warning: "#FBBF24",
    danger: "#F43F5E",
    codeAdded: "#123B2A",
    codeRemoved: "#3A1620",
  },
  fonts: {
    sans: "Inter",
    mono: "JetBrains Mono",
  },
  /** Escala tipográfica única (en unidades `u`). */
  text: {
    display: 9,
    title: 6.5,
    label: 4,
    labelMin: 3.5,
    caption: 3.2,
    code: 3.4,
    codeMin: 3,
  },
  /** Escala heredada: se mantiene para los componentes en migración. */
  fontSizesU: {
    title: 6.5,
    subtitle: 4,
    body: 4,
    captionLandscape: 3.2,
    captionPortrait: 3.6,
    codeLandscape: 3.4,
    codePortrait: 3.6,
  },
  elements: {
    logo: 16,
    logoMin: 14,
    icon: 5,
    nodeHeight: 9,
    connector: 0.6,
    gap: 2,
  },
  radiiU: {
    card: 1.4,
    chip: 0.8,
  },
  spacingU: {
    xs: 0.8,
    sm: 1.6,
    md: 3,
    lg: 5,
  },
  transitionFrames: {
    default: 12,
    fast: 8,
  },
  safe: {
    landscape: {top: 0.05, right: 0.05, bottom: 0.05, left: 0.05},
    portrait: {top: 0.1, right: 0.12, bottom: 0.2, left: 0.06},
  },
} as const;

/** Máximo de elementos principales simultáneos en vertical. */
export const MAX_ELEMENTS_PORTRAIT = 4;
