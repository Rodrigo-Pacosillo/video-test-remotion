import type {FC} from "react";
import {Img, staticFile} from "remotion";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Text} from "./Text";

type Props = {
  file: string;
  name?: string;
  sizeU?: number;
  showName?: boolean;
  active?: boolean;
  dim?: boolean;
};

/** Logo sobre contenedor claro neutro; tamaño mínimo 14u. */
export const Logo: FC<Props> = ({
  file,
  name,
  sizeU = theme.elements.logo,
  showName = false,
  active = false,
  dim = false,
}) => {
  const {u} = useLayout();
  const chip = u * Math.max(sizeU, theme.elements.logoMin);

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: u * 1, opacity: dim ? 0.55 : 1}}>
      <div
        style={{
          width: chip,
          height: chip,
          borderRadius: u * 2,
          background: "linear-gradient(145deg, #FFFFFF, #DCE5EF)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `${u * 0.25}px solid ${active ? theme.colors.cyan : "transparent"}`,
          boxShadow: active ? `0 0 ${u * 2.4}px ${theme.colors.cyan}44` : "none",
        }}
      >
        <Img
          src={staticFile(`assets/logos/${file}`)}
          style={{width: chip * 0.56, height: chip * 0.56, objectFit: "contain"}}
        />
      </div>
      {showName && name ? (
        <Text token="label" color={active ? theme.colors.text : theme.colors.text2} align="center">
          {name}
        </Text>
      ) : null}
    </div>
  );
};
