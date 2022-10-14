import * as React from "react";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export enum Accent {
  BLUE = "blue",
  PURPLE = "purple",
  PINK = "pink",
}

interface ThemeContextValue {
  theme: Theme;
  accent: Accent;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: Theme.DARK,
  accent: Accent.BLUE,
  setTheme: () => null,
  setAccent: () => null,
});

export function getThemeClass(theme: Theme, accent: Accent = Accent.BLUE): string {
  return `theme-${theme} accent-${accent}`;
}

export function useThemeClass(): string {
  const { theme, accent } = React.useContext(ThemeContext);

  return getThemeClass(theme, accent);
}

interface ThemeProviderProps {
  theme?: Theme;
  accent?: Accent;
  children: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { theme: controlledTheme, accent: controlledAccent, children } = props;

  const [theme, setTheme] = React.useState(controlledTheme ?? Theme.DARK);
  const [accent, setAccent] = React.useState(controlledAccent ?? Accent.BLUE);

  React.useEffect(() => {
    if (controlledTheme != null) {
      setTheme(controlledTheme);
    }

    if (controlledAccent != null) {
      setAccent(controlledAccent);
    }
  }, [controlledTheme, controlledAccent]);

  const contextValue = React.useMemo(
    () => ({ theme, accent, setTheme, setAccent }),
    [theme, accent],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
