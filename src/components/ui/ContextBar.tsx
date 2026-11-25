import type {FC} from "react";
import {useCurrentFrame} from "remotion";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Label} from "./Label";
import {Icon} from "./Icon";

export type ContextSegment = {
  id: string;
  slots: number;
  color: string;
};

type Props = {
  segments: readonly ContextSegment[];
  visible: number;
  totalSlots?: number;
  showLimit?: boolean;
  label?: string;
  widthU?: number;
};

/** Barra de contexto con celdas, acumulación por tarjetas y límite marcado. */
export const ContextBar: FC<Props> = ({
  segments,
  visible,
  totalSlots = 12,
  showLimit = true,
  label = "contexto",
  widthU = 78,
}) => {
  const frame = useCurrentFrame();
  const {u} = useLayout();
  const visibleSegments = segments.slice(0, visible);
  const visibleSlots = visibleSegments.reduce((sum, segment) => sum + segment.slots, 0);
  const cells: {color: string; index: number}[] = [];

  visibleSegments.forEach((segment) => {
    for (let i = 0; i < segment.slots; i++) {
      cells.push({color: segment.color, index: cells.length});
    }
  });
  while (cells.length < totalSlots) {
    cells.push({color: theme.colors.surfaceAlt, index: cells.length});
  }

  return (
    <div style={{display: "flex", flexDirection: "column", gap: u * 0.9, width: u * widthU}}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <Label text={label} />
        {showLimit ? (
          <div style={{display: "flex", alignItems: "center", gap: u * 0.5, color: theme.colors.warning}}>
            <Icon name="lock" size={u * 1.5} color={theme.colors.warning} />
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          gap: u * 0.22,
          padding: u * 0.35,
          borderRadius: u * 1.1,
          border: `${u * 0.14}px solid rgba(255,255,255,0.1)`,
          backgroundColor: "rgba(9,13,18,0.72)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {cells.map((cell) => {
          const active = cell.index < visibleSlots;
          const newest = cell.index === visibleSlots - 1;
          return (
            <div
              key={cell.index}
              style={{
                flex: 1,
                height: u * 2.1,
                borderRadius: u * 0.45,
                backgroundColor: active ? cell.color : theme.colors.surfaceAlt,
                opacity: active ? 0.92 : 0.55,
                scale: newest ? 1 + 0.06 * Math.sin(frame / 4) : 1,
                boxShadow: active ? `0 0 ${u * 1.2}px ${cell.color}55` : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
