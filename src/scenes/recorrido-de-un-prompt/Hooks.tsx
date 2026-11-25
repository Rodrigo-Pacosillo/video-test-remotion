import type {FC} from "react";
import {AbsoluteFill, Sequence, useCurrentFrame} from "remotion";
import {Background, DiffView, FileTree, Node, Stage, Text, type DiffLine, type TreeFile} from "../../components/core";
import {ActionTemplate} from "../../templates";
import {CheckBadge, fadeIn} from "../../components/ui";
import {Icon} from "../../components/ui/Icon";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import diff from "../../../data/recorrido-de-un-prompt/fixtures/auth.diff.json";
import files from "../../../data/recorrido-de-un-prompt/fixtures/files.json";

const EditBeat: FC = () => {
  const {u, orientation} = useLayout();
  return (
    <ActionTemplate active="edit">
      <div style={{width: "100%", height: "100%", display: "flex", flexDirection: orientation === "portrait" ? "column" : "row", alignItems: "center", gap: u * 3}}>
        <div style={{flex: 1, width: "100%"}}>
          <DiffView filename="lib/auth.ts" lines={diff as DiffLine[]} />
        </div>
        <Node label="hook" icon="bolt" active accent={theme.colors.amber} heightU={10} iconU={5} />
      </div>
    </ActionTemplate>
  );
};

const PipelineBeat: FC = () => {
  const frame = useCurrentFrame();
  const {u, orientation} = useLayout();
  const format = fadeIn(frame, 24, 12);
  const tests = fadeIn(frame, 54, 12);
  const widthU = orientation === "portrait" ? 70 : 96;

  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: u * 2}}>
      <Node label="hook" icon="bolt" active accent={theme.colors.amber} heightU={14} iconU={6} widthU={widthU} />
      <Icon name="arrow-down" size={u * 4} color={theme.colors.text2} />
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: u * 1.2}}>
        <Node label="format" icon="spark" active={format > 0.5} accent={theme.colors.green} heightU={14} iconU={6} widthU={widthU} />
        <CheckBadge progress={format} sizeU={3.6} />
      </div>
      <Icon name="arrow-down" size={u * 4} color={theme.colors.text2} />
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: u * 1.2}}>
        <Node label="tests" icon="shield" active={tests > 0.5} accent={theme.colors.green} heightU={14} iconU={6} widthU={widthU} />
        <CheckBadge progress={tests} sizeU={3.6} />
      </div>
    </div>
  );
};

const BlockedBeat: FC = () => {
  const frame = useCurrentFrame();
  const {u, orientation} = useLayout();
  const blocked = fadeIn(frame, 18, 12);

  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: orientation === "portrait" ? "column" : "row", alignItems: "center", justifyContent: "center", gap: u * 4}}>
      <div style={{flex: 1, width: "100%"}}>
        <FileTree files={files as TreeFile[]} activePath="lib/auth.ts" />
      </div>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: u * 2, opacity: blocked}}>
        <Icon name="shield" size={u * 14} color={theme.colors.red} />
        <Node label="hook" icon="bolt" active accent={theme.colors.red} heightU={10} iconU={5} />
        <Text token="code" color={theme.colors.red}>rm lib/auth.ts</Text>
      </div>
    </div>
  );
};

export const HooksScene: FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={150}>
      <Background accent={theme.colors.amber}><Stage><EditBeat /></Stage></Background>
    </Sequence>
    <Sequence from={150} durationInFrames={138}>
      <Background accent={theme.colors.green}><Stage><PipelineBeat /></Stage></Background>
    </Sequence>
    <Sequence from={288} durationInFrames={108}>
      <Background accent={theme.colors.red}><Stage><BlockedBeat /></Stage></Background>
    </Sequence>
  </AbsoluteFill>
);
