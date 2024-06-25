import React, { KeyboardEvent, useState, useEffect } from "react";
import InterfaceTodo from "../../Interface/InterfaceTodo";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import './Input.css';

const Input: React.FC = () => {
  const [itemList, setItemList] = useState<InterfaceTodo[]>([]);
  const [inputItem, setInputItem] = useState("");
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos");
      setItemList(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleInput = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputItem.trim() === "") return;

      try {
        const response = await axios.post("https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos", {
          title: inputItem,
          isDone: false,
        });

        const newItem: InterfaceTodo = {
          id: response.data.id,
          title: response.data.title,
          isDone: response.data.isDone,
        };

        setItemList([...itemList, newItem]);
        setInputItem("");
      } catch (error) {
        console.error("Error posting todo to server:", error);
      }
    }
  };

  const handleSelectAll = async () => {
    const updatedTodos = itemList.map(todo => ({
      ...todo,
      isDone: !isAllSelected
    }));

    try {
      await Promise.all(
        updatedTodos.map(todo =>
          axios.put(`https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos/${todo.id}`, todo)
        )
      );
      setItemList(updatedTodos);
      setIsAllSelected(!isAllSelected);
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  };

  return (
    <form>
      {itemList.length > 0 && (
        <button type="button" className="select" onClick={handleSelectAll}>
          {isAllSelected ? <IoIosArrowDown /> : <IoIosArrowDown />}
        </button>
      )}
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputItem}
        onChange={(e) => setInputItem(e.target.value)}
        onKeyDown={(e) => handleInput(e as KeyboardEvent<HTMLInputElement>)}
        className="input-toggle-container"
      />
      <label htmlFor="checkAll" className="label"></label>
    </form>
  );
};

export default Input;
