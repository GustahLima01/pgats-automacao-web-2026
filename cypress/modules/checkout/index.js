function informarComentario(comentario) {
  cy.get('textarea[name="message"]').type(comentario)
  return cy.get('a[href="/payment"]').click()
}

function preencherPagamento(pagamento) {
  cy.get('[data-qa="name-on-card"]').type(pagamento.nomeNoCartao)
  cy.get('[data-qa="card-number"]').type(pagamento.numero)
  cy.get('[data-qa="cvc"]').type(pagamento.cvc)
  cy.get('[data-qa="expiry-month"]').type(pagamento.mesValidade)
  return cy.get('[data-qa="expiry-year"]').type(pagamento.anoValidade)
}

function confirmarPagamento() {
  cy.get('#payment-form').then(($formulario) => {
    const mensagemConfirmada = cy.spy().as('mensagemPedidoConfirmado')

    return cy.get('#success_message').then(($mensagem) => {
      $formulario[0].addEventListener('submit', () => {
        mensagemConfirmada($mensagem.is(':visible'), $mensagem.text().trim())
      }, { once: true })
    })
  })

  return cy.get('[data-qa="pay-button"]').click()
}

function verificarResumoDoPedido(usuario, produto) {
  cy.location('pathname').should('eq', '/checkout')
  cy.contains('h2', 'Address Details').should('be.visible')

  const enderecos = ['#address_delivery', '#address_invoice']
  enderecos.forEach((seletor) => {
    cy.get(seletor).should('be.visible')
      .and('contain.text', `${usuario.primeiroNome} ${usuario.sobrenome}`)
      .and('contain.text', usuario.empresa)
      .and('contain.text', usuario.endereco)
      .and('contain.text', usuario.endereco2)
      .and('contain.text', usuario.cidade)
      .and('contain.text', usuario.estado)
      .and('contain.text', usuario.cep)
      .and('contain.text', usuario.pais)
      .and('contain.text', usuario.telefone)
  })

  cy.contains('h2', 'Review Your Order').should('be.visible')
  cy.get(`#cart_info #product-${produto.id} .cart_description`).should('contain.text', produto.nome)
  cy.get(`#cart_info #product-${produto.id} .cart_quantity`).should('contain.text', String(produto.quantidade))
  return cy.get(`#cart_info #product-${produto.id} .cart_total_price`).should('have.text', produto.total)
}

function verificarPedidoConfirmado() {
  cy.get('@mensagemPedidoConfirmado').should(
    'have.been.calledOnceWithExactly', true, 'Your order has been placed successfully!'
  )
  cy.location('pathname').should('match', /^\/payment_done\/\d+$/)
  cy.get('[data-qa="order-placed"]').should('be.visible').and('contain.text', 'Order Placed!')
  return cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')
}

function pagarPedido(pagamento, comentario) {
  informarComentario(comentario)
  cy.location('pathname').should('eq', '/payment')
  preencherPagamento(pagamento)
  confirmarPagamento()
  return verificarPedidoConfirmado()
}

module.exports = {
  informarComentario,
  preencherPagamento,
  confirmarPagamento,
  verificarResumoDoPedido,
  verificarPedidoConfirmado,
  pagarPedido,
}
