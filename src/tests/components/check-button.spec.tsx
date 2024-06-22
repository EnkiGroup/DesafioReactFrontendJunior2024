import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { CheckButton } from "../../components/check-button"

describe("CheckButton component", () => {
  it("should render check icon and change border color correctly", () => {
    let isDone = false;
    const onCheckMock = () => {
      isDone = !isDone;
    };

    const { rerender } = render(<CheckButton isDone={isDone} onCheck={onCheckMock} />);

    const checkIconBefore = screen.queryByTestId('check-icon');
    expect(checkIconBefore).not.toBeInTheDocument();

    const span = screen.getByTestId('check-span');
    expect(span).toHaveStyle('border-color: rgb(156 163 175)');

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    rerender(<CheckButton isDone={isDone} onCheck={onCheckMock} />);

    const checkIconAfter = screen.getByTestId('check-icon');
    expect(checkIconAfter).toBeInTheDocument();

    expect(span).toHaveStyle('border-color: rgb(22 163 74)');
  });

  it("should call onCheck prop on click", () => {
    const onCheckMock = jest.fn();
    render(<CheckButton isDone={false} onCheck={onCheckMock} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onCheckMock).toHaveBeenCalled();
  })
})