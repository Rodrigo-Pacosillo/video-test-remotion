import "./fonts";
import {Composition} from "remotion";
import {theme} from "./theme";
import {
  RECORRIDO_DURATION_IN_FRAMES,
  RecorridoDeUnPrompt,
} from "./videos/recorrido-de-un-prompt";

/**
 * Registro único de composiciones. La misma línea de tiempo se renderiza en
 * horizontal y vertical; el checkMode se usa para la verificación automática.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="recorrido-de-un-prompt-16x9"
        component={RecorridoDeUnPrompt}
        durationInFrames={RECORRIDO_DURATION_IN_FRAMES}
        fps={theme.fps}
        width={1920}
        height={1080}
        defaultProps={{checkMode: false}}
      />
      <Composition
        id="recorrido-de-un-prompt-9x16"
        component={RecorridoDeUnPrompt}
        durationInFrames={RECORRIDO_DURATION_IN_FRAMES}
        fps={theme.fps}
        width={1080}
        height={1920}
        defaultProps={{checkMode: false}}
      />
    </>
  );
};
