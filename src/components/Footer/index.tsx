import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import { Filters } from "../Filters";
import { FooterContainer, SummaryTasks } from "./styles";

export function Footer() {
  const { isClearCompleted, totalOutstanding } = useContext(TaskContext);

  return (
    <FooterContainer>
      <SummaryTasks data-testid="summary">
        <span>
          {totalOutstanding > 1
            ? `${totalOutstanding} items left!`
            : `${totalOutstanding} item left!`}
        </span>
      </SummaryTasks>

      <Filters />

      <button onClick={isClearCompleted}>Clear completed</button>
    </FooterContainer>
  );
}
