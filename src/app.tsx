import "./index.css";
import Wrapper from "./components/wrapper/wrapper";
import Header from "./components/header/header";
import Inputbar from "./components/inputbar/inputbar";
import TodoList from "./components/list/list";
import Filterbar from "./components/filterbar/filterbar";
import { TodoProvider } from "./context/TodoContext";
import Footer from "./components/footer/footer";

export default function App() {
  return (
    <TodoProvider>
      <Wrapper>
        <Header />
        <Inputbar />
        <TodoList />
        <Filterbar />
        <Footer />
      </Wrapper>
    </TodoProvider>
  );
}
