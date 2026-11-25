import type {FC} from "react";
import {AbsoluteFill, Sequence, useCurrentFrame} from "remotion";
import {Background, ContextStack, Stage} from "../../components/core";
import {GridTemplate} from "../../templates";
import {useLayout} from "../../layout";
import models from "../../../data/recorrido-de-un-prompt/fixtures/models.json";
import context from "../../../data/recorrido-de-un-prompt/fixtures/context.json";

const ModelsGrid: FC = () => <GridTemplate items={models} showNames={false} />;

const ContextWindow: FC = () => {
  const frame = useCurrentFrame();
  const {orientation} = useLayout();
  const fill = Math.min(1, frame / 90);

  return (
    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div style={{width: orientation === "portrait" ? "100%" : "86%"}}>
        <ContextStack blocks={context} fill={fill} />
      </div>
    </div>
  );
};

export const ModelosScene: FC = () => {
  const {orientation} = useLayout();
  const gridFocus =
    orientation === "portrait"
      ? {x: 0.29, y: 0.24, w: 0.42, h: 0.52}
      : {x: 0.3, y: 0.27, w: 0.4, h: 0.46};

  return (
    <AbsoluteFill>
      <Sequence durationInFrames={156}>
        <Background>
          <Stage focus={gridFocus}>
            <ModelsGrid />
          </Stage>
        </Background>
      </Sequence>
      <Sequence from={156} durationInFrames={177}>
        <Background>
          <Stage>
            <ContextWindow />
          </Stage>
        </Background>
      </Sequence>
    </AbsoluteFill>
  );
};
