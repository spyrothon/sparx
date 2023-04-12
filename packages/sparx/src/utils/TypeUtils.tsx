export type WithNativeProps<OwnProps, Tag extends React.ElementType> = OwnProps &
  Omit<React.ComponentPropsWithoutRef<Tag>, keyof OwnProps>;

/**
 * NOTE: This is currently _very_ lossy because inferring the actual type of the
 * element is not easy.
 *
 * TODO: Make this actually get the
 */
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];

export type PolymorphicRefType<Tag extends React.ElementType> =
  Tag extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[Tag] : React.ComponentType<Tag>;
