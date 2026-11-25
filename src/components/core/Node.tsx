import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Icon, type IconName} from "../ui/Icon";
import {Text} from "./Text";

type Props = {
  label: string;
  icon?: IconName;
  active?: boolean;
  dim?: boolean;
  accent?: string;
  heightU?: number;
  iconU?: number;
  widthU?: number;
};

/** Nodo con icono + etiqueta, altura mínima 9u y un solo foco encendido. */
export const Node: FC<Props> = ({
  label,
  icon,
  active = false,
  dim = false,
  accent = theme.colors.cyan,
  heightU = theme.elements.nodeHeight,
  iconU = theme.elements.icon,
  widthU,
}) => {
  const {u} = useLayout();
  const height = u * Math.max(heightU, theme.elements.nodeHeight);

  return (
    <div
      style={{
        minHeight: height,
        width: widthU ? u * widthU : undefined,
        display: "flex",
        alignItems: "center",
        gap: u * 2,
        padding: `${u * 1.4}px ${u * 2.4}px`,
        borderRadius: u * 1.4,
        backgroundColor: active ? theme.colors.surface2 : theme.colors.surface,
        border: `${u * 0.2}px solid ${active ? accent : theme.colors.border}`,
        boxShadow: active ? `0 0 ${u * 2.2}px ${accent}33` : "none",
        opacity: dim ? 0.55 : 1,
        boxSizing: "border-box",
      }}
    >
      {icon ? (
        <div
          style={{
            width: u * 7,
            height: u * 7,
            borderRadius: u * 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${accent}14`,
          }}
        >
          <Icon name={icon} size={u * Math.max(iconU, theme.elements.icon)} color={active ? accent : theme.colors.text2} />
        </div>
      ) : null}
      <Text token="label" color={active ? accent : theme.colors.text}>
        {label}
      </Text>
    </div>
  );
};
