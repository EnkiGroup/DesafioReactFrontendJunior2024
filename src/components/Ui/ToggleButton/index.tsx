import { InputCheck, LabelCheck, Toggle } from './style'

const ToggleButton = () => {
  return (
    <Toggle>
      <InputCheck type="checkbox" name="toogle-all" />
      <LabelCheck htmlFor="toogle-all">Toggle All Input</LabelCheck>
    </Toggle>
  )
}

export default ToggleButton
