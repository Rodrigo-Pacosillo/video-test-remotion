import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";

type Point = {x: number; y: number};

type Props = {
  from: Point;
  to: Point;
  progress: number;
  color?: string;
  sizeU?: number;
  opacity?: number;
};

/** Punto luminoso que viaja entre dos coordenadas porcentuales. */
export const PulseDot: FC<Props> = ({
  from,
  to,
  progress,
  color = theme.colors.accent,
  sizeU = 1.1,
  opacity = 1,
}) => {
  const {u} = useLayout();
  const x = from.x + (to.x - from.x) * progress;
  const y = from.y + (to.y - from.y) * progress;
  const size = u * sizeU;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 ${u * 2.2}px ${color}, 0 0 ${u * 0.9}px #FFFFFF`,
        translate: "-50% -50%",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
