import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

import { CheckButton } from "../../components/check-button"

describe("CheckButton", () => {
  let isDone = false;
  const onCheckMock = jest.fn(() => isDone = !isDone);

  it("should render check icon and border color correctly when checkButton is clicked", () => {
    const { rerender } = render(<CheckButton isDone={isDone} onCheck={onCheckMock} />);

    const checkIconBefore = screen.queryByTestId("check-icon");
    expect(checkIconBefore).not.toBeInTheDocument();

    const checkBorderBefore = screen.getByTestId("check-border");
    expect(checkBorderBefore).toHaveStyle("border-color: rgb(156 163 175)");

    const checkButton = screen.getByRole("checkbox");
    fireEvent.click(checkButton);

    rerender(<CheckButton isDone={isDone} onCheck={onCheckMock} />);

    const checkIconAfter = screen.getByTestId("check-icon");
    expect(checkIconAfter).toBeInTheDocument();

    const checkBorderAfter = screen.getByTestId("check-border");
    expect(checkBorderAfter).toHaveStyle("border-color: rgb(22 163 74)");
  });
})