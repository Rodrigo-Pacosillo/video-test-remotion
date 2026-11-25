import type {FC, ReactNode} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Text} from "./Text";
import {Window} from "./Window";

type Props = {
  /** Código real y correcto. No se admite contenido de relleno. */
  code: string;
  filename: string;
  highlight?: readonly number[];
  maxLines?: number;
};

const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "const",
  "let",
  "var",
  "function",
  "return",
  "async",
  "await",
  "if",
  "else",
  "new",
  "type",
  "interface",
  "extends",
  "implements",
  "class",
  "true",
  "false",
  "null",
  "undefined",
]);

const tokenize = (line: string): ReactNode[] => {
  const parts = line.split(
    /(\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b[A-Za-z_$][\w$]*\b|\b\d+(?:\.\d+)?\b)/g,
  );

  return parts.map((part, index) => {
    if (!part) return null;
    let color: string = theme.colors.text;
    if (part.startsWith("//")) color = theme.colors.text2;
    else if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) color = theme.colors.green;
    else if (/^\d/.test(part)) color = theme.colors.amber;
    else if (KEYWORDS.has(part)) color = theme.colors.cyan;
    else if (/^[A-Z]/.test(part)) color = theme.colors.violet;
    return (
      <span key={index} style={{color}}>
        {part}
      </span>
    );
  });
};

/** Código real con tokenizador propio, números de línea y resaltado temporal. */
export const CodeBlock: FC<Props> = ({code, filename, highlight = [], maxLines}) => {
  const {u, orientation} = useLayout();
  const limit = maxLines ?? (orientation === "portrait" ? 8 : 12);
  const lines = code.split("\n").slice(0, limit);
  const codeSize = u * (orientation === "portrait" ? theme.text.codeMin : theme.text.code);

  return (
    <Window title={filename}>
      <div style={{display: "flex", flexDirection: "column", gap: u * 0.7}}>
        {lines.map((line, index) => {
          const active = highlight.includes(index + 1);
          return (
            <div
              key={index}
              style={{
                display: "flex",
                gap: u * 1.2,
                padding: `${u * 0.4}px ${u * 0.8}px`,
                borderRadius: u * 0.5,
                backgroundColor: active ? `${theme.colors.cyan}18` : "transparent",
                borderLeft: `${u * 0.3}px solid ${active ? theme.colors.cyan : "transparent"}`,
              }}
            >
              <Text token="caption" color={theme.colors.text2} mono style={{width: u * 4, textAlign: "right", flexShrink: 0}}>
                {String(index + 1)}
              </Text>
              <div
                style={{
                  fontFamily: theme.fonts.mono,
                  fontSize: codeSize,
                  lineHeight: 1.45,
                  whiteSpace: orientation === "portrait" ? "pre-wrap" : "pre",
                  overflowWrap: "anywhere",
                  overflow: orientation === "portrait" ? "visible" : "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {line ? tokenize(line) : "\u00A0"}
              </div>
            </div>
          );
        })}
      </div>
    </Window>
  );
};
