/// <reference types="cypress" />

const inscricao = require('../../modules/inscricao')
const { criarUsuario } = require('../../factories/usuario')

describe("Inscrição", () => {
  it("Verificar inscrição na página inicial", () => {
    const usuario = criarUsuario()

    cy.visit('/')
    cy.title().should('eq', 'Automation Exercise')
    cy.get('#slider').should('be.visible')

    inscricao.acessarRodape()
    cy.contains('#footer h2', 'Subscription').should('be.visible')
    inscricao.inscreverEmail(usuario.email)

    cy.get('#success-subscribe')
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!')
  })
})
