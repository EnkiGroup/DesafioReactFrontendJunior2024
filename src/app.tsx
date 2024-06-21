import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/globalStyles";
import Home from "./pages/home";
import GlobalProvider from "./context/GlobalContext";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <GlobalStyles />
        <Home />
      </GlobalProvider>
    </ThemeProvider>
  );
}
