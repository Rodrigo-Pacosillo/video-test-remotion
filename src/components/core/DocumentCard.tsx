import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Icon} from "../ui/Icon";
import {Text} from "./Text";

type Props = {
  filename: string;
  lines: readonly string[];
  accent?: string;
};

/** Tarjeta de documento real; no es una ventana de terminal. */
export const DocumentCard: FC<Props> = ({filename, lines, accent = theme.colors.green}) => {
  const {u} = useLayout();

  return (
    <div
      style={{
        width: "100%",
        borderRadius: u * 2,
        background: "linear-gradient(180deg, rgba(30,39,56,0.98), rgba(13,18,26,0.98))",
        border: `${u * 0.2}px solid ${theme.colors.border}`,
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        padding: u * 3,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: u * 2,
      }}
    >
      <div style={{display: "flex", alignItems: "center", gap: u * 1.4}}>
        <Icon name="file" size={u * 4} color={accent} />
        <Text token="label" mono color={theme.colors.text}>
          {filename}
        </Text>
      </div>
      <div style={{height: u * 0.25, background: `linear-gradient(90deg, ${accent}, transparent)`, opacity: 0.8}} />
      <div style={{display: "flex", flexDirection: "column", gap: u * 1.2}}>
        {lines.map((line) => (
          <Text key={line} token="code" color={theme.colors.text} style={{whiteSpace: "normal"}}>
            {line}
          </Text>
        ))}
      </div>
    </div>
  );
};
