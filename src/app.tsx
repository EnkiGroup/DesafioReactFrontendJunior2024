import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/globalStyles";
import Home from "./pages/home";
import GlobalProvider from "./context/GlobalContext";
import { Toaster } from "react-hot-toast";
import LottieAnimation from "./components/LottieAnimation";
import { useState } from "react";

export default function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <GlobalStyles />
        {showAnimation ? (
          <LottieAnimation onComplete={handleAnimationComplete} />
        ) : (
          <>
            <Home />
            <Toaster position="top-center" reverseOrder={false} />
          </>
        )}
      </GlobalProvider>
    </ThemeProvider>
  );
}
