import { ChevronDown } from "lucide-react"

interface CheckAllButtonProps {
  isActiveStyle: boolean
  onClick: () => void
}

export function CheckAllButton({ isActiveStyle, onClick }: CheckAllButtonProps) {
  return (
    <button
      type="button"
      className="w-14 flex items-center justify-center pr-1"
      onClick={onClick}
      data-testid="check-all-button"
    >
      <ChevronDown
        size={28}
        className={isActiveStyle ? "text-[#333]" : "text-[#AAA]"}
        data-testid="chevron-icon"
      />
    </button>
  )
}