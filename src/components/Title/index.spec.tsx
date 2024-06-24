import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../utils/renderWithTheme";
import Title from ".";

describe("Title component", () => {
  it("Should render component", () => {
    renderWithTheme(<Title>todos</Title>);

    const textValue = screen.getByRole("heading");

    expect(textValue).toBeInTheDocument();
  });

  it("Should render component when the child is passed", () => {
    renderWithTheme(<Title>render title</Title>);

    const textValue = screen.getByText("render title");

    expect(textValue).toBeInTheDocument();
  });
});
