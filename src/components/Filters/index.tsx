import { FiltersButton, FiltersContainer } from "./styles";

export function Filters() {
  return (
    <FiltersContainer data-testid="filters">
      <FiltersButton to={"all"}>All</FiltersButton>
      <FiltersButton to={"active"}>Active</FiltersButton>
      <FiltersButton to={"completed"}>Completed</FiltersButton>
    </FiltersContainer>
  );
}
