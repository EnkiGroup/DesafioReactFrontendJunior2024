import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FiltersButton, FiltersContainer } from "./styles";

describe("Filter component", () => {
  it("should highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/all"]}>
        <FiltersContainer>
          <FiltersButton to={"/all"}>All</FiltersButton>
          <FiltersButton to={"/active"}>Active</FiltersButton>
          <FiltersButton to={"/completed"}>Completed</FiltersButton>
        </FiltersContainer>
      </MemoryRouter>
    );

    expect(wrapper.getByText("All").className).toContain("active");
  });
});
