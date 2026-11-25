import type {FC} from "react";
import {AbsoluteFill, Sequence, useCurrentFrame} from "remotion";
import {Background, CodeBlock, Node, PromptBar, Stage, Text} from "../../components/core";
import {HeroTemplate} from "../../templates";
import {useLayout} from "../../layout";
import authCode from "../../../data/recorrido-de-un-prompt/fixtures/auth.short.json";

const PROMPT = "agrega login con Google a mi app";

const pieces = [
  {label: "modelo", icon: "spark" as const},
  {label: "harness", icon: "loop" as const},
  {label: "contexto", icon: "file" as const},
  {label: "MCP", icon: "plug" as const},
  {label: "hooks", icon: "bolt" as const},
  {label: "plugins", icon: "package" as const},
];

const SummaryBeat: FC = () => {
  const frame = useCurrentFrame();
  const {u, orientation} = useLayout();
  const vertical = orientation === "portrait";
  const first = pieces.slice(0, vertical ? 4 : 6);
  const second = pieces.slice(4);
  const showSecond = vertical && frame > 110;

  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: u * 5}}>
      <div style={{width: vertical ? "100%" : "72%"}}>
        <PromptBar text={PROMPT} minHeightU={14} />
      </div>

      {vertical ? (
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: u * 4, width: "100%"}}>
          {(showSecond ? second : first).map((piece, index) => (
            <Node key={piece.label} label={piece.label} icon={piece.icon} active={index === 0} dim={!showSecond && index > 0} heightU={14} iconU={6} />
          ))}
        </div>
      ) : (
        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: u * 4, width: "100%"}}>
          {first.map((piece, index) => (
            <Node key={piece.label} label={piece.label} icon={piece.icon} active={index === 0} dim={index > 0} heightU={14} iconU={6} />
          ))}
        </div>
      )}
    </div>
  );
};

const ModelBeat: FC = () => {
  const {u} = useLayout();
  return (
    <HeroTemplate>
      <div style={{width: "100%", display: "flex", flexDirection: "column", gap: u * 3}}>
        <Text token="title" align="center">modelo</Text>
        <PromptBar text={PROMPT} minHeightU={10} />
        <CodeBlock code={authCode.code} filename="lib/auth.ts" highlight={[3, 4]} maxLines={9} />
      </div>
    </HeroTemplate>
  );
};

export const CierreScene: FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={189}>
      <Background accent="#38BDF8"><Stage><SummaryBeat /></Stage></Background>
    </Sequence>
    <Sequence from={189} durationInFrames={222}>
      <Background accent="#38BDF8"><Stage focus={{x: 0.05, y: 0.05, w: 0.9, h: 0.9}}><ModelBeat /></Stage></Background>
    </Sequence>
  </AbsoluteFill>
);
