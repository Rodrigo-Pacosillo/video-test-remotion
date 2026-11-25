import type {FC} from "react";
import {useCurrentFrame} from "remotion";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {KeyCap} from "../ui";
import {Text} from "./Text";

type Props = {
  text: string;
  typed?: number;
  showKey?: boolean;
  press?: number;
  minHeightU?: number;
  active?: boolean;
};

/** Barra de prompt: entrada de texto, no una ventana de terminal. */
export const PromptBar: FC<Props> = ({
  text,
  typed,
  showKey = false,
  press = 0,
  minHeightU = 12,
  active = false,
}) => {
  const frame = useCurrentFrame();
  const {u, orientation} = useLayout();
  const shown = text.slice(0, typed ?? text.length);
  const cursor = frame % 20 < 10 ? "▌" : " ";

  return (
    <div
      style={{
        width: "100%",
        minHeight: u * minHeightU,
        borderRadius: u * 2,
        background: "linear-gradient(180deg, rgba(30,39,56,0.98), rgba(13,18,26,0.98))",
        border: `${u * 0.2}px solid ${active ? theme.colors.cyan : theme.colors.border}`,
        boxShadow: active ? `0 0 ${u * 3}px ${theme.colors.cyan}33` : "0 18px 45px rgba(0,0,0,0.3)",
        padding: `${u * 2.4}px ${u * 3}px`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: u * 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: u * 0.35,
          background: `linear-gradient(90deg, transparent, ${theme.colors.cyan}, transparent)`,
          opacity: 0.7,
        }}
      />
      <div style={{display: "flex", alignItems: "center", gap: u * 1.5}}>
        <Text token="code" color={theme.colors.cyan}>›</Text>
        <div
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: u * (orientation === "portrait" ? theme.text.codeMin : theme.text.code),
            lineHeight: 1.35,
            color: theme.colors.text,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {shown}
          <span style={{color: theme.colors.cyan}}>{cursor}</span>
        </div>
      </div>
      {showKey ? (
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <KeyCap press={press} sizeU={8} />
        </div>
      ) : null}
    </div>
  );
};
