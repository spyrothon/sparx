import * as React from "react";
import { CreateThemeContextReturn, createAppContainer, createThemeContext } from "@spyrothon/sparx";
import { Accent, Theme, tokens } from "../../design/generated/Tokens";
import { setThemeContext } from "../../../sparx/examples/util/Theming";
import create from "zustand";
import { persist } from "zustand/middleware";
import { noSSR } from "next/dynamic";

const themeContext = createThemeContext(tokens);
const AppContainer = createAppContainer(themeContext);

const { ThemeContext, ThemeProvider, getThemeClass } = themeContext;

setThemeContext(themeContext as CreateThemeContextReturn<string, string, string>);

const IS_SSG = typeof window === "undefined";

const darkThemeQuery = !IS_SSG ? window.matchMedia("(prefers-color-scheme: dark)") : undefined;
const lightThemeQuery = !IS_SSG ? window.matchMedia("(prefers-color-scheme: light)") : undefined;

function getCurrentColorScheme(): Theme {
  if (IS_SSG) return "light";

  if (darkThemeQuery!.matches) return "dark";
  if (lightThemeQuery!.matches) return "light";
  return "light";
}

function setCurrentThemeFromQuery() {
  useThemeStore.setState((state) => state.setTheme(getCurrentColorScheme(), state.accent));
}

if (!IS_SSG) {
  darkThemeQuery!.addEventListener("change", setCurrentThemeFromQuery);
  lightThemeQuery!.addEventListener("change", setCurrentThemeFromQuery);
}

interface ThemeStoreState {
  theme: Theme;
  accent: Accent;
  setTheme(theme: Theme, accent: Accent): void;
}

export const useThemeStore = create(
  persist(
    (set): ThemeStoreState => ({
      theme: getCurrentColorScheme(),
      accent: "pink",
      setTheme(theme: Theme, accent: Accent) {
        set({ theme, accent });
      },
    }),
    {
      name: "docs-theme",
    },
  ),
);

export { AppContainer, ThemeContext, ThemeProvider, getThemeClass };
