import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useTasksContext } from '../../contexts/tasks-context';

import { MemoryRouter } from 'react-router-dom';

import { TasksFooter } from '../../components/tasks-footer';

jest.mock('../../contexts/tasks-context', () => ({
  useTasksContext: jest.fn(),
}));

describe("TasksFooter", () => {
  const mockClearCompletedTasks = jest.fn();
  const mockContextValue = {
    isTasksListEmpty: false,
    tasksLeft: 3,
    clearCompletedTasks: mockClearCompletedTasks,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useTasksContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  it("should render itens left correctly", () => {
    render(
      <MemoryRouter>
        <TasksFooter />
      </MemoryRouter>
    );

    const itensLeft = screen.getByText("3 itens left");
    expect(itensLeft).toBeInTheDocument();
  })

  it('should render filter buttons correctly', () => {
    render(
      <MemoryRouter>
        <TasksFooter />
      </MemoryRouter>
    );

    const allButton = screen.getByText('All');
    const activeButton = screen.getByText('Active');
    const completedButton = screen.getByText('Completed');

    expect(allButton).toBeInTheDocument();
    expect(activeButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
  });

  it('should render clear completed button correctly', () => {
    render(
      <MemoryRouter>
        <TasksFooter />
      </MemoryRouter>
    );

    const clearButton = screen.getByText('Clear completed');
    expect(clearButton).toBeInTheDocument();
  });

  it('should call clearCompletedTasks when "Clear completed" button is clicked', () => {
    render(
      <MemoryRouter>
        <TasksFooter />
      </MemoryRouter>
    );

    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);

    expect(mockClearCompletedTasks).toHaveBeenCalledTimes(1);
  });

  it('should not render footer when isTasksListEmpty is true', () => {
    (useTasksContext as jest.Mock).mockReturnValueOnce({
      isTasksListEmpty: true,
      tasksLeft: 0,
      clearCompletedTasks: mockClearCompletedTasks,
    });

    render(
      <MemoryRouter>
        <TasksFooter />
      </MemoryRouter>
    );

    const footerElement = screen.queryByRole('footer');
    expect(footerElement).not.toBeInTheDocument();
  });
})
