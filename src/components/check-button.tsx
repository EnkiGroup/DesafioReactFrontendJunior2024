import { Check } from "lucide-react";

interface CheckButtonProps {
  isDone: boolean,
  onCheck: () => void
}

export function CheckButton({ isDone, onCheck }: CheckButtonProps) {
  return (
    <label className="relative w-14 flex items-center justify-center">
      <input
        type="checkbox"
        checked={isDone}
        onChange={onCheck}
        className="sr-only peer"
      />
      <span
        className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center peer-checked:border-green-600 transition-all ease-in-out duration-500 cursor-pointer"
        data-testid="check-span"
      >
        {isDone && <Check className="text-green-600" data-testid="check-icon" />}
      </span>
    </label>
  );
}