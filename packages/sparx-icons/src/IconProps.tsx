import { CSSProperties } from "react";

export interface IconProps {
  color?: string;
  size?: string | number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
  role?: string;
}

export function addDefaultIconProps(props: IconProps) {
  return {
    ...props,
    "aria-hidden": props["aria-hidden"] ?? true,
    role: props.role ?? "img",
  };
}
