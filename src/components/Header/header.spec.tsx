import { render, screen } from "@testing-library/react";
import { Header } from ".";

describe("Header Component", () => {
  it("should render header component correctly", () => {
    render(<Header />);

    expect(screen.getByText("todos")).toBeInTheDocument();
  });
});
