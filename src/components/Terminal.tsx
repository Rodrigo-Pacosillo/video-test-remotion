import type {FC} from "react";
import {interpolate, useCurrentFrame} from "remotion";
import {useLayout} from "../layout";
import {theme} from "../theme";

type Props = {
  command: string;
  output?: readonly string[];
  prompt?: string;
  typingFrames?: number;
};

/** Terminal con escritura y salida animadas, derivadas solo del frame. */
export const Terminal: FC<Props> = ({command, output = [], prompt = "$", typingFrames = 30}) => {
  const frame = useCurrentFrame();
  const {orientation, u} = useLayout();
  const typed = Math.floor(
    interpolate(frame, [0, typingFrames], [0, command.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const fontSize =
    u *
    (orientation === "portrait" ? theme.fontSizesU.codePortrait : theme.fontSizesU.codeLandscape);
  const outputStart = typingFrames + 6;
  const cursor = frame % 20 < 10 ? "▌" : " ";

  return (
    <div
      style={{
        width: "100%",
        padding: u * theme.spacingU.md,
        backgroundColor: "#070A0E",
        border: `${u * 0.15}px solid ${theme.colors.border}`,
        borderRadius: u * theme.radiiU.card,
        fontFamily: theme.fonts.mono,
        fontSize,
        color: theme.colors.success,
        lineHeight: 1.5,
      }}
    >
      <div style={{whiteSpace: "pre"}}>
        {prompt} {command.slice(0, typed)}
        {cursor}
      </div>
      {output.map((line, i) => (
        <div
          key={i}
          style={{
            color: theme.colors.textMuted,
            whiteSpace: "pre",
            opacity: interpolate(
              frame,
              [outputStart + i * 6, outputStart + i * 6 + theme.transitionFrames.fast],
              [0, 1],
              {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
            ),
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};
