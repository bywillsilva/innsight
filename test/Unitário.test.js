const { getAcomodacoes } = require('./accomodacoes');
const db = require('./../config/db');

jest.mock('./../config/db');
const mockQuery = jest.fn();
db.promise.mockReturnValue({ query: mockQuery });

test('getAcomodacoes deve chamar res.render com os dados da consulta', async () => {
  // Mock dos dados retornados pela consulta SQL, com base na estrutura da tabela Acomodacoes
  const mockData = [
    {
      id: 1,
      nome: 'Casa em Manaus',
      endereco: 'Manaus, AM',
      descricao: 'Casa simples com área externa e churrasqueira',
      preco: 220.00,
      quartos: 3,
      banheiro: 2,
      piscina: 'Sim',
      data_cadastro: '2024-11-11 10:00:00'
    },
    {
      id: 2,
      nome: 'Chalé no Acre',
      endereco: 'Rio Branco, AC',
      descricao: 'Chalé aconchegante com vista para a floresta',
      preco: 180.00,
      quartos: 2,

      banheiro: 1,
      piscina: 'Sim',
      data_cadastro: '2024-11-11 10:00:00'
    }
  ];


  mockQuery.mockResolvedValue([mockData]);

  const res = { render: jest.fn() };

  await getAcomodacoes({}, res);

  expect(res.render).toHaveBeenCalledWith('index', { acomodacoes: mockData });
});