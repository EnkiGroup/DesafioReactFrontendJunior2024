import styled from 'styled-components'

import cicle from '../../../assets/images/circle_todo.svg'
import cicleCompleted from '../../../assets/images/circle_todo_completed.svg'

type Props = {
  iscompleted: boolean
}

export const List = styled.ul`
  background-color: white;
  li {
    list-style: none;
    position: relative;
  }
`

export const ItemTodo = styled.div<Props>`
  font-size: 24px;
  color: #484848;
  border-bottom: 1px solid #ededed;

  .check_completed {
    width: 40px;
    height: auto;
    margin: auto 0;
    position: absolute;
    top: 0;
    bottom: 0;
    text-align: center;
    opacity: 0;
  }

  .title_item {
    width: 100%;
    padding: 15px 15px 15px 60px;
    display: block;
    background-color: white;
    border: none;
    line-height: 1.2;
    font-size: 24px;
    word-break: break-all;
    color: ${(props) => (props.iscompleted ? '#949494' : '#484848')};
    text-decoration: ${(props) =>
      props.iscompleted ? 'line-through' : 'none'};
  }

  input + label {
    background-image: url(${(props) =>
      props.iscompleted ? cicleCompleted : cicle});
    background-position: 0;
    background-repeat: no-repeat;
  }

  input {
    margin-bottom: 1px;

    &:focus {
      box-shadow: 0 0 2px 2px #cf7d7d;
      outline: 0;
    }
  }

  &:hover {
    button {
      display: block;
    }
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

  &:hover {
    color: #cf7d7d;
  }

  &:active {
    box-shadow: 0 0 2px 2px #cf7d7d;
  }
`
