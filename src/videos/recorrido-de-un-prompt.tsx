import type {FC} from "react";
import {AbsoluteFill, Sequence, staticFile} from "remotion";
import {Audio} from "@remotion/media";
import {CheckModeContext} from "../components/core";
import {theme} from "../theme";
import {GanchoScene} from "../scenes/recorrido-de-un-prompt/Gancho";
import {ModelosScene} from "../scenes/recorrido-de-un-prompt/Modelos";
import {HarnessScene} from "../scenes/recorrido-de-un-prompt/Harness";
import {ContextoScene} from "../scenes/recorrido-de-un-prompt/Contexto";
import {McpScene} from "../scenes/recorrido-de-un-prompt/Mcp";
import {HooksScene} from "../scenes/recorrido-de-un-prompt/Hooks";
import {PluginsScene} from "../scenes/recorrido-de-un-prompt/Plugins";
import {CierreScene} from "../scenes/recorrido-de-un-prompt/Cierre";

type Scene = {from: number; duration: number; Component: FC};

const SCENES: Scene[] = [
  {from: 0, duration: 222, Component: GanchoScene},
  {from: 222, duration: 333, Component: ModelosScene},
  {from: 555, duration: 615, Component: HarnessScene},
  {from: 1170, duration: 564, Component: ContextoScene},
  {from: 1734, duration: 300, Component: McpScene},
  {from: 2034, duration: 396, Component: HooksScene},
  {from: 2430, duration: 276, Component: PluginsScene},
  {from: 2706, duration: 411, Component: CierreScene},
];

export const RECORRIDO_DURATION_IN_FRAMES = 3117;

type Props = {
  checkMode?: boolean;
};

/** Línea de tiempo única para 16:9 y 9:16; el audio manda. */
export const RecorridoDeUnPrompt: FC<Props> = ({checkMode = false}) => {
  return (
    <CheckModeContext.Provider value={checkMode}>
      <AbsoluteFill style={{backgroundColor: theme.colors.bg}}>
        <Audio src={staticFile("audio/recorrido-de-un-prompt.wav")} />
        {SCENES.map((scene, index) => (
          <Sequence key={index} from={scene.from} durationInFrames={scene.duration}>
            <scene.Component />
          </Sequence>
        ))}
      </AbsoluteFill>
    </CheckModeContext.Provider>
  );
};
