/// <reference types="Cypress" />


describe('e2e Tests', () => {
  it('T01 Successfully Upload Single PDF', () => {
    cy.visit('http://localhost:3000/')

    cy.get('#scrollToUploadBtn').click();
    cy.wait(2000)
    cy.get(':nth-child(1) > #formFileLg').attachFile('../media/account5.pdf');    
    cy.get('.MuiAlert-message').should('exist');

  })
  it('T02 Unsuccessfully upload invalid file', () => {
    cy.visit('http://localhost:3000/')

    cy.get('#scrollToUploadBtn').click();
    cy.wait(2000)
    cy.get(':nth-child(1) > #formFileLg').attachFile('../media/Example2AhmedPhd.pptx');    

  })
})