import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskItem } from ".";
import { XIcon } from "../../assets/icons/xicon";
import { TaskContext } from "../../contexts/TaskContext";
import { Checkbox } from "../CheckBox";
import { DeletedTaskButton } from "./styles";

const mockTaskContextValue = {
  isClearCompleted: jest.fn(),
  tasks: [],
  totalOutstanding: 5,
  handleAddItem: jest.fn(),
  deleteTasks: jest.fn(),
  updatedItemHandler: jest.fn(),
  handleToggleAllDone: jest.fn(),
};

const mockTask = {
  id: "1",
  title: "Test Task",
  isDone: false,
};

describe("Task Item component", () => {
  it("should mark the input box with a check if the checked option is true", () => {
    const handleCheckedMock = jest.fn();

    const wrapper = render(
      <div onClick={handleCheckedMock} data-testid="div-checkbox">
        <Checkbox checked={true} onChange={handleCheckedMock} />
      </div>
    );

    const container = wrapper.getByTestId("div-checkbox");

    userEvent.click(container);

    const checkbox = wrapper.getByRole("checkbox");

    expect(checkbox).toBeChecked();
  });

  it("should activate edit mode when double clicking and summarizing the checkBox Input", () => {
    const wrapper = render(<TaskItem item={mockTask} />);

    const input = wrapper.getByDisplayValue("Test Task");
    const checkbox = wrapper.getByRole("checkbox");

    userEvent.dblClick(input);

    expect(checkbox).not.toBeInTheDocument();
  });

  it("should call onClick function when clicked", () => {
    const wrapper = render(
      <TaskContext.Provider value={mockTaskContextValue}>
        <DeletedTaskButton
          onClick={mockTaskContextValue.deleteTasks}
          data-testid="delete-button"
        >
          <XIcon size={24} />
        </DeletedTaskButton>
      </TaskContext.Provider>
    );

    const deleteButton = wrapper.getByTestId("delete-button");

    userEvent.click(deleteButton);

    expect(mockTaskContextValue.deleteTasks).toHaveBeenCalled();
  });
});
