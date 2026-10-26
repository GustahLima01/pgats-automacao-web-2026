/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro')
const autenticacao = require('../../modules/autenticacao')
const carrinho = require('../../modules/carrinho')
const checkout = require('../../modules/checkout')
const { criarUsuario } = require('../../factories/usuario')
const { criarPagamento } = require('../../factories/pagamento')

describe('Pedidos', () => {
  const produto = { id: 1, nome: 'Blue Top', quantidade: 1, total: 'Rs. 500' }
  const comentario = 'Pedido de teste automatizado PGATS'
  let usuario
  let pagamento
  let contaCriada

  beforeEach(() => {
    usuario = criarUsuario({ endereco2: 'Apartment 101' })
    pagamento = criarPagamento()
    contaCriada = false
  })

  afterEach(() => {
    if (!contaCriada) return

    autenticacao.garantirUsuarioLogado(usuario)
    cadastro.excluirConta()
  })

  it('Realizar pedido: cadastrar antes do checkout', () => {
    cy.visit('/')
    cy.title().should('eq', 'Automation Exercise')
    cy.get('#slider').should('be.visible')

    autenticacao.acessarLogin()
    cadastro.cadastrarUsuario(usuario).then(() => { contaCriada = true })
    cadastro.continuar()

    autenticacao.verificarUsuarioLogado(usuario)
    carrinho.adicionarProduto(produto.id)
    carrinho.abrir()
    carrinho.verificarProduto(produto)
    carrinho.prosseguirParaCheckout()
    checkout.verificarResumoDoPedido(usuario, produto)
    checkout.pagarPedido(pagamento, comentario)
    cadastro.excluirConta().then(() => { contaCriada = false })
  })

  it('Realizar pedido: fazer login antes do checkout', () => {
    cy.visit('/login')
    cadastro.cadastrarUsuario(usuario).then(() => { contaCriada = true })
    cadastro.continuar()
    autenticacao.efetuarLogout()
    cy.location('pathname').should('eq', '/login')

    cy.visit('/')
    cy.title().should('eq', 'Automation Exercise')
    cy.get('#slider').should('be.visible')

    autenticacao.acessarLogin()
    cy.contains('.login-form h2', 'Login to your account').should('be.visible')
    autenticacao.efetuarLogin(usuario.email, usuario.senha)

    autenticacao.verificarUsuarioLogado(usuario)
    carrinho.adicionarProduto(produto.id)
    carrinho.abrir()
    carrinho.verificarProduto(produto)
    carrinho.prosseguirParaCheckout()
    checkout.verificarResumoDoPedido(usuario, produto)
    checkout.pagarPedido(pagamento, comentario)
    cadastro.excluirConta().then(() => { contaCriada = false })
  })
})
