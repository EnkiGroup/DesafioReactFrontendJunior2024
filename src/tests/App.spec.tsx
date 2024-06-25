import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TasksProvider } from '../contexts/tasks-context';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from '../App';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AllTasks } from '../routes/all-tasks';
import { ActiveTasks } from '../routes/active-tasks';
import { CompletedTasks } from '../routes/completed-tasks';

const queryClient = new QueryClient()

function renderComponent() {
  render(
    <QueryClientProvider client={queryClient}>
      <TasksProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<AllTasks />} />
              <Route path="active" element={<ActiveTasks />} />
              <Route path="completed" element={<CompletedTasks />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </TasksProvider>
    </QueryClientProvider>
  )
}

async function addTask() {
  const input = screen.getByTestId("task-input");

  await act(async () => {
    fireEvent.change(input, { target: { value: "Lavar a louça" } });
    fireEvent.submit(input);
  });
}

async function addThreeTasks() {
  const input = screen.getByTestId("task-input");

  await act(async () => {
    fireEvent.change(input, { target: { value: "Lavar a louça" } });
    fireEvent.submit(input);
  });
  await act(async () => {
    fireEvent.change(input, { target: { value: "Lavar o quintal" } });
    fireEvent.submit(input);
  });
  await act(async () => {
    fireEvent.change(input, { target: { value: "Lavar o carro" } });
    fireEvent.submit(input);
  });
}

describe("App", () => {

  it("should add a task correctly", async () => {
    renderComponent()

    await addTask()

    const task = screen.getByText("Lavar a louça")
    expect(task).toBeInTheDocument()
  })

  it("should add and update a task correctly", async () => {
    renderComponent()

    await addTask()

    const task = screen.getByText("Lavar a louça")
    expect(task).toBeInTheDocument()

    fireEvent.dblClick(task)

    const editInput = screen.getByTestId("editable-task-input")
    expect(editInput).toBeInTheDocument()

    await act(async () => {
      fireEvent.change(editInput, { target: { value: "Lavar o quintal" } });
      fireEvent.submit(editInput);
    });

    expect(task).not.toBeInTheDocument()

    const updatedTask = screen.getByText("Lavar o quintal")
    expect(updatedTask).toBeInTheDocument()
  })

  it("should add a task and mark as done correctly", async () => {
    renderComponent()

    await addTask()

    const task = screen.getByText("Lavar a louça")
    expect(task).toBeInTheDocument()

    const checkButton = screen.getByRole("checkbox")
    fireEvent.click(checkButton)

    expect(checkButton).toBeChecked()

    const checkIcon = screen.getByTestId("check-icon")
    expect(checkIcon).toBeInTheDocument()
  })

  it("should add a task, mark as done and unmark as done  correctly", async () => {
    renderComponent()

    await addTask()

    const task = screen.getByText("Lavar a louça")
    expect(task).toBeInTheDocument()

    const checkButton = screen.getByRole("checkbox")
    fireEvent.click(checkButton)

    expect(checkButton).toBeChecked()

    const checkIcon = screen.getByTestId("check-icon")
    expect(checkIcon).toBeInTheDocument()

    fireEvent.click(checkButton)

    expect(checkButton).not.toBeChecked()
    expect(checkIcon).not.toBeInTheDocument()
  })

  it("should add and remove a task correctly", async () => {
    renderComponent()

    await addTask()

    const task = screen.getByText("Lavar a louça")
    expect(task).toBeInTheDocument()

    const removeButton = screen.getByTestId("remove-button")
    fireEvent.click(removeButton)

    expect(task).not.toBeInTheDocument()
  })

  it("should add three task, and when the checkAllButton clicked, all the tasks needs to be done", async () => {
    renderComponent()

    await addThreeTasks()

    const checkButtons = screen.getAllByRole("checkbox")

    expect(checkButtons).toHaveLength(3)
    checkButtons.forEach(checkButton => {
      expect(checkButton).not.toBeChecked()
    })

    const checkAllButton = screen.getByTestId("check-all-button")

    fireEvent.click(checkAllButton)

    checkButtons.forEach(checkButton => {
      expect(checkButton).toBeChecked()
    })
  })

  it("should add three completed task, and when the clear completed clicked, all the tasks needs to be removed", async () => {
    renderComponent()

    await addThreeTasks()

    const checkButtons = screen.getAllByRole("checkbox")

    expect(checkButtons).toHaveLength(3)
    checkButtons.forEach(checkButton => {
      expect(checkButton).not.toBeChecked()
    })

    const checkAllButton = screen.getByTestId("check-all-button")

    fireEvent.click(checkAllButton)

    checkButtons.forEach(checkButton => {
      expect(checkButton).toBeChecked()
    })

    const clearCompletedButton = screen.getByText("Clear completed")
    expect(clearCompletedButton).toBeInTheDocument()

    fireEvent.click(clearCompletedButton)

    const tasks = screen.queryAllByTestId("task")
    expect(tasks).toHaveLength(0)
  })

  it("should add a task, switch to active filter and this task should render correctly", async () => {
    renderComponent()

    await addTask()

    const activeFilterButton = screen.getByText("Active")

    fireEvent.click(activeFilterButton)

    const task = screen.getByText("Lavar a louça")
    expect(task).toBeInTheDocument()
  })
  
  it("should add a task, switch to the active filter and when mark the task as done, it cannot be visible in the active filter", async () => {
    renderComponent()

    await addTask()

    const activeFilterButton = screen.getByText("Active")

    fireEvent.click(activeFilterButton)

    const task = screen.getByText("Lavar a louça")
    expect(task).toBeInTheDocument()

    const checkButton = screen.getByRole("checkbox")
    fireEvent.click(checkButton)

    expect(task).not.toBeInTheDocument()
  })

  it("should add a completed task, switch to completed filter and this task should render correctly", async () => {
    renderComponent()

    await addTask()

    const checkButton = screen.getByRole("checkbox")
    fireEvent.click(checkButton)

    const completedFilterButton = screen.getByText("Completed")

    fireEvent.click(completedFilterButton)

    const task = screen.getByText("Lavar a louça")
    expect(task).toBeInTheDocument()
  })

  it("should add a completed task, switch to the completed filter and when unmark the task as done, it cannot be visible in the completed filter", async () => {
    renderComponent()

    await addTask()

    const checkButtonBefore = screen.getByRole("checkbox")
    fireEvent.click(checkButtonBefore)

    const completedFilterButton = screen.getByText("Completed")

    fireEvent.click(completedFilterButton)

    const task = screen.getByText("Lavar a louça")
    expect(task).toBeInTheDocument()

    const checkButtonAfter = screen.getByRole("checkbox")
    fireEvent.click(checkButtonAfter)

    expect(task).not.toBeInTheDocument()
  })

  it("should add a task, and itens left must show one and when mark as done, itens left must show zero", async () => {
    renderComponent()

    await addTask()

    const itensLeftBefore = screen.getByText("1 itens left")
    expect(itensLeftBefore).toBeInTheDocument()

    const checkButton = screen.getByRole("checkbox")
    fireEvent.click(checkButton)

    const itensLeftAfter = screen.getByText("0 itens left")
    expect(itensLeftAfter).toBeInTheDocument()
  })
})