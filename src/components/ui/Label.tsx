import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";

type Props = {
  text: string;
  accent?: string;
  muted?: boolean;
};

/** Etiqueta corta de concepto: la única clase de texto permitida además de marcas. */
export const Label: FC<Props> = ({text, accent = theme.colors.accent, muted = false}) => {
  const {u} = useLayout();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: u * 0.8,
        padding: `${u * 0.45}px ${u * 1.25}px`,
        borderRadius: u * 5,
        backgroundColor: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: u * 0.65,
          height: u * 0.65,
          borderRadius: "50%",
          backgroundColor: muted ? theme.colors.textMuted : accent,
          boxShadow: muted ? "none" : `0 0 ${u * 1.2}px ${accent}`,
        }}
      />
      <span
        style={{
          fontFamily: theme.fonts.sans,
          fontSize: u * 1.15,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: muted ? theme.colors.textMuted : theme.colors.text,
        }}
      >
        {text}
      </span>
    </div>
  );
};
