function acessarCatalogo() {
  return cy.get('a[href*="/products"]').click()
}

function abrirPrimeiroProduto() {
  return cy.get('.features_items .product-image-wrapper')
    .first()
    .find('a[href^="/product_details/"]')
    .click()
}

function pesquisarProduto(termo) {
  cy.get('#search_product').clear().type(termo)
  return cy.get('#submit_search').click()
}

function lerProdutosExibidos() {
  const produtos = []

  return cy.get('.features_items .product-image-wrapper')
    .should('have.length.greaterThan', 0)
    .each((_, indice) => {
      return cy.get('.features_items .product-image-wrapper').eq(indice)
        .find('.productinfo a[data-product-id]')
        .invoke('attr', 'data-product-id')
        .then((id) => {
          return cy.get('.features_items .product-image-wrapper').eq(indice)
            .find('.productinfo p')
            .invoke('text')
            .then((nome) => {
              produtos.push({ id, nome: nome.trim() })
            })
        })
    })
    .then(() => produtos)
}

module.exports = { acessarCatalogo, abrirPrimeiroProduto, pesquisarProduto, lerProdutosExibidos }
