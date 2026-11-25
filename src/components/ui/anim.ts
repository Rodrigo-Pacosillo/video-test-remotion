import {Easing, interpolate, spring} from "remotion";

export const clampBoth = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const fadeIn = (frame: number, start: number, duration = 12) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clampBoth,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const fadeOut = (frame: number, start: number, duration = 12) =>
  interpolate(frame, [start, start + duration], [1, 0], clampBoth);

export const springIn = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: {damping: 200, mass: 0.7, stiffness: 120},
  });

export const softPulse = (frame: number, speed = 12) => 0.5 + 0.5 * Math.sin(frame / speed);
