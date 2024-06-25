import styled from 'styled-components'

export const InputCheck = styled.input`
  width: 40px;
  height: 65px;
  margin: 3px 3px 3px 4px;
  opacity: 0;
`

export const LabelCheck = styled.label`
  height: 65px;
  width: 45px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;

  &::before {
    color: #949494;
    content: '❯';
    display: inline-block;
    font-size: 22px;
    padding: 10px 27px;
    transform: rotate(90deg);
  }
`

export const Toggle = styled.div`
  position: absolute;
  top: 0;

  ${InputCheck}::checked+${LabelCheck}::before {
    color: #484848;
  }
`
