import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Icon, type IconName} from "./Icon";

type Props = {
  label: string;
  icon?: IconName;
  active?: boolean;
  accent?: string;
  minWidthU?: number;
  fontU?: number;
  iconU?: number;
  opacity?: number;
};

/** Tarjeta de nodo con cristal oscuro y borde de acento cuando está activa. */
export const NodeCard: FC<Props> = ({
  label,
  icon,
  active = false,
  accent = theme.colors.accent,
  minWidthU = 0,
  fontU = 1.75,
  iconU = 2,
  opacity = 1,
}) => {
  const {u} = useLayout();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: u * 1.1,
        padding: `${u * 1.25}px ${u * 1.9}px`,
        minWidth: u * minWidthU,
        borderRadius: u * 1.4,
        background: "linear-gradient(180deg, rgba(29,39,51,0.94), rgba(17,24,33,0.94))",
        border: `${u * 0.14}px solid ${active ? accent : "rgba(255,255,255,0.09)"}`,
        boxShadow: active
          ? `0 0 ${u * 3.4}px ${accent}44, inset 0 1px 0 rgba(255,255,255,0.08)`
          : "0 10px 30px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)",
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      {icon ? (
        <div
          style={{
            width: u * 3.4,
            height: u * 3.4,
            borderRadius: u * 0.9,
            backgroundColor: active ? `${accent}22` : "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={icon} size={u * iconU} color={active ? accent : theme.colors.textMuted} />
        </div>
      ) : null}
      <span
        style={{
          fontFamily: theme.fonts.sans,
          fontSize: u * fontU,
          fontWeight: 600,
          color: active ? accent : theme.colors.text,
        }}
      >
        {label}
      </span>
    </div>
  );
};
