import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";

type Props = {
  press: number;
  sizeU?: number;
};

/** Tecla enter estilizada; `press` va de 0 a 1. */
export const KeyCap: FC<Props> = ({press, sizeU = 6}) => {
  const {u} = useLayout();
  const size = u * sizeU;
  const clamped = Math.max(0, Math.min(1, press));

  return (
    <div
      style={{
        width: size,
        height: size * 0.9,
        borderRadius: u * 1.2,
        border: `${u * 0.12}px solid rgba(255,255,255,0.14)`,
        background: "linear-gradient(180deg, #2A3746, #151C26)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 ${u * 0.55}px 0 #070A0E, 0 0 ${u * 2.2}px ${theme.colors.accent}${clamped > 0.2 ? "88" : "22"}`,
        translate: `0px ${clamped * u * 0.45}px`,
        scale: 1 - clamped * 0.05,
      }}
    >
      <span
        style={{
          fontFamily: theme.fonts.mono,
          fontSize: size * 0.36,
          color: theme.colors.accent,
          lineHeight: 1,
        }}
      >
        ↵
      </span>
    </div>
  );
};
