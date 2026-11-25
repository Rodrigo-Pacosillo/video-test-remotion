import type {FC} from "react";
import {Img, staticFile} from "remotion";
import {useLayout} from "../../layout";
import {theme} from "../../theme";

type Props = {
  file: string;
  name?: string;
  sizeU?: number;
  showName?: boolean;
  active?: boolean;
  opacity?: number;
};

/** Logo sobre contenedor claro neutro, siempre con el mismo tratamiento. */
export const BrandLogo: FC<Props> = ({
  file,
  name,
  sizeU = 9,
  showName = false,
  active = false,
  opacity = 1,
}) => {
  const {u} = useLayout();
  const chip = u * sizeU;

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: u * 0.7, opacity}}>
      <div
        style={{
          width: chip,
          height: chip,
          borderRadius: u * 1.5,
          background: "linear-gradient(145deg, #FFFFFF, #DCE5EF)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: active ? `${u * 0.22}px solid ${theme.colors.accent}` : `${u * 0.22}px solid transparent`,
          boxShadow: active
            ? `0 0 ${u * 3}px ${theme.colors.accent}66`
            : "0 10px 30px rgba(0,0,0,0.35)",
          scale: active ? 1.06 : 1,
        }}
      >
        <Img
          src={staticFile(`assets/logos/${file}`)}
          style={{width: chip * 0.56, height: chip * 0.56, objectFit: "contain"}}
        />
      </div>
      {showName && name ? (
        <span
          style={{
            fontFamily: theme.fonts.sans,
            fontSize: u * 1.05,
            color: active ? theme.colors.text : theme.colors.textMuted,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>
      ) : null}
    </div>
  );
};
