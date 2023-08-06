import * as React from "react";
import { ThemedTokenResolver } from "@spyrothon/tokens";

interface ThemeContextValue<
  Theme extends string,
  Accent extends string,
  ThemeTokenName extends string,
> {
  theme: Theme;
  accent: Accent;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  resolveThemeColorToken: ThemedTokenResolver<ThemeTokenName, Theme, Accent>;
}

interface ThemeProviderProps<Theme, Accent> {
  theme?: Theme;
  accent?: Accent;
  children: React.ReactNode;
}

interface TokenProvidingObject<
  Theme extends string,
  Accent extends string,
  ThemeTokenName extends string,
> {
  themes: readonly Theme[];
  accents: readonly Accent[];
  resolveThemeColorToken: ThemedTokenResolver<ThemeTokenName, Theme, Accent>;
}

export interface CreateThemeContextReturn<
  Theme extends string,
  Accent extends string,
  ThemeTokenName extends string,
> extends TokenProvidingObject<Theme, Accent, ThemeTokenName> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ThemeContext: React.Context<ThemeContextValue<Theme, Accent, ThemeTokenName>>;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ThemeProvider: React.ComponentType<ThemeProviderProps<Theme, Accent>>;
  getThemeClass: any;
  useThemeClass: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
let _createdThemeContext: CreateThemeContextReturn<string, string, string> | undefined = undefined;

export function getCreatedThemeContext(): CreateThemeContextReturn<string, string, string> {
  if (_createdThemeContext == null) {
    throw "[Sparx Design System] Tried to read the current theme context, but none exists. Make sure to call `createThemeContext` in your application";
  }
  return _createdThemeContext;
}

export function useResolvedColorToken(token: string) {
  const { ThemeContext, resolveThemeColorToken } = getCreatedThemeContext();
  const { theme, accent } = React.useContext(ThemeContext);
  return resolveThemeColorToken(token, theme, accent);
}

export function createThemeContext<
  Theme extends string,
  Accent extends string,
  ThemeTokenName extends string,
>(
  tokens: TokenProvidingObject<Theme, Accent, ThemeTokenName>,
): CreateThemeContextReturn<Theme, Accent, ThemeTokenName> {
  const { themes, accents, resolveThemeColorToken } = tokens;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const ThemeContext = React.createContext<ThemeContextValue<Theme, Accent, ThemeTokenName>>({
    theme: themes[0],
    accent: accents[0],
    setTheme: () => null,
    setAccent: () => null,
    resolveThemeColorToken,
  });

  function getThemeClass(theme: Theme, accent: Accent): string {
    return `theme-${theme} accent-${accent}`;
  }

  function useThemeClass(): string {
    const { theme, accent } = React.useContext(ThemeContext);

    return getThemeClass(theme, accent);
  }

  function ThemeProvider(props: ThemeProviderProps<Theme, Accent>) {
    const { theme: controlledTheme, accent: controlledAccent, children } = props;

    const [theme, setTheme] = React.useState(controlledTheme ?? themes[0]);
    const [accent, setAccent] = React.useState(controlledAccent ?? accents[0]);

    React.useEffect(() => {
      if (controlledTheme != null) {
        setTheme(controlledTheme);
      }

      if (controlledAccent != null) {
        setAccent(controlledAccent);
      }
    }, [controlledTheme, controlledAccent]);

    const contextValue = React.useMemo<ThemeContextValue<Theme, Accent, ThemeTokenName>>(
      () => ({
        theme,
        accent,
        setTheme,
        setAccent,
        resolveThemeColorToken,
      }),
      [theme, accent],
    );

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
  }

  const created = {
    ThemeContext,
    ThemeProvider,
    getThemeClass,
    useThemeClass,
    themes,
    accents,
    resolveThemeColorToken,
  };

  // @ts-expect-error this is a type widening that we'll just say is okay for now
  _createdThemeContext = created;

  return created;
}
