/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro')
const { criarUsuario, criarUsuarioExistente } = require('../../factories/usuario')

describe("Cadastro", () => {
  it("Cadastrar um novo usuário com sucesso", () => {
    const usuario = criarUsuario()

    cy.visit('/')
    cy.title().should('eq', 'Automation Exercise')
    cy.get('a[href*=login]').click()
    cy.contains('New User Signup!').should('be.visible')

    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.preencherCadastro(usuario)
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
  })

  it("Tentar cadastrar usuário com e-mail já cadastrado", () => {
    const usuario = criarUsuarioExistente()

    cy.visit('/')
    cy.get('a[href*=login]').click()

    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()
  })
})
