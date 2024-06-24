import { useQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-hooks';
import useFetchTodos from '../useFetchTodos';


jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

jest.mock("../../utils/api", () => ({
    fetchTodos: jest.fn()
}));

describe('useFetchTodos hooks', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return loading state initially', () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: undefined,
            error: null,
            isLoading: true,
        });

        const { result } = renderHook(() => useFetchTodos());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.todoFetch).toBeUndefined();
        expect(result.current.error).toBeNull();
    });

    it('should return data when the query succeeds', () => {
        const mockTodos = [{ id: 1, text: 'Test Todo' }];

        (useQuery as jest.Mock).mockReturnValue({
            data: mockTodos,
            error: null,
            isLoading: false,
        });

        const { result } = renderHook(() => useFetchTodos());

        expect(result.current.isLoading).toBe(false);
        expect(result.current.todoFetch).toEqual(mockTodos);
        expect(result.current.error).toBeNull();
    });

    it('should return error when the query fails', () => {
        const mockError = new Error('Failed to fetch todos');

        (useQuery as jest.Mock).mockReturnValue({
            data: undefined,
            error: mockError,
            isLoading: false,
        });

        const { result } = renderHook(() => useFetchTodos());

        expect(result.current.isLoading).toBe(false);
        expect(result.current.todoFetch).toBeUndefined();
        expect(result.current.error).toEqual(mockError);
    });


})