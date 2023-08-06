import { CreateThemeContextReturn, createAppContainer, createThemeContext } from "@spyrothon/sparx";
import { tokens } from "../../design/generated/Tokens";
import { setThemeContext } from "@spyrothon/sparx/examples/util/Theming";

tokens.resolveThemeColorToken("ACCENT_ACTIVE_PINK", "dark", "purple");

const themeContext = createThemeContext(tokens);
const AppContainer = createAppContainer(themeContext);

const { ThemeContext, ThemeProvider, getThemeClass } = themeContext;
export { AppContainer, ThemeContext, ThemeProvider, getThemeClass };

setThemeContext(themeContext as CreateThemeContextReturn<string, string, string>);
