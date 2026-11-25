import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Text} from "./Text";

type Point = {x: number; y: number};

type Props = {
  from: Point;
  to: Point;
  progress: number;
  color?: string;
  label?: string;
  labelAt?: number;
};

/**
 * Conector detrás del contenido. Las coordenadas son porcentajes de la zona
 * segura y deben apuntar al borde de los nodos, no a su centro.
 */
export const Connector: FC<Props> = ({
  from,
  to,
  progress,
  color = theme.colors.cyan,
  label,
  labelAt = 0.5,
}) => {
  const {u} = useLayout();
  const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  const clamped = Math.max(0, Math.min(1, progress));
  const labelX = from.x + (to.x - from.x) * labelAt;
  const labelY = from.y + (to.y - from.y) * labelAt;

  return (
    <>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <path d={path} fill="none" stroke={color} strokeOpacity={0.25} strokeWidth={u * theme.elements.connector} vectorEffect="non-scaling-stroke" />
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={u * theme.elements.connector}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - clamped}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {label ? (
        <div
          style={{
            position: "absolute",
            left: `${labelX}%`,
            top: `${labelY}%`,
            translate: "-50% -50%",
            padding: `${u * 0.6}px ${u * 1.2}px`,
            borderRadius: u * 5,
            backgroundColor: theme.colors.bg,
            border: `${u * 0.15}px solid ${theme.colors.border}`,
            zIndex: 1,
          }}
        >
          <Text token="caption" color={theme.colors.text2}>
            {label}
          </Text>
        </div>
      ) : null}
    </>
  );
};
