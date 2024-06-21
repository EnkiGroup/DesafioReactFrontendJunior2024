import { Link, useLocation } from "react-router-dom";
import useTodoContext from "../../contexts/TodoContext";

const Footer = () => {
  const { pending, todos } = useTodoContext();
  const { pathname: location } = useLocation();

  return (
    <footer className="relative flex flex-col items-center">
      {todos.length > 0 && (
        <>
          <div className="z-30 w-full absolute flex justify-between p-[16px] border border-gray-200 shadow-md bg-white">
            <span>
              {pending > 1 ? `${pending} items left` : `${pending} item left`}
            </span>
            <ul className="w-[40%] flex justify-evenly">
              <li>
                <Link
                  className={`p-1 hover:border hover:border-red-300 rounded-md ${
                    location === "/" || location === "/all"
                      ? "shadow-focus border border-red-500"
                      : ""
                  }`}
                  to="/all"
                >
                  All
                </Link>
              </li>
              <li>
                <Link
                  className={`p-1 hover:border hover:border-red-300 rounded-md ${
                    location === "/active"
                      ? "shadow-focus border border-red-500"
                      : ""
                  }`}
                  to="/active"
                >
                  Active
                </Link>
              </li>
              <li>
                <Link
                  className={`p-1 hover:border hover:border-red-300 rounded-md ${
                    location === "/completed"
                      ? "shadow-focus border border-red-500"
                      : ""
                  }`}
                  to="/completed"
                >
                  Completed
                </Link>
              </li>
            </ul>
            <button className="hover:underline">
              Clear completed
            </button>
          </div>
          <div className="absolute top-[29px] z-20 w-[98%] bg-white p-[16px] shadow-md border border-gray-200"></div>
          <div className="absolute top-[34px] z-10 w-[95%] bg-white p-[16px] shadow-md border border-gray-200"></div>
        </>
      )}
    </footer>
  );
};

export default Footer;
