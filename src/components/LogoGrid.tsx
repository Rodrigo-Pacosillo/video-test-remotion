import type {FC} from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {useLayout} from "../layout";
import {MAX_ELEMENTS_PORTRAIT, theme} from "../theme";
import {Logo} from "./Logo";

export type LogoItem = {
  name: string;
  logoKey?: string;
};

type Props = {
  items: readonly LogoItem[];
  title?: string;
  maxItems?: number;
};

/** Cuadrícula de ejemplos: 4 columnas en 16:9, 2 en 9:16 (paginando). */
export const LogoGrid: FC<Props> = ({items, title, maxItems}) => {
  const frame = useCurrentFrame();
  const {orientation, u} = useLayout();
  const limit = maxItems ?? (orientation === "portrait" ? MAX_ELEMENTS_PORTRAIT : 8);
  const visible = items.slice(0, limit);
  const columns = orientation === "portrait" ? 2 : 4;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: u * theme.spacingU.md,
        width: "100%",
        height: "100%",
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
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: u * theme.spacingU.md,
          justifyItems: "center",
        }}
      >
        {visible.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: u * theme.spacingU.xs,
              opacity: interpolate(frame, [i * 4, i * 4 + theme.transitionFrames.fast], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          >
            <Logo logoKey={item.logoKey ?? item.name} name={item.name} sizeU={orientation === "portrait" ? 10 : 7} />
            <div style={{fontFamily: theme.fonts.sans, fontSize: u * theme.fontSizesU.body * 0.8, color: theme.colors.textMuted}}>
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
