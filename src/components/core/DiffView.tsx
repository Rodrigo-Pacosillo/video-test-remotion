import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Text} from "./Text";
import {Window} from "./Window";

export type DiffLine = {
  type: "add" | "remove" | "context";
  line: number;
  text: string;
};

type Props = {
  filename: string;
  lines: readonly DiffLine[];
};

/** Diff real con números de línea, añadidas en verde y eliminadas en rojo. */
export const DiffView: FC<Props> = ({filename, lines}) => {
  const {u, orientation} = useLayout();
  const codeSize = u * (orientation === "portrait" ? theme.text.codeMin : theme.text.code);

  return (
    <Window title={`${filename} · diff`}>
      <div style={{display: "flex", flexDirection: "column", gap: u * 0.5}}>
        {lines.map((line, index) => {
          const color =
            line.type === "add" ? theme.colors.green : line.type === "remove" ? theme.colors.red : theme.colors.text2;
          const sign = line.type === "add" ? "+" : line.type === "remove" ? "-" : " ";
          return (
            <div
              key={index}
              style={{
                display: "flex",
                gap: u * 1,
                padding: `${u * 0.35}px ${u * 0.8}px`,
                borderRadius: u * 0.4,
                backgroundColor:
                  line.type === "add" ? `${theme.colors.green}18` : line.type === "remove" ? `${theme.colors.red}18` : "transparent",
              }}
            >
              <Text token="caption" color={theme.colors.text2} mono style={{width: u * 4, textAlign: "right", flexShrink: 0}}>
                {String(line.line)}
              </Text>
              <span
                style={{
                  fontFamily: theme.fonts.mono,
                  fontSize: codeSize,
                  lineHeight: 1.45,
                  color,
                  whiteSpace: orientation === "portrait" ? "pre-wrap" : "pre",
                  overflowWrap: "anywhere",
                }}
              >
                {sign} {line.text}
              </span>
            </div>
          );
        })}
      </div>
    </Window>
  );
};
