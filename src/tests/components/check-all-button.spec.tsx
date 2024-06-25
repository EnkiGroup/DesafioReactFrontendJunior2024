import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CheckAllButton } from "../../components/check-all-button";

import { Task } from "../../types";

function renderComponent(tasks: Task[]) {

  const tasksLeft = tasks.filter(task => task.isDone === false).length

  const onClickMock = jest.fn();

  render(
    <CheckAllButton
      isActiveStyle={Boolean(tasks.length != 0 && tasksLeft == 0)}
      onClick={onClickMock}
    />
  );
}

describe("CheckAllButton", () => {
  const tasksWithAllCompleted: Task[] = [
    {
      "id": "flrGI",
      "title": "Lavar os pratos",
      "isDone": true
    },
    {
      "id": "Tw-I9",
      "title": "Cortar a grama",
      "isDone": true
    }
  ]

  const tasksWithOneIncompleted: Task[] = [
    {
      "id": "flrGI",
      "title": "Lavar os pratos",
      "isDone": false
    },
    {
      "id": "Tw-I9",
      "title": "Cortar a grama",
      "isDone": true
    }
  ]

  const tasksEmpty: Task[] = []

  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render chevron icon with correct color when all tasks is completed", () => {
    renderComponent(tasksWithAllCompleted)

    const chevronIcon = screen.getByTestId("chevron-icon");

    expect(chevronIcon).toHaveClass("text-[#333]");
  });

  it("should render chevron icon with correct color when there are tasks left", () => {
    renderComponent(tasksWithOneIncompleted)

    const chevronIcon = screen.getByTestId("chevron-icon");

    expect(chevronIcon).toHaveClass("text-[#AAA]");
  });

  it("should render chevron icon with correct color when there are no tasks", () => {
    renderComponent(tasksEmpty)

    const chevronIcon = screen.getByTestId("chevron-icon");

    expect(chevronIcon).toHaveClass("text-[#AAA]");
  });

  it("should call onClick prop on click", () => {
    render(<CheckAllButton isActiveStyle={false} onClick={onClickMock} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  })
});
