import type {FC} from "react";
import {AbsoluteFill, Sequence, useCurrentFrame} from "remotion";
import {Background, ContextStack, DocumentCard, Logo, Stage} from "../../components/core";
import {StackTemplate} from "../../templates";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import rules from "../../../data/recorrido-de-un-prompt/fixtures/rules.json";
import context from "../../../data/recorrido-de-un-prompt/fixtures/context.json";

const RulesPanel: FC = () => {
  const {u, orientation} = useLayout();
  return (
    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div style={{width: orientation === "portrait" ? "100%" : "88%", display: "flex", flexDirection: "column", gap: u * 3}}>
        <DocumentCard filename="AGENTS.md" lines={rules} accent={theme.colors.green} />
        <div style={{display: "flex", justifyContent: "center", gap: u * 4}}>
          <Logo file="typescript.svg" name="TypeScript" sizeU={14} />
          <Logo file="react.svg" name="React" sizeU={14} />
          <Logo file="nodedotjs.svg" name="Node.js" sizeU={14} />
        </div>
      </div>
    </div>
  );
};

const ContextFlow: FC = () => {
  const frame = useCurrentFrame();
  const activeId = frame < 40 ? "reglas" : frame < 80 ? "skill" : "memoria";
  return (
    <StackTemplate
      activeId={activeId}
      items={[
        {id: "reglas", label: "reglas", icon: "file", content: "AGENTS.md", color: theme.colors.green},
        {id: "skill", label: "skill", icon: "lock", content: "auth-google", color: theme.colors.amber},
        {id: "memoria", label: "memoria", icon: "clock", content: "Auth.js", color: theme.colors.violet},
      ]}
    />
  );
};

const ContextPanel: FC = () => {
  const frame = useCurrentFrame();
  const {orientation} = useLayout();
  const fill = Math.min(1, frame / 100);

  return (
    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div style={{width: orientation === "portrait" ? "100%" : "88%"}}>
        <ContextStack
          blocks={context}
          fill={fill}
          colors={[theme.colors.cyan, theme.colors.green, theme.colors.amber, theme.colors.violet]}
        />
      </div>
    </div>
  );
};

export const ContextoScene: FC = () => {
  const {orientation} = useLayout();
  const flowFocus =
    orientation === "portrait"
      ? {x: 0, y: 0, w: 1, h: 1}
      : {x: 0.15, y: 0.3, w: 0.7, h: 0.38};

  return (
    <AbsoluteFill>
      <Sequence durationInFrames={147}>
        <Background accent={theme.colors.green}><Stage focus={{x: 0.05, y: 0.22, w: 0.9, h: 0.56}}><RulesPanel /></Stage></Background>
      </Sequence>
      <Sequence from={147} durationInFrames={147}>
        <Background accent={theme.colors.cyan}><Stage focus={flowFocus}><ContextFlow /></Stage></Background>
      </Sequence>
      <Sequence from={294} durationInFrames={270}>
        <Background accent={theme.colors.violet}><Stage><ContextPanel /></Stage></Background>
      </Sequence>
    </AbsoluteFill>
  );
};
