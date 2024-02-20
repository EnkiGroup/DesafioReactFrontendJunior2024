interface XIconProps {
  size: number;
}

export function XIcon({ size }: XIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-x"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
