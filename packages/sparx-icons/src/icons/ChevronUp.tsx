/**
 * RemixIcon arrow-drop-up-line
 * https://github.com/Remix-Design/RemixIcon/blob/master/License
 */
import * as React from "react";

import { IconProps, addDefaultIconProps } from "../IconProps";

export function ChevronUp({ size = 24, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      {...addDefaultIconProps(props)}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path
        fill={color}
        d="M12 11.8284L9.17154 14.6569L7.75732 13.2426L12 9L16.2426 13.2426L14.8284 14.6569L12 11.8284Z"
      />
    </svg>
  );
}
