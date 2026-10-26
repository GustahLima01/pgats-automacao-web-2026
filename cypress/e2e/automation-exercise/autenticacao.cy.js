/// <reference types="cypress" />

const autenticacao = require('../../modules/autenticacao')
const { criarUsuarioExistente } = require('../../factories/usuario')

describe("Autenticação", () => {
  it("Efetuar Login de Usuário com email e senha corretos", () => {
    const usuario = criarUsuarioExistente()

    cy.visit('/login')
    autenticacao.efetuarLogin(usuario.email, usuario.senha)

    cy.contains('.navbar-nav li', usuario.nome)
    cy.get('.navbar-nav li')
      .contains(usuario.nome)
      .should('be.visible')
  })

  it("Efetuar Login de Usuário email e senha INCORRETOS", () => {
    const usuario = criarUsuarioExistente({ senha: '54321' })

    cy.visit('/login')
    autenticacao.efetuarLogin(usuario.email, usuario.senha)

    cy.get('form[action*="login"] > p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Your email or password is incorrect!')
      .and('contain.text', 'Your email or password is incorrect!')
  })

  it("Efetuar Logout", () => {
    const usuario = criarUsuarioExistente()

    cy.visit('/login')
    autenticacao.efetuarLogin(usuario.email, usuario.senha)
    autenticacao.efetuarLogout()

    cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="logout"]').should('not.exist')
    cy.get('[action*="login"]').should('be.visible')
    cy.url().should('include', 'login')
  })
})
