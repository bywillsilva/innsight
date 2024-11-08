const { getAcomodacoes, getDetails } = require('../controllers/Acomodacoes_Controller');
const db = require('../config/db'); // Certifique-se de que o caminho está correto

// Mock da resposta para facilitar o teste
const mockResponse = () => {
  const res = {};
  res.render = jest.fn().mockReturnValue(res); // Mocka a função render
  res.status = jest.fn().mockReturnValue(res); // Mocka a função status
  res.send = jest.fn().mockReturnValue(res); // Mocka a função send
  return res;
};

// Mock da requisição com parâmetros
const mockRequest = (params = {}) => {
  return { params };
};

// Mocka a conexão com o banco de dados
jest.mock('../config/db'); 

// Simula o db com mock
const dbMock = {
  promise: jest.fn().mockReturnValue({
    query: jest.fn(),
  }),
};

db.promise = dbMock.promise; // Redefine o método promise para o mock

describe('Testando controladores', () => {
  
  test('deve buscar todas as acomodações', async () => {
    // Simula o resultado da consulta
    const fakeResults = [{ id: 1, nome: 'Acomodação 1' }, { id: 2, nome: 'Acomodação 2' }];
    dbMock.promise().query.mockResolvedValue([fakeResults]); // Mocka a consulta ao banco de dados

    const req = {}; // A requisição pode ser vazia para esse caso
    const res = mockResponse(); // Mocka a resposta

    await getAcomodacoes(req, res); // Chama a função do controlador

    expect(res.render).toHaveBeenCalledWith('index', { acomodacoes: fakeResults }); // Verifica se render foi chamado com os resultados esperados
  });

  test('deve buscar detalhes de uma propriedade', async () => {
    // Simula o resultado da consulta
    const fakeResults = [{ id: 1, nome: 'Acomodação 1', descricao: 'Descrição' }];
    dbMock.promise().query.mockResolvedValue([fakeResults]); // Mocka a consulta ao banco de dados

    const req = mockRequest({ id: '1' }); // Mocka os parâmetros da requisição
    const res = mockResponse(); // Mocka a resposta

    await getDetails(req, res); // Chama a função do controlador

    expect(res.render).toHaveBeenCalledWith('acomodos', { propriedade: fakeResults }); // Verifica se render foi chamado com os detalhes
  });

  test('deve retornar erro se falhar na consulta de acomodações', async () => {
    dbMock.promise().query.mockRejectedValue(new Error('Erro ao consultar banco')); // Simula um erro no banco de dados

    const req = {};
    const res = mockResponse();

    await getAcomodacoes(req, res);

    expect(res.status).toHaveBeenCalledWith(500); // Verifica se o status 500 foi chamado em caso de erro
    expect(res.send).toHaveBeenCalledWith('Erro ao buscar dados'); // Verifica se a mensagem de erro foi retornada
  });

  test('deve retornar erro se falhar ao buscar detalhes', async () => {
    dbMock.promise().query.mockRejectedValue(new Error('Erro ao consultar banco'));

    const req = mockRequest({ id: '1' });
    const res = mockResponse();

    await getDetails(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Erro ao buscar dados');
  });
});
