import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../helper/renderWithTheme";
import Checkbox from ".";

describe("Checkbox component", () => {
  it("Should render component", () => {
    renderWithTheme(<Checkbox checked={true} />);

    const checkBox = screen.getByRole("checked");

    expect(checkBox).toBeInTheDocument();
  });

  it("Should not render component when false is passed", () => {
    renderWithTheme(<Checkbox checked={false} />);

    const checkBox = screen.queryByRole("checkedIcon");

    expect(checkBox).not.toBeInTheDocument();
  });

  it("Shold have border color when false is passed", () => {
    renderWithTheme(<Checkbox checked={false} />);

    const checkBox = screen.getByRole("checked");

    expect(checkBox).toHaveStyle({ border: `1px solid #e5e5e5` });
  });

  it("Should call onClick prop on click", () => {
    const onClick = jest.fn();
    renderWithTheme(<Checkbox checked={true} handleClick={onClick} />);

    const checkBox = screen.getByRole("checked");

    fireEvent.click(checkBox);

    expect(onClick).toHaveBeenCalled();
  });
});
