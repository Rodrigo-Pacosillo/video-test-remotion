import type {CSSProperties, FC, ReactNode} from "react";
import {useLayout} from "../../layout";
import {theme} from "../../theme";

export type TextToken = "display" | "title" | "label" | "caption" | "code";

type Props = {
  children: ReactNode;
  token?: TextToken;
  color?: string;
  weight?: number;
  align?: "left" | "center" | "right";
  maxWidthU?: number;
  mono?: boolean;
  style?: CSSProperties;
};

/** Todo texto pasa por aquí: escala fija, sin tamaños libres. */
export const Text: FC<Props> = ({
  children,
  token = "label",
  color = theme.colors.text,
  weight,
  align = "left",
  maxWidthU,
  mono = false,
  style,
}) => {
  const {u} = useLayout();
  const raw = theme.text[token];
  const sizeU =
    token === "label"
      ? Math.max(raw, theme.text.labelMin)
      : token === "code"
        ? Math.max(raw, theme.text.codeMin)
        : raw;

  return (
    <div
      style={{
        fontFamily: mono || token === "code" ? theme.fonts.mono : theme.fonts.sans,
        fontSize: u * sizeU,
        fontWeight: weight ?? (token === "display" || token === "title" ? 700 : 600),
        color,
        textAlign: align,
        lineHeight: 1.25,
        maxWidth: maxWidthU ? u * maxWidthU : undefined,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: token === "caption" || token === "code" ? "nowrap" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
