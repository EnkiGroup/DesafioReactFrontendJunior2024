

import { styled } from 'styled-components'

import { base } from '../../style'

export const Layout = styled.div`
  .new-todo {
    ${base.textInput};
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
`
