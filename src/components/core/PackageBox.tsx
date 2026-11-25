import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Icon, type IconName} from "../ui/Icon";
import {Node} from "./Node";

type Item = {label: string; icon: IconName};

type Props = {
  items: readonly Item[];
  install: number;
  pulse?: number;
};

/** Caja/paquete instalable; no es una ventana de terminal. */
export const PackageBox: FC<Props> = ({items, install, pulse = 0}) => {
  const {u, orientation} = useLayout();
  const portrait = orientation === "portrait";

  return (
    <div
      style={{
        width: "100%",
        minHeight: u * 48,
        borderRadius: u * 3,
        background: "linear-gradient(160deg, rgba(36,49,66,0.99), rgba(10,15,21,0.99))",
        border: `${u * 0.24}px solid ${theme.colors.cyan}66`,
        boxShadow: `0 35px 90px rgba(0,0,0,0.55), 0 0 ${u * 5}px ${theme.colors.cyan}22`,
        padding: u * 4,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: u * 4,
        position: "relative",
      }}
    >
      <div style={{position: "absolute", top: 0, left: "15%", right: "15%", height: u * 0.5, background: `linear-gradient(90deg, transparent, ${theme.colors.cyan}, transparent)`}} />
      <Icon name="package" size={u * 16} color={theme.colors.cyan} />
      <div style={{display: "flex", flexDirection: portrait ? "column" : "row", gap: u * 3, alignItems: "center"}}>
        {items.map((item) => (
          <Node key={item.label} label={item.label} icon={item.icon} active heightU={10} iconU={5} />
        ))}
      </div>
      <div
        style={{
          width: u * 10,
          height: u * 10,
          borderRadius: "50%",
          border: `${u * 0.25}px solid ${theme.colors.green}`,
          backgroundColor: `${theme.colors.green}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: install,
          scale: 0.75 + 0.25 * install + pulse * 0.04,
        }}
      >
        <Icon name="download" size={u * 5} color={theme.colors.green} />
      </div>
    </div>
  );
};
