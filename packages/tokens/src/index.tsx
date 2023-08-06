export type ThemeTokenValue = { rawColor: string; opacity: number; rgba: string };

export type ThemedTokenResolver<
  ThemeTokenName extends string,
  Theme extends string,
  Accent extends string,
> = (name: ThemeTokenName, theme: Theme, accent: Accent) => ThemeTokenValue;
