const { criarUsuario } = require('../../factories/usuario')

function iniciarCadastro(nome, email) {
  cy.get('[data-qa="signup-name"]').type(nome)
  cy.get('[data-qa="signup-email"]').type(email)

  return cy.get('[data-qa="signup-button"]').click()
}

function preencherCadastro(usuario = criarUsuario()) {
  cy.get('#id_gender2').check()
  cy.get('[data-qa="password"]').type(usuario.senha)

  cy.get('[data-qa="days"]').select(usuario.diaNascimento)
  cy.get('[data-qa="months"]').select(usuario.mesNascimento)
  cy.get('[data-qa="years"]').select(usuario.anoNascimento)

  cy.get('#newsletter').check()
  cy.get('#optin').check()
  cy.get('[data-qa="first_name"]').type(usuario.primeiroNome)
  cy.get('[data-qa="last_name"]').type(usuario.sobrenome)
  cy.get('[data-qa="company"]').type(usuario.empresa)
  cy.get('[data-qa="address"]').type(usuario.endereco)
  if (usuario.endereco2) {
    cy.get('[data-qa="address2"]').type(usuario.endereco2)
  }

  cy.get('[data-qa="country"]').select(usuario.pais)
  cy.get('[data-qa="state"]').type(usuario.estado)
  cy.get('[data-qa="city"]').type(usuario.cidade)
  cy.get('[data-qa="zipcode"]').type(usuario.cep)
  cy.get('[data-qa="mobile_number"]').type(usuario.telefone)

  cy.get('[data-qa="create-account"]').click()
  return cy.contains('Account Created!').should('be.visible')
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
  return cy.get('[data-qa="account-created"]')
    .should('be.visible')
    .and('contain', 'Account Created!')
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
  return cy.get('form[action*=signup] p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Email Address already exist!')
    .and('contain.text', 'Email Address already exist!')
}

function continuar() {
  return cy.get('[data-qa="continue-button"]').click()
}

function cadastrarUsuario(usuario) {
  cy.contains('.signup-form h2', 'New User Signup!').should('be.visible')
  iniciarCadastro(usuario.nome, usuario.email)
  cy.contains('h2', 'Enter Account Information', { matchCase: false }).should('be.visible')
  preencherCadastro(usuario)
  return verificarSeCadastroFoiEfetuadoComSucesso()
}

function excluirConta() {
  cy.get('.shop-menu a[href="/delete_account"]').click()
  cy.get('[data-qa="account-deleted"]')
    .should('be.visible')
    .and('contain.text', 'Account Deleted!')
  continuar()
  return cy.location('pathname').should('eq', '/')
}

module.exports = {
  iniciarCadastro,
  preencherCadastro,
  verificarSeCadastroFoiEfetuadoComSucesso,
  verificarSeMensagemDeCadastroExistenteFoiExibida,
  continuar,
  excluirConta,
  cadastrarUsuario,
}
