import Filter from "../../components/Filter";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import InputForm from "../../components/Input";
import TodoList from "../../components/TodoList";
import useHomePage from "../../hooks/useHomePage";
import { ContainerHomePage, FormContainer } from "./styled";

const Home = () => {
  const {
    handleSubmit,
    setValueInput,
    tasks,
    valueInput,
    enableAllTasks,
    tasksEnable,
    remainingTasks,
    clearEnableTasks,
  } = useHomePage();

  return (
    <ContainerHomePage>
      <Header titleText="todos" />
      <FormContainer taskEnabled={tasksEnable}>
        <InputForm
          placeholder="What needs to be done?"
          handleSubmit={handleSubmit}
          setValue={setValueInput}
          value={valueInput}
          handleClickIcon={enableAllTasks}
        />
        <div>
          <TodoList ItemList={tasks} />
        </div>
        <Filter
          itensList={`${remainingTasks?.length} items left!`}
          handleCompletedClick={clearEnableTasks}
        />
      </FormContainer>
      <Footer />
    </ContainerHomePage>
  );
};

export default Home;
