import { KeyboardEvent, useCallback, useState } from "react";
import useTodoContext from "../../contexts/TodoContext";
import Input from "../ui/input/Input";

const Header = () => {
  const { createTodo } = useTodoContext();
  const [newTodo, setNewTodo] = useState<string>("");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter" && newTodo.trim() !== "") {
        createTodo(newTodo);
        setNewTodo("");
      }
    },
    [createTodo, newTodo]
  );

  return (
    <header className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-title-color text-8xl">todos</h1>
      <Input
        input_cn="focus:shadow-focus border p-default placeholder:italic text-2xl placeholder:text-2xl placeholder:font-light shadow-inner"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
};

export default Header;
