import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from ".";
import { TaskContext } from "../../contexts/TaskContext";
import { SummaryTasks } from "./styles";

const mockTaskContextValue = {
  isClearCompleted: jest.fn(),
  tasks: [],
  totalOutstanding: 5,
  handleAddItem: jest.fn(),
  deleteTasks: jest.fn(),
  updatedItemHandler: jest.fn(),
  handleToggleAllDone: jest.fn(),
};

describe("Footer component", () => {
  it("should render footer component correctly", () => {
    const wrapper = render(
      <TaskContext.Provider value={mockTaskContextValue}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </TaskContext.Provider>
    );

    expect(wrapper.getByTestId("filters")).toBeInTheDocument();
    expect(wrapper.getByTestId("summary")).toBeInTheDocument();
    expect(wrapper.getByText("Clear completed")).toBeInTheDocument();
  });

  it("should called isClearCompleted when Clear completed button is clicked", () => {
    const wrapper = render(
      <TaskContext.Provider value={mockTaskContextValue}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </TaskContext.Provider>
    );

    const clearCompletedButton = wrapper.getByRole("button", {
      name: "Clear completed",
    });

    fireEvent.click(clearCompletedButton);

    expect(mockTaskContextValue.isClearCompleted).toHaveBeenCalled();
  });

  it("should render correct message for single item", () => {
    const totalOutstanding = 1;

    const wrapper = render(
      <TaskContext.Provider value={mockTaskContextValue}>
        <MemoryRouter>
          <SummaryTasks data-testid="summary">
            <span>
              {totalOutstanding > 1
                ? `${totalOutstanding} items left!`
                : `${totalOutstanding} item left!`}
            </span>
          </SummaryTasks>
        </MemoryRouter>
      </TaskContext.Provider>
    );

    const total = wrapper.container.querySelector("span");

    expect(total?.textContent).toBe("1 item left!");
  });

  it("should render correct message for multiple items", () => {
    const totalOutstanding = 5;

    const wrapper = render(
      <TaskContext.Provider value={mockTaskContextValue}>
        <MemoryRouter>
          <SummaryTasks data-testid="summary">
            <span>
              {totalOutstanding > 1
                ? `${totalOutstanding} items left!`
                : `${totalOutstanding} item left!`}
            </span>
          </SummaryTasks>
        </MemoryRouter>
      </TaskContext.Provider>
    );

    const total = wrapper.container.querySelector("span");

    expect(total?.textContent).toBe("5 items left!");
  });
});
