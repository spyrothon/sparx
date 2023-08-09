import { ColorToken } from "./Tokens";

export type TokenReference = string & {};

export interface Theme {
  name: string;
  colors: Record<string, ColorToken | TokenReference>;
  shadows: Record<string, string[]>;
}

export interface Accent {
  name: string;
  tokens: string[];
}

export function isTokenReference(token: ColorToken | TokenReference): token is string {
  if (typeof token === "string") return true;
  return false;
}
