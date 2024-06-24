import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../utils/renderWithTheme";
import Header from ".";

describe("Header component", () => {
  it("Should render header componenet", () => {
    renderWithTheme(<Header titleText="todos"/>)

    const header = screen.getByText("todos");

    expect(header).toBeInTheDocument();
  })
})