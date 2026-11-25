import type {FC} from "react";
import {random, useCurrentFrame} from "remotion";
import {useMemo} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Window} from "./Window";

type Props = {
  directory: string;
  branch: string;
  command: string;
  output: readonly string[];
};

/** Terminal con prompt real, tipeo determinista y salida real. */
export const Terminal: FC<Props> = ({directory, branch, command, output}) => {
  const frame = useCurrentFrame();
  const {u, orientation} = useLayout();
  const schedule = useMemo(() => {
    let at = 0;
    return command.split("").map((char, index) => {
      at += 1 + random(`type-${index}`) * 0.7;
      return {char, at};
    });
  }, [command]);
  const typed = schedule.filter((item) => item.at <= frame).length;
  const done = typed >= command.length;
  const outputStart = schedule.at(-1)?.at ?? 0;
  const codeSize = u * (orientation === "portrait" ? theme.text.codeMin : theme.text.code);
  const cursor = frame % 20 < 10 ? "▌" : " ";

  return (
    <Window title="terminal">
      <div style={{display: "flex", flexDirection: "column", gap: u * 1, fontFamily: theme.fonts.mono, fontSize: codeSize, lineHeight: 1.5}}>
        <div style={{display: "flex", gap: u * 0.8, whiteSpace: "nowrap"}}>
          <span style={{color: theme.colors.violet}}>{directory}</span>
          <span style={{color: theme.colors.text2}}>({branch})</span>
          <span style={{color: theme.colors.green}}>$</span>
          <span style={{color: theme.colors.text}}>
            {command.slice(0, typed)}
            <span style={{color: theme.colors.cyan}}>{cursor}</span>
          </span>
        </div>
        {output.map((line, index) => (
          <div
            key={index}
            style={{
              color: index === 0 ? theme.colors.cyan : theme.colors.text2,
              whiteSpace: orientation === "portrait" ? "pre-wrap" : "pre",
              overflowWrap: "anywhere",
              opacity: done && frame > outputStart + index * 4 ? 1 : 0,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </Window>
  );
};
