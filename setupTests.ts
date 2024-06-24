// Execute o servidor de mock antes de todos os testes
beforeAll(() => server.listen());

// Redefina os handlers do servidor após cada teste
afterEach(() => server.resetHandlers());

// Feche o servidor de mock após todos os testes
afterAll(() => server.close());
