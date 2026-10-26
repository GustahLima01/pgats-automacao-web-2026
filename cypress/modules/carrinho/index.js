function adicionarProduto(id) {
  cy.get(`.features_items .productinfo a[data-product-id="${id}"]`).click()
  cy.get('#cartModal').should('be.visible')
  cy.get('#cartModal .close-modal').click()
  return cy.get('#cartModal').should('not.be.visible')
}

function abrir() {
  return cy.get('.shop-menu a[href="/view_cart"]').click()
}

function prosseguirParaCheckout() {
  return cy.contains('a.check_out', 'Proceed To Checkout').click()
}

function verificarProduto(produto) {
  cy.location('pathname').should('eq', '/view_cart')
  cy.get('#cart_info_table').should('be.visible')
  cy.get(`#product-${produto.id} .cart_description`).should('contain.text', produto.nome)
  return cy.get(`#product-${produto.id} .cart_quantity`)
    .should('contain.text', String(produto.quantidade))
}

module.exports = { adicionarProduto, abrir, prosseguirParaCheckout, verificarProduto }
