import type {FC, ReactNode} from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {useLayout} from "../../layout";
import {theme} from "../../theme";

type Props = {
  children: ReactNode;
  accent?: string;
  showGrid?: boolean;
};

const PARTICLES = Array.from({length: 16}, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 17) % 100,
  size: 1 + (i % 3),
  speed: 45 + (i % 5) * 18,
}));

/** Fondo común: degradados, rejilla sutil, partículas y zona segura. */
export const SceneShell: FC<Props> = ({children, accent = theme.colors.accent, showGrid = true}) => {
  const frame = useCurrentFrame();
  const {u, safeInset} = useLayout();

  return (
    <AbsoluteFill style={{backgroundColor: theme.colors.background, overflow: "hidden"}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 18% 18%, ${accent}24, transparent 42%), radial-gradient(circle at 82% 78%, ${theme.colors.accentAlt}1c, transparent 46%)`,
        }}
      />
      {showGrid ? (
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: `${u * 6}px ${u * 6}px`,
            maskImage: "radial-gradient(circle at center, black 18%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 18%, transparent 78%)",
          }}
        />
      ) : null}

      <AbsoluteFill style={{pointerEvents: "none"}}>
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: u * 0.3 * particle.size,
              height: u * 0.3 * particle.size,
              borderRadius: "50%",
              backgroundColor: accent,
              opacity: 0.1 + 0.07 * Math.sin((frame + i * 23) / particle.speed),
              translate: `0px ${Math.sin((frame + i * 31) / particle.speed) * u * 1.6}px`,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          paddingTop: safeInset.top,
          paddingRight: safeInset.right,
          paddingBottom: safeInset.bottom,
          paddingLeft: safeInset.left,
          boxSizing: "border-box",
          display: "flex",
        }}
      >
        {children}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 180px 40px rgba(0,0,0,0.55)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
