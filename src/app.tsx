import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/scss/styles.scss";
import TodoApp from "./components/todoApp";
import { TodoProvider } from "./context/todoContext";

export default function App() {

  return (
    <TodoProvider>
      <Router>
        <TodoApp />
        <Routes>
          <Route path="/" element={null} />
          <Route path="/active" element={null} />
          <Route path="/completed" element={null} />
        </Routes>
      </Router>
    </TodoProvider>
    

  );
}
