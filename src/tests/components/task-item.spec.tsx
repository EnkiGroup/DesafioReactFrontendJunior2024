import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TasksProvider } from "../../contexts/tasks-context";

import { TaskItem } from "../../components/task-item";

const queryClient = new QueryClient()

function renderComponent() {
  const task = {
    "id": "flrGI",
    "title": "Lavar os pratos",
    "isDone": false
  }

  render(
    <QueryClientProvider client={queryClient}>
      <TasksProvider>
        <TaskItem task={task} />
      </TasksProvider>
    </QueryClientProvider>
  )
}

describe("TaskItem", () => {
  it("should start on readable mode", () => {
    renderComponent()

    const readableTaskItem = screen.getByText("Lavar os pratos")
    expect(readableTaskItem).toBeInTheDocument()

    const editableTaskItem = screen.queryByTestId("editable-task-input");
    expect(editableTaskItem).not.toBeInTheDocument()
  })

  it("should switch to editable mode on double click", () => {
    renderComponent()

    const readableTaskItemBefore = screen.getByText("Lavar os pratos")
    expect(readableTaskItemBefore).toBeInTheDocument()

    fireEvent.dblClick(readableTaskItemBefore)

    const readableTaskItemAfter = screen.queryByText("Lavar os pratos")
    expect(readableTaskItemAfter).not.toBeInTheDocument()

    const editableTaskItem = screen.getByTestId("editable-task-input");
    expect(editableTaskItem).toBeInTheDocument()
  })
})