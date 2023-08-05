import * as React from "react";

export function useSetRef<T extends Element>(...refs: React.Ref<T>[]) {
  return React.useCallback(
    (element: T | null) => {
      refs.forEach((ref) => {
        if (ref == null) return;
        if (typeof ref === "function") {
          ref(element);
        } else {
          // @ts-expect-error It's okay to make this mutable, even though
          // React.Ref doesn't allow it.
          ref.current = element;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refs],
  );
}
