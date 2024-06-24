import { act, render, screen } from "@testing-library/react";
import { fetchTodos } from "../../utils/api";
import { TodoProvider, useTodoContext } from "../todoContext";

jest.mock('../../utils/api', () => ({
    fetchTodos: jest.fn(),
}));

const mockedFetchTodos = fetchTodos as jest.MockedFunction<typeof fetchTodos>;

const MockApp: React.FC = () => {
    const { addTask, removeTask, updateTaskTitle, toggleTaskStatus } = useTodoContext();

    return (
        <div>
            <button onClick={() => addTask('Task 1')}>Add Task</button>
            <button onClick={() => removeTask('1')}>Remove Task</button>
            <button onClick={() => updateTaskTitle('1', 'New Title')}>Update Task</button>
            <button onClick={() => toggleTaskStatus('1')}>Toggle Status</button>
        </div>
    );
};

describe('TodoProvider', () => {

    beforeEach(() => {
        mockedFetchTodos.mockClear();
    });

    it('renders children and initializes with empty todoList', async () => {

        mockedFetchTodos.mockResolvedValue([]);
        render(
            <TodoProvider>
                <MockApp />
            </TodoProvider>
        );
        
        expect(screen.getByText('Add Task')).toBeInTheDocument();
        expect(screen.getByText('Remove Task')).toBeInTheDocument();
        expect(screen.getByText('Update Task')).toBeInTheDocument();
        expect(screen.getByText('Toggle Status')).toBeInTheDocument();

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        expect(mockedFetchTodos).toHaveBeenCalledTimes(1);
    });
})