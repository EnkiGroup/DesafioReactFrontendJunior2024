import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme["bg"]};
    -webkit-font-smoothing: antialiased;
  }

  ul > li {
    list-style: none;
  }

  button {
    border: 0;
    background: transparent;
  }

  body, input, textarea, button {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

`;
