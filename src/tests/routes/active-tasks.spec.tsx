import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useTasksContext } from '../../contexts/tasks-context';

import { ActiveTasks } from '../../routes/active-tasks';

jest.mock('../../contexts/tasks-context', () => ({
  useTasksContext: jest.fn(),
}));

describe("ActiveTasks", () => {
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
    }
  ]
  const mockContextValue = {
    tasks: tasks
  };
  
  (useTasksContext as jest.Mock).mockReturnValue(mockContextValue);

  it("should render only active tasks", () => {
    render(<ActiveTasks />)

    expect(screen.queryByText(tasks[0].title)).toBeInTheDocument()
    expect(screen.queryByText(tasks[1].title)).not.toBeInTheDocument()
  })
})