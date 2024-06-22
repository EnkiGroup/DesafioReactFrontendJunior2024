import Button from "../Button";
import { FilterContainer, FilterButtonContainer } from "./styled";

type FilterProps = {
  itensList?: string;
  handleCompletedClick?: () => void;
};

const Filter = ({ itensList, handleCompletedClick }: FilterProps) => {
  return (
    <FilterContainer>
      {itensList && <span>{itensList}</span>}
      <FilterButtonContainer>
        <Button to={"all"}>All</Button>
        <Button to={"active"}>Active</Button>
        <Button to={"completed"}>Completed</Button>
      </FilterButtonContainer>
      <span onClick={handleCompletedClick}>Clear completed</span>
    </FilterContainer>
  );
};

export default Filter;
