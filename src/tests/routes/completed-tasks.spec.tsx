import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useTasksContext } from '../../contexts/tasks-context';

import { CompletedTasks } from '../../routes/completed-tasks';

jest.mock('../../contexts/tasks-context', () => ({
  useTasksContext: jest.fn(),
}));

const tasks = [
  {
    "id": "flrGI",
    "title": "Lavar os pratos",
    "isDone": false
  },
  {
    "id": "Tw-I9",
    "title": "Cortar a grama",
    "isDone": true
  },
  {
    "id": "7f2sf",
    "title": "Comprar pão",
    "isDone": false
  }
]
const mockContextValue = {
  tasks: tasks
};

(useTasksContext as jest.Mock).mockReturnValue(mockContextValue);

describe("CompletedTasks", () => {
  it("should render only completed tasks", () => {
    render(<CompletedTasks />)

    expect(screen.queryByText(tasks[0].title)).not.toBeInTheDocument()
    expect(screen.queryByText(tasks[1].title)).toBeInTheDocument()
    expect(screen.queryByText(tasks[2].title)).not.toBeInTheDocument()
  })
})