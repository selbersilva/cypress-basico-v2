Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Sel')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('sel.ber@live.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})