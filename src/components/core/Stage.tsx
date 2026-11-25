import type {FC, ReactNode} from "react";
import {spring, useCurrentFrame} from "remotion";
import {useLayout} from "../../layout";

export type FocusRect = {
  /** Fracciones 0–1 de la zona segura. */
  x: number;
  y: number;
  w: number;
  h: number;
};

type Props = {
  children: ReactNode;
  focus?: FocusRect;
  /** Deriva lenta opcional, máximo 4. */
  drift?: number;
};

/**
 * Cámara de escena: encuadra el rectángulo en foco para llenar la zona segura.
 * Los hijos se posicionan en fracciones de la zona segura.
 */
export const Stage: FC<Props> = ({children, focus = {x: 0, y: 0, w: 1, h: 1}, drift = 0}) => {
  const frame = useCurrentFrame();
  const {content, fps} = useLayout();
  const rawScale = Math.min(1 / focus.w, 1 / focus.h);
  // Al hacer zoom dejamos ~4u de margen respecto de la zona segura.
  const fit = rawScale > 1.05 ? 0.94 : 1;
  const scale = rawScale * fit;
  const tx = (content.w - focus.w * content.w * scale) / 2 - focus.x * content.w * scale;
  const ty = (content.h - focus.h * content.h * scale) / 2 - focus.y * content.h * scale;
  const enter = 0.65 + 0.35 * spring({frame, fps, config: {damping: 200, mass: 0.8, stiffness: 100}});
  const slow = 1 + (Math.min(drift, 4) / 100) * Math.sin(frame / 70);

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden"}}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: content.w,
          height: content.h,
          transformOrigin: "0 0",
          translate: `${tx}px ${ty}px`,
          scale: scale * slow,
          opacity: enter,
        }}
      >
        {children}
      </div>
    </div>
  );
};
