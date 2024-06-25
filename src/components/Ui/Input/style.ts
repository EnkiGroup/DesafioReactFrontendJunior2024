import styled from 'styled-components'

export const InputTodo = styled.input`
  width: 100%;
  height: 65px;
  padding: 16px 16px 16px 60px;
  margin-bottom: 2px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-size: 24px;

  &:focus {
    box-shadow: 0 0 2px 2px #cf7d7d;
    outline: 0;
  }
`
