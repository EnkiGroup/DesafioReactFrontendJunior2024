import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskItem } from '../../components/task-item';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TasksProvider } from '../../contexts/tasks-context';

const queryClient = new QueryClient()

function TestEnvironment() {
  const task = {
    "id": "flrGI",
    "title": "Lavar os pratos",
    "isDone": false
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TasksProvider>
      <TaskItem task={task} />
      </TasksProvider>
    </QueryClientProvider>
  )
}

describe("TaskItem", () => {
  it("should initially render ReadableTaskItem component by default", () => {
    render(<TestEnvironment />)

    const readableTaskItem = screen.getByText("Lavar os pratos")
    expect(readableTaskItem).toBeInTheDocument()
  })

  it("should render EditableTaskItem component on double click", () => {
    render(<TestEnvironment />)

    const readableTaskItemBefore = screen.getByText("Lavar os pratos")
    expect(readableTaskItemBefore).toBeInTheDocument()

    fireEvent.dblClick(readableTaskItemBefore)

    const readableTaskItemAfter = screen.queryByText("Lavar os pratos")
    expect(readableTaskItemAfter).not.toBeInTheDocument()

    const editableTaskItem = screen.getByTestId("editable-task-input");
    expect(editableTaskItem).toBeInTheDocument()
  })
})