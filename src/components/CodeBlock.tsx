import type {FC} from "react";
import {useLayout} from "../layout";
import {theme} from "../theme";

type Props = {
  lines: readonly string[];
  /** Números de línea (1-based) a resaltar. */
  highlightedLines?: readonly number[];
  title?: string;
};

/** Bloque de código: ventana ancha en 16:9, ventana foco en 9:16. */
export const CodeBlock: FC<Props> = ({lines, highlightedLines = [], title}) => {
  const {orientation, u} = useLayout();
  const maxLines = orientation === "portrait" ? 4 : 8;
  const visible = lines.slice(0, maxLines);
  const fontSize =
    u *
    (orientation === "portrait" ? theme.fontSizesU.codePortrait : theme.fontSizesU.codeLandscape);

  return (
    <div
      style={{
        width: "100%",
        padding: u * theme.spacingU.md,
        backgroundColor: theme.colors.surface,
        border: `${u * 0.15}px solid ${theme.colors.border}`,
        borderRadius: u * theme.radiiU.card,
        fontFamily: theme.fonts.mono,
        fontSize,
        color: theme.colors.text,
        lineHeight: 1.5,
      }}
    >
      {title ? (
        <div
          style={{
            marginBottom: u * theme.spacingU.sm,
            color: theme.colors.textMuted,
            fontSize: fontSize * 0.8,
          }}
        >
          {title}
        </div>
      ) : null}
      {visible.map((line, i) => {
        const highlighted = highlightedLines.includes(i + 1);
        return (
          <div
            key={i}
            style={{
              padding: `0 ${u * theme.spacingU.xs}px`,
              backgroundColor: highlighted ? theme.colors.codeAdded : "transparent",
              borderLeft: `${u * 0.3}px solid ${highlighted ? theme.colors.success : "transparent"}`,
              whiteSpace: "pre",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {line === "" ? "\u00A0" : line}
          </div>
        );
      })}
    </div>
  );
};
