import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router-dom";

import { FilterButton } from "../../components/filter-button";

describe("FilterButton", () => {
  it("should render filterButton with correct text", () => {
    const currentRoute = "/"
    const filterButtonRoute = "/"
    render(
      <MemoryRouter initialEntries={[currentRoute]}>
        <FilterButton route={filterButtonRoute} filterName="All" />
      </MemoryRouter>
    );

    const filterButton = screen.getByText("All");
    expect(filterButton).toBeInTheDocument();
  });

  it("should render with correct styles when route match", () => {
    const currentRoute = "/active"
    const filterButtonRoute = "/active"
    render(
      <MemoryRouter initialEntries={[currentRoute]}>
        <FilterButton route={filterButtonRoute} filterName="Active" />
      </MemoryRouter>
    );

    const filterInput = screen.getByRole("radio");
    expect(filterInput).toBeChecked();

    const filterLabel = screen.getByText("Active");
    expect(filterLabel).toHaveStyle({ "borderColor": "rgb(254 202 202)" })
  });

  it("should render with correct styles when route mismatch", () => {
    const currentRoute = "/"
    const filterButtonRoute = "/completed"
    render(
      <MemoryRouter initialEntries={[currentRoute]}>
        <FilterButton route={filterButtonRoute} filterName="Completed" />
      </MemoryRouter>
    );

    const filterInput = screen.getByRole("radio");
    expect(filterInput).not.toBeChecked();

    const filterLabel = screen.getByText("Completed");
    expect(filterLabel).toHaveStyle({ "borderColor": "" })
  });

  it("should switch route when filterButton is clicked", () => {
    const currentRoute = "/"
    const filterButtonRoute = "/completed"
    render(
      <MemoryRouter initialEntries={[currentRoute]}>
        <FilterButton route={filterButtonRoute} filterName="Completed" />
      </MemoryRouter>
    );

    const filterInput = screen.getByRole("radio");
    expect(filterInput).not.toBeChecked();

    const navigateButton = screen.getByTestId("navigate-button")

    fireEvent.click(navigateButton);

    expect(filterInput).toBeChecked();
  });
});
