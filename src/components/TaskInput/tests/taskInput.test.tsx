import { render, screen } from '@testing-library/react';
import useTodoList from '../../../hooks/useTodoList';
import TaskInput from '../taskInput';

jest.mock('../../../hooks/useTodoList', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('TaskInput Component', () => {
    const mockUseTodoList = useTodoList as jest.MockedFunction<typeof useTodoList>;

    beforeEach(() => {
        const mockState = {
            newTask: '',
            setNewTask: jest.fn(),
            handleKeyDown: jest.fn(),
            handleChange: jest.fn(),
        };
        mockUseTodoList.mockReturnValue(mockState);
    });

    it('renders TaskInput component', () => {
        render(<TaskInput />);
        const inputElement = screen.getByLabelText('Insira uma nova tarefa');
        expect(inputElement).toBeInTheDocument();
    });
    
});
