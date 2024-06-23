import { NavLink } from "react-router-dom";
import { useTodo } from "../../context/TodoContext";

export default function Filterbar() {

  const { removeDoneTodos, getRemainingTodos} = useTodo();
  
  const buttonStyles =
    "text-center text-[14px] mx-2 p-2 py-0 hover:border-red-700 active:border-red-700 active:border-2 hover:border-2";

  return (
    <div className="w-1/3 mx-auto bg-white drop-shadow-md text-2xl border-gray-300 border-solid border-2 align-bottom flex justify-between items-center">
      <span className="text-center text-[14px] mx-2 p-2 py-0">
        {getRemainingTodos()} item{getRemainingTodos() === 1 ? "" : "s"} left!
      </span>
      <div className="flex justify-between items-center">
        <NavLink to="/" className={buttonStyles}>
          All
        </NavLink>
        <NavLink to="/active" className={buttonStyles}>
          Active
        </NavLink>
        <NavLink to="/completed" className={buttonStyles}>
          Completed
        </NavLink>
      </div>
      <button
        className="text-center text-[14px] mx-2 p-2 py-0 hover:underline"
        onClick={removeDoneTodos}
      >
        Clear Completed
      </button>
    </div>
  );
}
