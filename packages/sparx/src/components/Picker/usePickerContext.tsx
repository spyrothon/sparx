import * as React from "react";

import { InputColor, InputSize } from "../Input/Input";

export interface PickerContextState<T extends any = object> {
  color: InputColor;
  size: InputSize;
  values: Set<T>;
  highlightedIndex: number;
  inputClassNames: string[];
  getMenuProps: (options?: any) => any;
  getItemProps: (options?: any) => any;
}

export const PickerContext = React.createContext<PickerContextState>({
  color: "default",
  size: "medium",
  values: new Set(),
  highlightedIndex: -1,
  inputClassNames: [],
  getMenuProps: () => ({}),
  getItemProps: () => ({}),
});

export function usePickerContext<T extends any>() {
  return React.useContext<PickerContextState<T>>(
    PickerContext as unknown as React.Context<PickerContextState<T>>,
  );
}

interface PickerContextProviderProps<T extends any = string> extends React.PropsWithChildren {
  value: PickerContextState<T>;
}

export function PickerContextProvider<T extends object>({
  children,
  value,
}: PickerContextProviderProps<T>) {
  return <PickerContext.Provider value={value}>{children}</PickerContext.Provider>;
}
