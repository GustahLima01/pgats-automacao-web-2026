function criarUsuario(sobrescritas = {}) {
  return {
    nome: 'PGATS Aut',
    email: `pgats-aut-test-${Date.now()}-${Math.random().toString(36).slice(2, 10)}@mail.com`,
    senha: '12345',
    diaNascimento: '1',
    mesNascimento: 'September',
    anoNascimento: '1990',
    primeiroNome: 'PGATS',
    sobrenome: 'Aut',
    empresa: 'PGATS',
    endereco: 'Example Address',
    endereco2: '',
    pais: 'United States',
    estado: 'California',
    cidade: 'San Francisco',
    cep: '12345',
    telefone: '999999999',
    ...sobrescritas,
  }
}

function criarUsuarioExistente(sobrescritas = {}) {
  return {
    nome: 'PGATS Aut',
    email: Cypress.env('TEST_USER_EMAIL'),
    senha: Cypress.env('TEST_USER_PASSWORD'),
    ...sobrescritas,
  }
}

module.exports = { criarUsuario, criarUsuarioExistente }
