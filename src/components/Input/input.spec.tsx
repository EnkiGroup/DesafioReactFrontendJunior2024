import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";
import { ChevronIcon } from "../../assets/icons/chevron";
import { TaskContext } from "../../contexts/TaskContext";
import { IconContainer } from "./styles";

const mockTaskContextValue = {
  isClearCompleted: jest.fn(),
  tasks: [],
  totalOutstanding: 5,
  handleAddItem: jest.fn(),
  deleteTasks: jest.fn(),
  updatedItemHandler: jest.fn(),
  handleToggleAllDone: jest.fn(),
};

describe("Input Component", () => {
  it("should render correctly with placeholder", () => {
    render(<Input placeholder="What needs to be done?" />);
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
  });

  it("should call handleAddItem function when form is submitted", () => {
    render(
      <TaskContext.Provider value={mockTaskContextValue}>
        <Input value="trabalhar" placeholder="What needs to be done?" />
      </TaskContext.Provider>
    );

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputElement, { target: { value: "trabalhar" } });

    fireEvent.submit(inputElement);

    expect(mockTaskContextValue.handleAddItem).toHaveBeenCalledWith({
      id: expect.any(String),
      isDone: false,
      title: "trabalhar",
    });
  });

  test("should call handleToggleAllDone function when iconContainer is clicked", () => {
    render(
      <TaskContext.Provider value={mockTaskContextValue}>
        <IconContainer
          data-testid="icon-container"
          onClick={mockTaskContextValue.handleToggleAllDone}
        >
          {<ChevronIcon />}
        </IconContainer>
      </TaskContext.Provider>
    );
    const iconContainer = screen.getByTestId("icon-container");

    fireEvent.click(iconContainer);

    expect(mockTaskContextValue.handleToggleAllDone).toHaveBeenCalled();
  });
});
