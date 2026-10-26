/// <reference types="cypress" />

const produtos = require('../../modules/produtos')

describe("Produtos", () => {
  it("Verificar todos os produtos e a páginas de detalhes do produto", () => {
    cy.visit('/')
    cy.title().should('eq', 'Automation Exercise')
    cy.get('a[href*=login]').click()

    produtos.acessarCatalogo()
    cy.title().should('eq', 'Automation Exercise - All Products')
    cy.get('.features_items').should('be.visible')

    produtos.abrirPrimeiroProduto()
    cy.title().should('eq', 'Automation Exercise - Product Details')

    cy.get('.product-information').should('be.visible').within(() => {
      cy.get('h2')
        .should('be.visible')
        .invoke('text')
        .should('match', /\S/)

      cy.get('span > span')
        .should('be.visible')
        .invoke('text')
        .should('match', /Rs\.\s*\d+/)

      const campos = ['Category', 'Availability', 'Condition', 'Brand']

      campos.forEach((campo) => {
        cy.contains('p', `${campo}:`)
          .should('be.visible')
          .invoke('text')
          .should((texto) => {
            const valor = texto.split(':').slice(1).join(':').trim()
            expect(valor, `Valor do campo ${campo}`).not.to.be.empty
          })
      })
    })
  })

  it("Pesquisar produto", () => {
    const termo = 'Blue Top'

    cy.visit('/')
    cy.title().should('eq', 'Automation Exercise')
    cy.get('#slider').should('be.visible')

    produtos.acessarCatalogo()
    cy.title().should('eq', 'Automation Exercise - All Products')
    cy.contains('.features_items h2', 'All Products').should('be.visible')

    produtos.lerProdutosExibidos().then((catalogo) => {
      const esperados = catalogo.filter((produto) => (
        produto.nome.toLowerCase().includes(termo.toLowerCase())
      ))
      expect(esperados, 'Produtos relacionados ao nome pesquisado no catálogo').not.to.be.empty

      produtos.pesquisarProduto(termo)
      cy.location('search').should((consulta) => {
        expect(new URLSearchParams(consulta).get('search')).to.eq(termo)
      })
      cy.contains('.features_items h2', 'Searched Products').should('be.visible')
      cy.get('.features_items .product-image-wrapper')
        .should('have.length', esperados.length)

      esperados.forEach((produto) => {
        cy.get(`.features_items .productinfo a[data-product-id="${produto.id}"]`)
          .should('have.length', 1)
          .parent('.productinfo')
          .should('be.visible')
          .find('p')
          .should('be.visible')
          .and('have.text', produto.nome)
      })
    })
  })
})
