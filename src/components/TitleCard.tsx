import type {FC} from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {useLayout} from "../layout";
import {theme} from "../theme";

type Props = {
  title: string;
  subtitle?: string;
  accent?: string;
};

/** Tarjeta de título con entrada sobria; se adapta a ambas orientaciones. */
export const TitleCard: FC<Props> = ({title, subtitle, accent = theme.colors.accent}) => {
  const frame = useCurrentFrame();
  const {u} = useLayout();
  const progress = interpolate(frame, [0, theme.transitionFrames.default], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: u * theme.spacingU.sm,
        textAlign: "center",
        opacity: progress,
        translate: `0px ${u * (1 - progress) * 2}px`,
      }}
    >
      <div
        style={{
          width: u * 8,
          height: u * 0.4,
          backgroundColor: accent,
          borderRadius: u * 0.2,
        }}
      />
      <h1
        style={{
          margin: 0,
          fontFamily: theme.fonts.sans,
          fontSize: u * theme.fontSizesU.title,
          fontWeight: 700,
          color: theme.colors.text,
        }}
      >
        {title}
      </h1>
      {subtitle ? (
        <p
          style={{
            margin: 0,
            fontFamily: theme.fonts.sans,
            fontSize: u * theme.fontSizesU.subtitle,
            color: theme.colors.textMuted,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};
