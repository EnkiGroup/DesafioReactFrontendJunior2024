import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  font: inherit;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 2rem;
}

#root {
  display: flex;
  justify-content: center;
  margin: 0 10px;
}

@media screen and (max-width:900px){
  html {
  font-size: 88.5%;
}

 }
@media screen and (max-width:420px){
  html {
  font-size: 81.25%;
}

}

`;
