import type {FC} from "react";
import {theme} from "../../theme";

type Point = {x: number; y: number};

type Props = {
  from: Point;
  to: Point;
  progress: number;
  color?: string;
  curve?: number;
  dashed?: boolean;
};

/** Línea SVG que se dibuja progresivamente. Coordenadas en porcentaje 0–100. */
export const Connector: FC<Props> = ({
  from,
  to,
  progress,
  color = theme.colors.accent,
  curve = 0,
  dashed = false,
}) => {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2 - curve;
  const path = curve
    ? `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`
    : `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none"}}
    >
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeOpacity={dashed ? 0.22 : 0.14}
        strokeWidth={2}
        strokeDasharray={dashed ? "4 6" : undefined}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - Math.max(0, Math.min(1, progress))}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};
