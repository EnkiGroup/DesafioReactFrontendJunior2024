import { useCallback } from "react"
import { hasValidMin, sanitize } from "../../utils/handleStrings"
import "./style.scss"

/**
 * Renders an input component with optional default value and onBlur callback.
 *
 * @param {Object} props - The properties for the Input component.
 * @param {Function} props.onSubmit - The function to call when the input is submitted.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {string} props.label - The label text for the input.
 * @param {string} [props.defaultValue] - The default value for the input.
 * @param {Function} [props.onBlur] - The function to call when the input loses focus.
 * @returns {JSX.Element} The rendered Input component.
 */
const Input = ({
  onSubmit,
  placeholder,
  label,
  defaultValue = "",
  onBlur = () => {},
}: {
  onSubmit: (value: string) => void
  placeholder: string
  label: string
  defaultValue?: string
  onBlur?: () => void
}): JSX.Element => {
  const handleBlur = useCallback(() => {
    onBlur()
  }, [onBlur])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        const value: string = e.currentTarget.value.trim()

        if (!hasValidMin(value, 2)) return

        onSubmit(sanitize(value))
        e.currentTarget.value = ""
      }
    },
    [onSubmit]
  )

  return (
    <>
      <input
        className='new-todo'
        id='todo-input'
        type='text'
        data-testid='text-input'
        autoFocus
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <label className='visually-hidden' htmlFor='todo-input'>
        {label}
      </label>
    </>
  )
}

export default Input
