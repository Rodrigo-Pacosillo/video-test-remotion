import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Icon} from "./Icon";

type Props = {
  text: string;
  active?: boolean;
  fontU?: number;
  maxWidthU?: number;
};

/** Tarjeta pequeña del prompt; ancla visual que se mantiene en el recorrido. */
export const PromptChip: FC<Props> = ({text, active = false, fontU = 1.55, maxWidthU = 48}) => {
  const {u} = useLayout();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: u * 1,
        padding: `${u * 0.8}px ${u * 1.4}px`,
        borderRadius: u * 1.1,
        maxWidth: u * maxWidthU,
        background: "linear-gradient(180deg, rgba(29,39,51,0.96), rgba(15,21,28,0.96))",
        border: `${u * 0.14}px solid ${active ? theme.colors.accent : "rgba(255,255,255,0.1)"}`,
        boxShadow: active
          ? `0 0 ${u * 2.6}px ${theme.colors.accent}44`
          : "0 8px 24px rgba(0,0,0,0.3)",
      }}
    >
      <Icon name="terminal" size={u * 1.9} color={active ? theme.colors.accent : theme.colors.textMuted} />
      <span
        style={{
          fontFamily: theme.fonts.mono,
          fontSize: u * fontU,
          color: theme.colors.text,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </span>
    </div>
  );
};
