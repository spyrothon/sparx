import * as React from "react";

type WithAsChildProp<P extends {}> = {
  asChild: true;
  children: React.ReactElement<P>;
};

type NoAsChildProp = {
  asChild?: never;
  children: React.ReactNode;
};

/**
 * When an `asChild` prop is given to the component, additionally expect
 * `children` to be given as a Component that accepts the specified props. If
 * no `asChild` prop is given, `children` can be any React.ReactNode.
 *
 * Right now TypeScript won't actually enforce the props of `children` because
 * JSX.Element erases all of the type information about what the child is. This
 * typing is just being added now so that we gain the safety immediately in the
 * future.
 *
 * See https://github.com/microsoft/TypeScript/issues/21699 for more info and
 * check for a potential resolution in the future.
 */
export type AsChildProps<P extends {}> = WithAsChildProp<P> | NoAsChildProp;
