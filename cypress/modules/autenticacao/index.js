function efetuarLogin(email, senha) {
  cy.get('[data-qa="login-email"]').type(email, { log: false })
  cy.get('[data-qa="login-password"]').type(senha, { log: false })

  return cy.get('[data-qa="login-button"]').click()
}

function efetuarLogout() {
  return cy.get('a[href*="logout"]')
    .should('be.visible')
    .click()
}

function acessarLogin() {
  return cy.get('.shop-menu a[href="/login"]').click()
}

function verificarUsuarioLogado(usuario) {
  return cy.contains('.shop-menu li', 'Logged in as')
    .should('be.visible')
    .and('contain.text', usuario.nome)
}

function garantirUsuarioLogado(usuario) {
  cy.visit('/')
  cy.get('.navbar-nav li').invoke('text').then((textoDoMenu) => {
    if (textoDoMenu.includes('Signup / Login')) {
      acessarLogin()
      efetuarLogin(usuario.email, usuario.senha)
    }
  })
  return verificarUsuarioLogado(usuario)
}

module.exports = {
  efetuarLogin,
  efetuarLogout,
  acessarLogin,
  verificarUsuarioLogado,
  garantirUsuarioLogado,
}
