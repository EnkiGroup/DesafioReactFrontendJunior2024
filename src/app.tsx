import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { TaskProvider } from "./contexts/TaskContext";
import { Home } from "./pages/home";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TaskProvider>
        <Home />
        <GlobalStyle />
        <Toaster />
      </TaskProvider>
    </ThemeProvider>
  );
}
