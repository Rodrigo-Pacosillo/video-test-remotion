import type {FC} from "react";
import type {Caption} from "@remotion/captions";
import {useCurrentFrame} from "remotion";
import {useLayout} from "../layout";
import {theme} from "../theme";

type Props = {
  /** Caption[] en milisegundos, convertido desde words.json. */
  captions: readonly Caption[];
  maxWords?: number;
};

/** Subtítulos dentro de la zona segura; resalta la palabra activa por frame. */
export const Captions: FC<Props> = ({captions, maxWords = 2}) => {
  const frame = useCurrentFrame();
  const {fps, u, safeInset, orientation} = useLayout();
  const nowMs = (frame / fps) * 1000;
  const currentIndex = captions.findIndex((c) => c.startMs <= nowMs && nowMs <= c.endMs);
  const start = currentIndex < 0 ? 0 : Math.max(0, currentIndex - 1);
  const window = captions.slice(start, start + maxWords);
  const fontSize = u * (orientation === "portrait" ? theme.fontSizesU.captionPortrait : theme.fontSizesU.captionLandscape);

  return (
    <div
      style={{
        position: "absolute",
        left: safeInset.left,
        right: safeInset.right,
        bottom: safeInset.bottom,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          padding: `${u * theme.spacingU.xs}px ${u * theme.spacingU.sm}px`,
          backgroundColor: "rgba(11, 15, 20, 0.82)",
          borderRadius: u * theme.radiiU.chip,
          fontFamily: theme.fonts.sans,
          fontSize,
          fontWeight: 600,
          lineHeight: 1.35,
          textAlign: "center",
        }}
      >
        {window.map((caption, i) => {
          const active = caption.startMs <= nowMs && nowMs <= caption.endMs;
          return (
            <span
              key={`${caption.startMs}-${i}`}
              style={{
                color: active ? theme.colors.text : theme.colors.textMuted,
                opacity: active ? 1 : 0.6,
              }}
            >
              {caption.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
