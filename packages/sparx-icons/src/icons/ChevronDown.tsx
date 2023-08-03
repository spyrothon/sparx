/**
 * RemixIcon arrow-drop-down-line
 * https://github.com/Remix-Design/RemixIcon/blob/master/License
 */
import * as React from "react";

import { IconProps, addDefaultIconProps } from "../IconProps";

export default function ChevronDown({ size = 24, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      {...addDefaultIconProps(props)}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path
        fill={color}
        d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"
      />
    </svg>
  );
}
