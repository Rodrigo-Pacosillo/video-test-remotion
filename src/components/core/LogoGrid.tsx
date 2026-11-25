import type {FC} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Logo} from "./Logo";

export type LogoItem = {file: string; name: string};

type Props = {
  items: readonly LogoItem[];
  activeIndex?: number;
  showNames?: boolean;
};

/** Cuadrícula 3×2 / 2×3, logos 16u, mismo tratamiento y orden fijo. */
export const LogoGrid: FC<Props> = ({items, activeIndex, showNames = true}) => {
  const {u, orientation} = useLayout();
  const visible = items.slice(0, orientation === "portrait" ? 4 : 6);
  const columns = orientation === "portrait" ? 2 : 3;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, auto)`,
        gap: u * theme.elements.gap * 2,
        width: "max-content",
        margin: "0 auto",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      {visible.map((item, index) => (
        <Logo
          key={item.file}
          file={item.file}
          name={item.name}
          showName={showNames}
          active={activeIndex === index}
          dim={activeIndex !== undefined && activeIndex !== index}
        />
      ))}
    </div>
  );
};
