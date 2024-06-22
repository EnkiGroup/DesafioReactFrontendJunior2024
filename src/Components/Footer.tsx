import { Link, useLocation } from "react-router-dom";

interface FooterProps {
  contaItem: number;
}

function Footer({ contaItem }: FooterProps) {
  const location = useLocation();

  return (
    <footer>
      <div>
        <span>
          {contaItem} {contaItem === 1 ? "item" : "items"} left
        </span>
      </div>
      <div>
        <Link
          to={"/"}
          className={`px-5 py-1 font-sans text-sm font-light tracking-wider text-gray-500 duration-200 border ${
            location.pathname === "/" ? "border-red-100" : "border-transparent"
          } rounded-sm hover:border-red-300`}
        >
          All
        </Link>
        <Link
          to={"/active"}
          className={`px-5 py-1 font-sans text-sm font-light tracking-wider text-gray-500 duration-200 border ${
            location.pathname === "/active"
              ? "border-red-100"
              : "border-transparent"
          } rounded-sm hover:border-red-300`}
        >
          Active
        </Link>
        <Link
          to={"/completed"}
          className={`px-5 py-1 font-sans text-sm font-light tracking-wider text-gray-500 duration-200 border ${
            location.pathname === "/completed"
              ? "border-red-100"
              : "border-transparent"
          } rounded-sm hover:border-red-300`}
        >
          Completed
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
