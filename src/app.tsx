import "./index.css";
import Wrapper from "./components/wrapper/wrapper";
import Header from "./components/header/header";
import Inputbar from "./components/inputbar/inputbar";
import TodoList from "./components/list/list";
import Filterbar from "./components/filterbar/filterbar";

export default function App() {
  return (
    <Wrapper>
      <Header />
      <Inputbar />
      <TodoList />
      <Filterbar />
    </Wrapper>
  );
}
