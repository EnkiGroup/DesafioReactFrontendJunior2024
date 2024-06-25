import { createGlobalStyle } from 'styled-components'

export const StyleGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f5f5f5;
    z-index: 2;
    font-family: sans-serif;
  }

  iframe {
    display: none;
  }

  .container {
    max-width: 550px;
    width: 100%;
    margin: 0 auto;
  }
`
