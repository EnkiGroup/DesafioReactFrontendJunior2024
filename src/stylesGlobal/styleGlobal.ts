import { createGlobalStyle } from 'styled-components'

export const StyleGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f5f5f5;
  }

  .container {
    max-width: 60%;
    width: 100%;
    margin: 0 auto;
  }
`
