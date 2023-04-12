export type WithNativeProps<OwnProps, Tag extends React.ElementType> = OwnProps &
  Omit<React.ComponentPropsWithoutRef<Tag>, keyof OwnProps>;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];

export type PolymorphicRefType<Tag extends React.ElementType> =
  Tag extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[Tag] : React.ComponentType<Tag>;

export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] };
