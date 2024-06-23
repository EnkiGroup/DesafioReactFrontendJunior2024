import styled from 'styled-components'

import cicle from '../../../assets/images/circle_todo.svg'

export const List = styled.ul`
  background-color: white;
  li {
    list-style: none;
    position: relative;
  }
`

export const ItemTodo = styled.div`
  font-size: 24px;
  color: #484848;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;

  label {
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    word-break: break-all;
  }

  input {
    width: 40px;
    height: auto;
    margin: auto 0;
    position: absolute;
    top: 0;
    bottom: 0;
    text-align: center;
    opacity: 0;
  }

  input + label {
    background-image: url(${cicle});
    background-position: 0;
    background-repeat: no-repeat;
  }
`

export const ButtonDelete = styled.button`
  width: 40px;
  height: 40px;
  margin: auto 0;
  position: absolute;
  bottom: 0;
  top: 0;
  right: 10px;
  display: none;
  font-size: 30px;
  color: #949494;
  background-color: transparent;
  border: none;
  transition: color 0.2s ease-out;

  &::after {
    height: 100%;
    display: block;
    line-height: 1.1;
    content: '×';
  }
`
