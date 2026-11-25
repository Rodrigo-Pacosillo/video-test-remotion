import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Icon} from "../ui/Icon";
import {Window} from "./Window";

export type TreeFile = {
  path: string;
  type: "folder" | "file";
  state?: "new" | "changed" | "deleted";
};

type Props = {
  files: readonly TreeFile[];
  activePath?: string;
};

/** Árbol de archivos creíble, con estado por archivo. Mínimo 5 elementos. */
export const FileTree: FC<Props> = ({files, activePath}) => {
  const {u} = useLayout();

  return (
    <Window title="src / app / lib">
      <div style={{display: "flex", flexDirection: "column", gap: u * 0.5}}>
        {files.map((file) => {
          const depth = file.path.split("/").length - 1;
          const active = activePath === file.path;
          const color =
            file.state === "new"
              ? theme.colors.green
              : file.state === "changed"
                ? theme.colors.amber
                : file.state === "deleted"
                  ? theme.colors.red
                  : theme.colors.text2;
          return (
            <div
              key={file.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: u * 1.2,
                padding: `${u * 0.6}px ${u * 1}px`,
                paddingLeft: `${u * (1 + depth * 2)}px`,
                borderRadius: u * 0.6,
                backgroundColor: active ? `${theme.colors.cyan}14` : "transparent",
                border: `${u * 0.12}px solid ${active ? `${theme.colors.cyan}66` : "transparent"}`,
              }}
            >
              <Icon
                name={file.type === "folder" ? "folder" : "file"}
                size={u * 3}
                color={active ? theme.colors.cyan : color}
              />
              <span style={{fontFamily: theme.fonts.mono, fontSize: u * theme.text.caption, color: active ? theme.colors.text : color}}>
                {file.path.split("/").at(-1)}
              </span>
            </div>
          );
        })}
      </div>
    </Window>
  );
};
