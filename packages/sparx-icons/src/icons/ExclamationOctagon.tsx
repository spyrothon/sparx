/**
 * RemixIcon spam-2-line
 * https://github.com/Remix-Design/RemixIcon/blob/master/License
 */
import * as React from "react";

import { IconProps, addDefaultIconProps } from "../IconProps";

export function ExclamationOctagon({ size = 24, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      {...addDefaultIconProps(props)}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path
        fill={color}
        d="M15.935 2.50098L21.5 8.06595V15.936L15.935 21.501H8.06497L2.5 15.936V8.06595L8.06497 2.50098H15.935ZM15.1066 4.50098H8.8934L4.5 8.89437V15.1076L8.8934 19.501H15.1066L19.5 15.1076V8.89437L15.1066 4.50098ZM10.9993 15.0002H12.9993V17.0002H10.9993V15.0002ZM10.9993 7.00024H12.9993V13.0002H10.9993V7.00024Z"
      />
    </svg>
  );
}
