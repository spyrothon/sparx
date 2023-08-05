import type chroma from "chroma-js";

export type TokenReference = string & {};

export interface Theme {
  name: string;
  colors: Record<string, chroma.Color | TokenReference>;
}

export interface Accent {
  name: string;
  tokens: string[];
}

export function isTokenReference(token: chroma.Color | TokenReference): token is string {
  if (typeof token === "string") return true;
  return false;
}
