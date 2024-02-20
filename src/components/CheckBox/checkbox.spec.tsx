import { render, screen } from "@testing-library/react";
import { Checkbox } from ".";

describe("checkbox component", () => {
  it("should render checkbox component correctly", () => {
    render(<Checkbox checked onChange={() => {}} />);

    expect(screen.getByTestId("checkbox-icon")).toBeInTheDocument();
  });
});
