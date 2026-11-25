import type {FC, ReactNode} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";
import {Text} from "./Text";

type Props = {
  title: string;
  children: ReactNode;
  style?: React.CSSProperties;
};

/** Marco de ventana genérico y creíble para paneles de contenido real. */
export const Window: FC<Props> = ({title, children, style}) => {
  const {u} = useLayout();

  return (
    <div
      style={{
        width: "100%",
        borderRadius: u * 1.6,
        border: `${u * 0.2}px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.surface,
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: u * 1,
          padding: `${u * 1.2}px ${u * 2}px`,
          borderBottom: `${u * 0.15}px solid ${theme.colors.border}`,
          backgroundColor: theme.colors.surface2,
        }}
      >
        {[theme.colors.red, theme.colors.amber, theme.colors.green].map((color) => (
          <span
            key={color}
            style={{width: u * 1.1, height: u * 1.1, borderRadius: "50%", backgroundColor: color}}
          />
        ))}
        <Text token="caption" color={theme.colors.text2} mono style={{marginLeft: u * 1}}>
          {title}
        </Text>
      </div>
      <div style={{padding: u * 2.4}}>{children}</div>
    </div>
  );
};
