function acessarRodape() {
  return cy.get('#footer').scrollIntoView()
}

function inscreverEmail(email) {
  cy.get('#susbscribe_email').should('be.visible').clear().type(email)
  return cy.get('#subscribe').click()
}

module.exports = { acessarRodape, inscreverEmail }
