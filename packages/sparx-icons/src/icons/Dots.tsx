/**
 * RemixIcon more-fill
 * https://github.com/Remix-Design/RemixIcon/blob/master/License
 */
import * as React from "react";

import { IconProps, addDefaultIconProps } from "../IconProps";

export function Dots({ size = 24, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      {...addDefaultIconProps(props)}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path
        fill={color}
        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
      />
    </svg>
  );
}
