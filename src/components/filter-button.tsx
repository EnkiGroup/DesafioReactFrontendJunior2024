import { useLocation, Link } from "react-router-dom";

interface FilterButtonProps {
  filterName: string;
  route: string;
}

export function FilterButton({ route, filterName }: FilterButtonProps) {

  const { pathname } = useLocation();

  const isChecked = pathname === route;

  return (
    <Link to={route} className="flex items-center">
      <input
        type="radio"
        name="filters"
        className="sr-only peer"
        checked={isChecked}
        readOnly
      />
      <label
        htmlFor={route}
        className="px-2 border border-transparent hover:border-neutral-300 hover:shadow-md rounded-[3px] cursor-pointer peer-checked:border-neutral-300 peer-checked:shadow-md transition-all duration-500"
      >
        {filterName}
      </label>
    </Link>
  );
}
