import type {FC, ReactNode} from "react";
import {AbsoluteFill} from "remotion";
import {useContext} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {CheckModeContext} from "./check-mode";

type Props = {
  children: ReactNode;
  accent?: string;
};

/** Fondo sobrio y zona segura. En checkMode queda liso para medir el bbox. */
export const Background: FC<Props> = ({children, accent = theme.colors.cyan}) => {
  const checkMode = useContext(CheckModeContext);
  const {content} = useLayout();

  return (
    <AbsoluteFill style={{backgroundColor: theme.colors.bg}}>
      {checkMode ? null : (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% 32%, ${accent}10, transparent 58%)`,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          left: content.x,
          top: content.y,
          width: content.w,
          height: content.h,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
