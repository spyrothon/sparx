import * as React from "react";

import { InputColor, InputSize } from "../Input/Input";
import { defaultPickerItemToString } from "./PickerTypes";

export interface PickerContextState<T extends object> {
  color: InputColor;
  size: InputSize;
  values: Set<T>;
  highlightedIndex: number;
  getMenuProps: (options?: any) => any;
  getItemProps: (options: any) => any;
  itemToString: (item: T) => string;
}

export const PickerContext = React.createContext<PickerContextState<object>>({
  color: "default",
  size: "medium",
  values: new Set(),
  highlightedIndex: -1,
  getMenuProps: () => ({}),
  getItemProps: () => ({}),
  itemToString: defaultPickerItemToString,
});

export function usePickerContext<T extends object>() {
  return React.useContext<PickerContextState<T>>(
    PickerContext as unknown as React.Context<PickerContextState<T>>,
  );
}

interface PickerContextProviderProps<T extends object> extends React.PropsWithChildren {
  value: PickerContextState<T>;
}

export function PickerContextProvider<T extends object>({
  children,
  value,
}: PickerContextProviderProps<T>) {
  // @ts-expect-error value says it can be of a different subtype of object.
  return <PickerContext.Provider value={value}>{children}</PickerContext.Provider>;
}
