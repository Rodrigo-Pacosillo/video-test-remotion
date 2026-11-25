import type {FC} from "react";
import {CanvasImage, staticFile} from "remotion";
import {useLayout} from "../layout";
import {getLogo} from "../logos";
import {NameChip} from "./NameChip";

type Props = {
  logoKey: string;
  name?: string;
  sizeU?: number;
};

/** Logo registrado; si no hay SVG disponible, degrada a NameChip. */
export const Logo: FC<Props> = ({logoKey, name, sizeU = 8}) => {
  const {u} = useLayout();
  const entry = getLogo(logoKey);
  const size = u * sizeU;

  if (!entry) {
    return <NameChip name={name ?? logoKey} />;
  }

  return (
    <CanvasImage
      src={staticFile(entry.file)}
      style={{width: size, height: size, objectFit: "contain"}}
    />
  );
};
