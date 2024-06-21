type ChevronDownSolidProps = {
  handleChange?: () => void;
};

const ChevronDownSolid = ({ handleChange }: ChevronDownSolidProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={handleChange}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
};

export default ChevronDownSolid;
