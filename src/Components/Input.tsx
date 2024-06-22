import React, { KeyboardEvent, useState } from "react";
import  InterfaceTodo  from "../Models/InterfaceTodo";
import axios from "axios";


const Input: React.FC = () => {
  const [itemList, setItemList] = useState<InterfaceTodo[]>([]);
  const [inputItem, setInputItem] = useState("");

  const handleInput = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(inputItem);
      if (inputItem.trim() === "") return;

      try {
        const response = await axios.post(
          "http://localhost:5000/todos",
          {
            title: inputItem,
            isDone: false,
          }
        );

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

  console.log(itemList);

  return (
    <div className="relative">
      <form>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputItem}
          onChange={(e) => setInputItem(e.target.value)}
          onKeyDown={(e) => handleInput(e as KeyboardEvent<HTMLInputElement>)}
        />
        <label
          htmlFor="checkAll"
        ></label>
        <input type="checkbox" className="hidden" id="checkAll" />
      </form>
    </div>
  );
};

export default Input;



// const handleInput = async (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     console.log(inputItem);
  //     if (inputItem.trim() === '') return;
  //     try {
  //       const newItem = await postTodo();
  //       setItemList([...itemList, newItem]); // Adicionar o novo item à lista
  //       setInputItem('');
  //     } catch (error) {
  //       console.error('Erro ao enviar todo para o servidor:', error);
  //     }
  //   }
  // };

  // const postTodo = async (): Promise<InterfaceTodo> => {
  //   try {
  //     const response = await axios.post('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos', {
  //       title: inputItem,
  //       isDone: false,
  //     });

  //     return {
  //       id: response.data.id,
  //       title: response.data.title,
  //       isDone: response.data.isDone
  //     };
  //   } catch (error) {
  //     throw new Error('Erro ao postar o todo: ' + error);
  //   }
  // };
