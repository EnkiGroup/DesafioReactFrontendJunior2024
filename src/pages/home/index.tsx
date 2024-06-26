import Filter from "../../components/Filter";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import InputForm from "../../components/Input";
import Loading from "../../components/Loading";
import TodoList from "../../components/TodoList";
import useHomePage from "../../hooks/useHomePage";
import {
  ContainerHomePage,
  FormContainer,
  ListItem,
  AnimaChecked,
} from "./styled";
import TodoCheckedAnimation from "../../assets/animation/TodoCheckedAnimation.json";
import Lottie from "react-lottie";
import { animationDefaultValues } from "../../utils/animationDefaultValues";

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
    isLoading,
    startAnimation,
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
        {isLoading ? (
          <Loading lines={3} />
        ) : (
          <ListItem>
            <TodoList ItemList={tasks} />
          </ListItem>
        )}
        <Filter
          itensList={
            remainingTasks > 1
              ? `${remainingTasks} items left!`
              : `${remainingTasks} item left!`
          }
          handleCompletedClick={clearEnableTasks}
        />
      </FormContainer>
      <Footer />
      {startAnimation && (
        <AnimaChecked>
          {" "}
          <Lottie
            options={animationDefaultValues(
              TodoCheckedAnimation,
              "lottie-svg-class",
            )}
            width={100}
            height={100}
          />
        </AnimaChecked>
      )}
    </ContainerHomePage>
  );
};

export default Home;
