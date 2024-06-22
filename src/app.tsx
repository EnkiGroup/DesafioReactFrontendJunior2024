import { useState } from "react";
import Header from "./components/Header"
import Input from "./components/Input"

export default function App() {
  const [isFocused, setIsFocused] = useState(false);


  return (

    <div className="block bg-slate-200 h-screen">
      <Header />

      <div className="flex justify-center items-top w-full">

        <div className="max-w-[360px] w-5/6">

          <Input />
          
          <div className="bg-slate-500 h-10 w-full"></div>

        </div>

      </div>


    </div>
  );
}
