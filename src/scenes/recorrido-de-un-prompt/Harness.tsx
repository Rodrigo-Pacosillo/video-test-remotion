import type {FC} from "react";
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from "remotion";
import {Background, DialogCard, Stage} from "../../components/core";
import {BoundaryTemplate, CycleTemplate, ToolBeltTemplate, TreeTemplate} from "../../templates";
import {clampBoth} from "../../components/ui";
import {useLayout} from "../../layout";
import {theme} from "../../theme";

const BoundaryBeat: FC = () => (
  <BoundaryTemplate
    left={{id: "modelo", label: "modelo", icon: "spark"}}
    center={{id: "harness", label: "harness", icon: "loop"}}
    right={{id: "proyecto", label: "proyecto", icon: "folder"}}
  />
);

const ToolBeltBeat: FC = () => (
  <ToolBeltTemplate
    center={{id: "harness", label: "harness", icon: "loop"}}
    tools={[
      {id: "leer", label: "leer", icon: "eye"},
      {id: "editar", label: "editar", icon: "pencil"},
      {id: "ejecutar", label: "ejecutar", icon: "terminal"},
    ]}
  />
);

const LoopBeat: FC = () => {
  const frame = useCurrentFrame();
  const activeIndex = frame < 76 ? 0 : frame < 95 ? 1 : frame < 114 ? 2 : 3;
  return (
    <CycleTemplate
      activeIndex={activeIndex}
      nodes={[
        {id: "leer", label: "leer", icon: "eye"},
        {id: "planear", label: "planear", icon: "loop"},
        {id: "actuar", label: "actuar", icon: "bolt"},
        {id: "verificar", label: "verificar", icon: "check"},
      ]}
    />
  );
};

const TreeBeat: FC = () => (
  <TreeTemplate
    root={{id: "harness", label: "harness", icon: "loop"}}
    children={[
      {id: "sub1", label: "subagente 1", icon: "branch"},
      {id: "sub2", label: "subagente 2", icon: "branch"},
      {id: "sub3", label: "subagente 3", icon: "branch"},
    ]}
  />
);

const PermissionBeat: FC = () => {
  const frame = useCurrentFrame();
  const {orientation} = useLayout();
  const press = interpolate(frame, [58, 62, 68], [0, 1, 0], clampBoth);

  return (
    <DialogCard
      command="git push --force"
      clicked={frame > 62}
      press={press}
      cursorX={orientation === "portrait" ? 77 : 63}
      cursorY={orientation === "portrait" ? 62 : 54}
    />
  );
};

export const HarnessScene: FC = () => {
  const {orientation} = useLayout();
  const permissionFocus =
    orientation === "portrait"
      ? {x: 0, y: 0, w: 1, h: 1}
      : {x: 0.25, y: 0.28, w: 0.5, h: 0.44};

  return (
    <AbsoluteFill>
      <Sequence durationInFrames={120}>
        <Background accent={theme.colors.cyan}><Stage><BoundaryBeat /></Stage></Background>
      </Sequence>
      <Sequence from={120} durationInFrames={111}>
        <Background accent={theme.colors.cyan}><Stage><ToolBeltBeat /></Stage></Background>
      </Sequence>
      <Sequence from={231} durationInFrames={153}>
        <Background accent={theme.colors.cyan}><Stage><LoopBeat /></Stage></Background>
      </Sequence>
      <Sequence from={384} durationInFrames={111}>
        <Background accent={theme.colors.cyan}><Stage><TreeBeat /></Stage></Background>
      </Sequence>
      <Sequence from={495} durationInFrames={120}>
        <Background accent={theme.colors.amber}><Stage focus={permissionFocus}><PermissionBeat /></Stage></Background>
      </Sequence>
    </AbsoluteFill>
  );
};
