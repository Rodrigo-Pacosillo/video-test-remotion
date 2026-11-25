import type {FC} from "react";

export type IconName =
  | "eye"
  | "pencil"
  | "terminal"
  | "loop"
  | "branch"
  | "lock"
  | "clock"
  | "folder"
  | "file"
  | "trash"
  | "shield"
  | "package"
  | "check"
  | "x"
  | "bolt"
  | "database"
  | "cloud"
  | "plug"
  | "cursor"
  | "key"
  | "spark"
  | "download"
  | "arrow-right"
  | "arrow-down";

type Props = {
  name: IconName;
  size: number;
  color?: string;
  strokeWidth?: number;
};

/** Iconos de línea, dibujados en SVG para mantener el render vectorial. */
export const Icon: FC<Props> = ({name, size, color = "currentColor", strokeWidth = 2}) => {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {name === "eye" ? (
        <>
          <path {...common} d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle {...common} cx="12" cy="12" r="3" />
        </>
      ) : null}
      {name === "pencil" ? (
        <>
          <path {...common} d="M4 20l4.5-1 9-9a2.1 2.1 0 0 0-3-3l-9 9L4 20Z" />
          <path {...common} d="M14.5 6.5l3 3" />
        </>
      ) : null}
      {name === "terminal" ? (
        <>
          <rect {...common} x="3" y="4" width="18" height="16" rx="2" />
          <path {...common} d="M7 9l3 3-3 3" />
          <path {...common} d="M13 15h4" />
        </>
      ) : null}
      {name === "loop" ? (
        <>
          <path {...common} d="M20 11a8 8 0 0 0-14-4L4 9" />
          <path {...common} d="M4 4v5h5" />
          <path {...common} d="M4 13a8 8 0 0 0 14 4l2-2" />
          <path {...common} d="M20 20v-5h-5" />
        </>
      ) : null}
      {name === "branch" ? (
        <>
          <circle {...common} cx="6" cy="6" r="2" />
          <circle {...common} cx="18" cy="6" r="2" />
          <circle {...common} cx="12" cy="18" r="2" />
          <path {...common} d="M6 8v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
          <path {...common} d="M12 12v4" />
        </>
      ) : null}
      {name === "lock" ? (
        <>
          <rect {...common} x="5" y="10" width="14" height="10" rx="2" />
          <path {...common} d="M8 10V7a4 4 0 0 1 8 0v3" />
        </>
      ) : null}
      {name === "clock" ? (
        <>
          <circle {...common} cx="12" cy="12" r="9" />
          <path {...common} d="M12 7v5l3 2" />
        </>
      ) : null}
      {name === "folder" ? (
        <path {...common} d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      ) : null}
      {name === "file" ? (
        <>
          <path {...common} d="M6 3h8l4 4v14H6V3Z" />
          <path {...common} d="M14 3v5h5" />
        </>
      ) : null}
      {name === "trash" ? (
        <>
          <path {...common} d="M4 7h16" />
          <path {...common} d="M9 7V5h6v2" />
          <path {...common} d="M7 7l1 13h8l1-13" />
          <path {...common} d="M10 11v5M14 11v5" />
        </>
      ) : null}
      {name === "shield" ? (
        <path {...common} d="M12 3l8 3v6c0 4.5-3.5 7.5-8 9-4.5-1.5-8-4.5-8-9V6l8-3Z" />
      ) : null}
      {name === "package" ? (
        <>
          <path {...common} d="M21 8l-9-5-9 5 9 5 9-5Z" />
          <path {...common} d="M3 8v8l9 5 9-5V8" />
          <path {...common} d="M12 13v8" />
        </>
      ) : null}
      {name === "check" ? <path {...common} d="M5 12l4 4L19 6" /> : null}
      {name === "x" ? <path {...common} d="M6 6l12 12M18 6L6 18" /> : null}
      {name === "bolt" ? <path {...common} d="M13 2L4 14h6l-1 8 9-12h-6l1-8Z" /> : null}
      {name === "database" ? (
        <>
          <ellipse {...common} cx="12" cy="5" rx="8" ry="3" />
          <path {...common} d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path {...common} d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </>
      ) : null}
      {name === "cloud" ? (
        <path {...common} d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4.5 4.5 0 1 1 17 18H7Z" />
      ) : null}
      {name === "plug" ? (
        <>
          <path {...common} d="M9 3v5M15 3v5" />
          <path {...common} d="M6 8h12v3a6 6 0 0 1-12 0V8Z" />
          <path {...common} d="M12 17v4" />
        </>
      ) : null}
      {name === "cursor" ? (
        <path fill={color} d="M5 3l14 7-6 2-2 6-6-15Z" />
      ) : null}
      {name === "key" ? (
        <>
          <circle {...common} cx="8" cy="15" r="4" />
          <path {...common} d="M11 12l9-9M17 3l3 3M14 6l3 3" />
        </>
      ) : null}
      {name === "spark" ? (
        <>
          <path {...common} d="M12 2v5M12 17v5M2 12h5M17 12h5" />
          <path {...common} d="M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
        </>
      ) : null}
      {name === "download" ? (
        <>
          <path {...common} d="M12 3v12" />
          <path {...common} d="M7 10l5 5 5-5" />
          <path {...common} d="M4 21h16" />
        </>
      ) : null}
      {name === "arrow-right" ? (
        <>
          <path {...common} d="M4 12h16" />
          <path {...common} d="M14 6l6 6-6 6" />
        </>
      ) : null}
      {name === "arrow-down" ? (
        <>
          <path {...common} d="M12 4v16" />
          <path {...common} d="M6 14l6 6 6-6" />
        </>
      ) : null}
    </svg>
  );
};
