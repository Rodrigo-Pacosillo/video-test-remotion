import {useVideoConfig} from "remotion";
import {theme, type Orientation} from "./theme";

export type SafeRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

/**
 * Hook único de layout. Devuelve la zona segura como rectángulo, además de
 * los insets heredados que todavía usan algunos componentes.
 */
export const useLayout = () => {
  const {width, height, fps} = useVideoConfig();
  const orientation: Orientation = height > width ? "portrait" : "landscape";
  const u = Math.min(width, height) / 100;
  const fractions = theme.safe[orientation];
  const safe: SafeRect = {
    x: width * fractions.left,
    y: height * fractions.top,
    w: width * (1 - fractions.left - fractions.right),
    h: height * (1 - fractions.top - fractions.bottom),
  };
  const inset = u * 4;
  const content: SafeRect = {
    x: safe.x + inset,
    y: safe.y + inset,
    w: safe.w - inset * 2,
    h: safe.h - inset * 2,
  };

  return {
    width,
    height,
    fps,
    orientation,
    u,
    safe,
    content,
    safeInset: {
      top: safe.y,
      right: width - (safe.x + safe.w),
      bottom: height - (safe.y + safe.h),
      left: safe.x,
    },
    contentWidth: safe.w,
    contentHeight: safe.h,
  };
};
