function criarPagamento(sobrescritas = {}) {
  return {
    nomeNoCartao: 'PGATS Aut',
    numero: '4242424242424242',
    cvc: '123',
    mesValidade: '12',
    anoValidade: String(new Date().getFullYear() + 3),
    ...sobrescritas,
  }
}

module.exports = { criarPagamento }
