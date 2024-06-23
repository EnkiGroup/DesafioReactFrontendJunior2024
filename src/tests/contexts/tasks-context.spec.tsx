import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TasksProvider, useTasksContext } from '../../contexts/tasks-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Componente consumidor para testes
const TestComponent = () => {
  const { tasks, addTask, toggleTaskCheck, tasksLeft, toggleAllTasksCheck } = useTasksContext();

  return (
    <div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} data-testid="task-item">
            {task.title}
            <input type="checkbox" checked={task.isDone} onChange={() => toggleTaskCheck(task.id)} />
          </li>
        ))}
      </ul>
      <button onClick={() => addTask('Test Task')} data-testid="add-task">Add Task</button>
      <button onClick={() => toggleAllTasksCheck()} data-testid="toggle-all-tasks">Toggle All Tasks</button>
      <div data-testid="tasks-left">{tasksLeft}</div>
    </div>
  );
};


const queryClient = new QueryClient()

function TestEnvironment() {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksProvider>
        <TestComponent/>
      </TasksProvider>
    </QueryClientProvider>
  )
}

describe('TasksContext', () => {
  it('should add a task', () => {
    render(<TestEnvironment />);

    fireEvent.click(screen.getByTestId('add-task'));

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('should toggle task check', () => {
    render(<TestEnvironment />);

    fireEvent.click(screen.getByTestId('add-task'));

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should toggle all tasks check', () => {
    render(<TestEnvironment />);

    fireEvent.click(screen.getByTestId('add-task'));

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(screen.getByTestId('toggle-all-tasks'));
    expect(checkbox).toBeChecked();
  });

  it('should update tasks left count', () => {
    render(<TestEnvironment />);

    fireEvent.click(screen.getByTestId('add-task'));

    const tasksLeft = screen.getByTestId('tasks-left');
    expect(tasksLeft).toHaveTextContent('1');

    fireEvent.click(screen.getByRole('checkbox'));
    expect(tasksLeft).toHaveTextContent('0');
  });
});
