import fetchMock from 'jest-fetch-mock';
import { TODO_URL, fetchTodos } from '../api';

describe('fetchTodos function', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('fetches todos from the correct URL', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ todos: ['todo1', 'todo2'] }));

        const todos = await fetchTodos();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(TODO_URL);

        expect(todos).toEqual({ todos: ['todo1', 'todo2'] });
    });

    it('throws an error when response is not ok', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

        await expect(fetchTodos()).rejects.toThrow('Erro ao buscar os todos');

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(TODO_URL);
    });
});
