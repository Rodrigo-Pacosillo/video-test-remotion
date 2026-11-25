import type {FC} from "react";
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from "remotion";
import {Background, Node, PromptBar, Stage} from "../../components/core";
import {clampBoth} from "../../components/ui";
import {useLayout} from "../../layout";

const PROMPT = "agrega login con Google a mi app";

const PromptPanel: FC = () => {
  const frame = useCurrentFrame();
  const {orientation} = useLayout();
  const typed = Math.floor(interpolate(frame, [8, 48], [0, PROMPT.length], clampBoth));
  const press = interpolate(frame, [50, 56, 64], [0, 1, 0], clampBoth);

  return (
    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <PromptBar
        text={PROMPT}
        typed={typed}
        showKey
        press={press}
        minHeightU={orientation === "portrait" ? 52 : 42}
        active
      />
    </div>
  );
};

const GanchoHero: FC = () => {
  const {u, orientation} = useLayout();
  const vertical = orientation === "portrait";

  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: u * 5}}>
      <PromptBar text={PROMPT} minHeightU={12} />
      <div style={{display: "flex", flexDirection: "column", gap: u * 4, alignItems: "center", justifyContent: "center"}}>
        <Node label="modelo" icon="spark" heightU={12} iconU={6} widthU={vertical ? 72 : 46} />
        <Node label="harness" icon="loop" heightU={12} iconU={6} widthU={vertical ? 72 : 46} />
        <Node label="contexto" icon="file" heightU={12} iconU={6} widthU={vertical ? 72 : 46} />
      </div>
    </div>
  );
};

export const GanchoScene: FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={126}>
      <Background>
        <Stage>
          <PromptPanel />
        </Stage>
      </Background>
    </Sequence>
    <Sequence from={126} durationInFrames={96}>
      <Background>
        <Stage>
          <GanchoHero />
        </Stage>
      </Background>
    </Sequence>
  </AbsoluteFill>
);
