import React, { KeyboardEvent, useState, useEffect } from "react";
import InterfaceTodo from "../../Interface/InterfaceTodo";
import axios from "axios";
import './Input.css'
import { IoIosArrowDown } from "react-icons/io";

const Input: React.FC = () => {
  const [itemList, setItemList] = useState<InterfaceTodo[]>([]);
  const [inputItem, setInputItem] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setItemList(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleInput = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputItem.trim() === "") return;

      try {
        const response = await axios.post("http://localhost:5000/todos", {
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

  return (
    <div className="container">
      <form>
        {itemList.length > 0 && (
          <button type="button" className="select" style={{ backgroundColor: 'transparent' }}>
            <IoIosArrowDown />
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
    </div>
  );
};

export default Input;
