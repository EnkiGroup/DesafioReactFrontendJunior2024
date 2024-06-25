import { screen, fireEvent } from "@testing-library/react";
import Home from ".";
import useHomePage from "../../hooks/useHomePage";
import { renderWithTheme } from "../../utils/renderWithTheme";
import GlobalProvider from "../../context/GlobalContext";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../hooks/useHomePage", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseHomePage = useHomePage as jest.MockedFunction<typeof useHomePage>;

const mockData = {
  handleSubmit: jest.fn(),
  setValueInput: jest.fn(),
  tasks: [
    { id: "1", title: "Task 1", isDone: false },
    { id: "2", title: "Task 2", isDone: true },
  ],
  valueInput: "",
  enableAllTasks: jest.fn(),
  tasksEnable: true,
  remainingTasks: 2,
  clearEnableTasks: jest.fn(),
  isLoading: false,
};

describe("Home component", () => {
  renderWithTheme(
    <BrowserRouter>
      <GlobalProvider>
        <Home />
      </GlobalProvider>
    </BrowserRouter>,
  );

  it("should render the header, input form, and footer", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <Home />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const todos = screen.getByText("todos");
    const placeholder = screen.getByPlaceholderText("What needs to be done?");
    const task1 = screen.getByText("Task 1");
    const task2 = screen.getByText("Task 1");
    const items = screen.getByText("2 items left!");

    expect(todos).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();
    expect(items).toBeInTheDocument();
  });

  it("should display loading component when isLoading is true", () => {
    mockUseHomePage.mockReturnValueOnce({ ...mockData, isLoading: true });

    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <Home />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const loading = screen.getByText("Loading...");

    expect(loading).toBeInTheDocument();
  });

  it("should call handleSubmit when the input form is submitted", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <Home />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const placeholder = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.submit(placeholder);

    expect(mockData.handleSubmit).toHaveBeenCalled();
  });

  it("should call setValueInput when the input value changes", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <Home />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const placeholder = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.change(placeholder, {
      target: { value: "New Task" },
    });

    expect(mockData.setValueInput).toHaveBeenCalledWith("New Task");
  });

  it("should call enableAllTasks when the icon is clicked", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <Home />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const button = screen.getByRole("button", { name: /icon/i });

    fireEvent.click(button);

    expect(mockData.enableAllTasks).toHaveBeenCalled();
  });

  it("should call clearEnableTasks when filter clear completed is clicked", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <Home />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const textValue = screen.getByText("Clear completed");

    fireEvent.click(textValue);

    expect(mockData.clearEnableTasks).toHaveBeenCalled();
  });
});
