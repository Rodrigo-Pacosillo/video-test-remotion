import {Fragment, type FC} from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {useLayout} from "../layout";
import {MAX_ELEMENTS_PORTRAIT, theme} from "../theme";

export type DiagramNode = {
  id: string;
  label: string;
};

type Props = {
  nodes: readonly DiagramNode[];
  activeId?: string;
  title?: string;
};

/** Nodos y flechas: horizontal izquierda→derecha, vertical arriba→abajo. */
export const Diagram: FC<Props> = ({nodes, activeId, title}) => {
  const frame = useCurrentFrame();
  const {orientation, u} = useLayout();
  const vertical = orientation === "portrait";
  const visible = nodes.slice(0, vertical ? MAX_ELEMENTS_PORTRAIT : 6);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: u * theme.spacingU.md,
      }}
    >
      {title ? (
        <div
          style={{
            fontFamily: theme.fonts.sans,
            fontSize: u * theme.fontSizesU.subtitle,
            color: theme.colors.textMuted,
            textAlign: "center",
          }}
        >
          {title}
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: vertical ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: u * 1.5,
          flexWrap: vertical ? "nowrap" : "wrap",
        }}
      >
        {visible.map((node, i) => {
          const progress = interpolate(frame, [i * 5, i * 5 + theme.transitionFrames.default], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const active = node.id === activeId;

          return (
            <Fragment key={node.id}>
              <div
                style={{
                  padding: `${u * theme.spacingU.sm}px ${u * theme.spacingU.md}px`,
                  border: `${u * 0.2}px solid ${active ? theme.colors.accent : theme.colors.border}`,
                  borderRadius: u * theme.radiiU.card,
                  backgroundColor: active ? theme.colors.surfaceAlt : theme.colors.surface,
                  color: active ? theme.colors.accent : theme.colors.text,
                  fontFamily: theme.fonts.sans,
                  fontSize: u * theme.fontSizesU.body,
                  whiteSpace: "nowrap",
                  opacity: progress,
                  scale: 0.9 + 0.1 * progress,
                }}
              >
                {node.label}
              </div>
              {i < visible.length - 1 ? (
                <div style={{color: theme.colors.accent, fontSize: u * 3, opacity: progress}}>
                  {vertical ? "↓" : "→"}
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
