import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Icon} from "../ui/Icon";
import {Text} from "./Text";

type Props = {
  command: string;
  clicked: boolean;
  press?: number;
  cursorX?: number;
  cursorY?: number;
};

/** Modal de permiso; sin barra de ventana/terminal. */
export const DialogCard: FC<Props> = ({
  command,
  clicked,
  press = 0,
  cursorX = 63,
  cursorY = 54,
}) => {
  const {u, orientation} = useLayout();
  const portrait = orientation === "portrait";

  return (
    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative"}}>
      <div
        style={{
          width: u * (portrait ? 72 : 56),
          minHeight: u * (portrait ? 50 : 30),
          borderRadius: u * 2.4,
          background: "linear-gradient(180deg, rgba(32,40,54,0.99), rgba(13,18,26,0.99))",
          border: `${u * 0.22}px solid ${theme.colors.amber}88`,
          boxShadow: `0 30px 90px rgba(0,0,0,0.55), 0 0 ${u * 4}px ${theme.colors.amber}22`,
          padding: u * 3,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: u * 3,
        }}
      >
        <div style={{display: "flex", alignItems: "center", gap: u * 2}}>
          <div
            style={{
              width: u * 8,
              height: u * 8,
              borderRadius: "50%",
              backgroundColor: `${theme.colors.amber}18`,
              border: `${u * 0.2}px solid ${theme.colors.amber}66`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="shield" size={u * 4.4} color={theme.colors.amber} />
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: u * 0.8}}>
            <Text token="label" color={theme.colors.amber}>permiso</Text>
            <Text token="code" color={theme.colors.text}>{command}</Text>
          </div>
        </div>
        <div style={{display: "flex", justifyContent: "flex-end", gap: u * 2}}>
          <div
            style={{
              width: u * 8,
              height: u * 8,
              borderRadius: "50%",
              border: `${u * 0.25}px solid ${theme.colors.red}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="x" size={u * 4} color={theme.colors.red} />
          </div>
          <div
            style={{
              width: u * 8,
              height: u * 8,
              borderRadius: "50%",
              border: `${u * 0.25}px solid ${clicked ? theme.colors.green : theme.colors.cyan}`,
              backgroundColor: clicked ? `${theme.colors.green}22` : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scale: press > 0.1 ? 0.92 : 1,
            }}
          >
            <Icon name="check" size={u * 4} color={clicked ? theme.colors.green : theme.colors.cyan} />
          </div>
        </div>
      </div>
      <div style={{position: "absolute", left: `${cursorX}%`, top: `${cursorY}%`, scale: 1 - press * 0.12}}>
        <Icon name="cursor" size={u * 4} color={theme.colors.text} />
      </div>
    </div>
  );
};
