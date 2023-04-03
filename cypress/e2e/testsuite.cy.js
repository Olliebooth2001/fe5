/// <reference types="Cypress" />


describe('e2e Tests', () => {
  it('T01 Should Successfully Upload Single PDF', () => {
    cy.visit('https://olliebooth2001.github.io/fe5/')


    cy.get('button[id$="scrollToUploadBtn"]').click();


    cy.wait(2000)
    cy.get(':nth-child(1) > #formFileLg').attachFile('../media/account5.pdf');    
    cy.get('.MuiAlert-message').should('exist');

  })
  it('T02 Should Unsuccessfully upload invalid file', () => {
    cy.visit('https://olliebooth2001.github.io/fe5/')

    cy.get('#scrollToUploadBtn').click();
    cy.wait(2000)
    cy.get(':nth-child(1) > #formFileLg').attachFile('../media/Example2AhmedPhd.pptx');    

  })
})