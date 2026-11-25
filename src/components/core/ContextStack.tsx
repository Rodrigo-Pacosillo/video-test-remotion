import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Text} from "./Text";

export type ContextBlock = {
  label: string;
  content: string;
};

type Props = {
  blocks: readonly ContextBlock[];
  fill: number;
  colors?: readonly string[];
  rowHeightU?: number;
};

/** Contenedor de contexto: bloques reales y medidor de capacidad, sin chrome de ventana. */
export const ContextStack: FC<Props> = ({
  blocks,
  fill,
  colors,
  rowHeightU = 10,
}) => {
  const {u} = useLayout();
  const palette = colors ?? blocks.map(() => theme.colors.cyan);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: u * 2,
        background: "linear-gradient(180deg, rgba(30,39,56,0.98), rgba(13,18,26,0.98))",
        border: `${u * 0.2}px solid ${theme.colors.border}`,
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        padding: u * 2.4,
        display: "flex",
        gap: u * 2.4,
        boxSizing: "border-box",
      }}
    >
      <div style={{flex: 1, display: "flex", flexDirection: "column", gap: u * 1.4, minWidth: 0}}>
        {blocks.map((block, index) => (
          <div
            key={block.label}
            style={{
              minHeight: u * rowHeightU,
              display: "flex",
              alignItems: "baseline",
              gap: u * 2,
              padding: `${u * 0.8}px ${u * 1.2}px`,
              borderRadius: u * 0.8,
              backgroundColor: theme.colors.surface2,
              borderLeft: `${u * 0.5}px solid ${palette[index] ?? theme.colors.cyan}`,
            }}
          >
            <Text token="label" color={palette[index] ?? theme.colors.cyan} style={{width: u * 18, flexShrink: 0}}>
              {block.label}
            </Text>
            <Text token="caption" color={theme.colors.text2} style={{whiteSpace: "normal"}}>
              {block.content}
            </Text>
          </div>
        ))}
      </div>
      <div
        style={{
          width: u * 3.2,
          borderRadius: u * 0.6,
          backgroundColor: theme.colors.bg,
          border: `${u * 0.15}px solid ${theme.colors.border}`,
          padding: u * 0.4,
          display: "flex",
          flexDirection: "column-reverse",
          gap: u * 0.3,
        }}
      >
        {Array.from({length: 12}, (_, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              borderRadius: u * 0.2,
              backgroundColor: index < Math.round(Math.min(1, fill) * 12) ? theme.colors.cyan : theme.colors.surface2,
            }}
          />
        ))}
      </div>
    </div>
  );
};
