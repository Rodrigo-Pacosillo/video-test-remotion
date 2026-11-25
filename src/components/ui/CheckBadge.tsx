import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Icon} from "./Icon";

type Props = {
  progress: number;
  sizeU?: number;
  color?: string;
  label?: string;
};

/** Check circular que aparece con escala; refuerza acciones completadas. */
export const CheckBadge: FC<Props> = ({
  progress,
  sizeU = 4,
  color = theme.colors.success,
  label,
}) => {
  const {u} = useLayout();
  const size = u * sizeU;
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <div style={{display: "flex", alignItems: "center", gap: u * 0.8, opacity: clamped}}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: `${color}22`,
          border: `${u * 0.18}px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          scale: 0.7 + 0.3 * clamped,
          boxShadow: `0 0 ${u * 2.2}px ${color}55`,
        }}
      >
        <Icon name="check" size={size * 0.55} color={color} strokeWidth={2.6} />
      </div>
      {label ? (
        <span
          style={{
            fontFamily: theme.fonts.sans,
            fontSize: u * 1.2,
            fontWeight: 600,
            color,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
};
