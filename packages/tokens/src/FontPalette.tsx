export type FontWeight = "thin" | "medium" | "semibold" | "bold" | "black";

export type FontWeightMap = Record<FontWeight, number>;

export interface FontPalette<Name extends string> {
  (font: Name): FontDefinition;
  all(): FontDefinition[];
}

export interface CustomFontDefinition {
  name: string;
  importUrl: string;
}

export type FontDefinition = CustomFontDefinition | string;

export function makeFontPalette<Name extends string>(
  definitions: Record<Name, CustomFontDefinition>,
): FontPalette<Name> {
  const palette = (font: Name) => definitions[font];
  palette.all = () => Object.values<FontDefinition>(definitions);

  return palette;
}
