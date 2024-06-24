import { useLocation, Link } from "react-router-dom";

interface FilterButtonProps {
  filterName: string;
  route: string;
}

export function FilterButton({ route, filterName }: FilterButtonProps) {

  const { pathname } = useLocation();

  const isChecked = pathname === route;

  return (
    <Link to={route} className="flex items-center" data-testid="navigate-button">
      <input
        type="radio"
        name="filters"
        className="sr-only peer"
        checked={isChecked}
        readOnly
      />
      <label
        htmlFor={route}
        className="px-2 border border-transparent hover:border-red-200 hover:shadow-md rounded-[3px] cursor-pointer peer-checked:border-red-200 peer-checked:shadow-md transition-all duration-500"
      >
        {filterName}
      </label>
    </Link>
  );
}
