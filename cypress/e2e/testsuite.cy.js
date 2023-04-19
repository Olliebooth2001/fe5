/// <reference types="Cypress" />


describe('e2e Tests', () => {



  it('T01 Should Successfully Upload Single PDF', () => {
    cy.visit('https://olliebooth2001.github.io/fe5/');
     cy.get('button[id$="scrollToUploadBtn"]').click();
     cy.wait(2000);
     cy.get(':nth-child(1) > #formFileLg').attachFile('../media/State1-2.pdf');    
     cy.get('.MuiAlert-message').should('exist');
  });
  it ('T02 Should Successfully View Highest and Lowest Week',() =>{
    cy.reload()
    cy.visit('https://olliebooth2001.github.io/fe5/');
     cy.get('button[id$="scrollToUploadBtn"]').click();
     cy.wait(2000);
     cy.get('#formFileLg').attachFile('../media/State1-2.jpg');    
     cy.get('.MuiAlert-message').should('exist');
     cy.wait(10000);

     cy.get('button[id$="submitBtn"]').click();
     cy.wait(2000)
     cy.get('button').contains('DASHBOARD').click();

    
     //assertions
     cy.get('#highestw1', {timeout: 25000}).should('contain','14 - 21');
     cy.get('#lowestw1').should('contain','1 - 7');
  });
  it ('T03 Should Successfully View Net Spend',() =>{
    cy.reload()
    cy.visit('https://olliebooth2001.github.io/fe5/');
     cy.get('button[id$="scrollToUploadBtn"]').click();
     cy.wait(2000);
     cy.get(':nth-child(1) > #formFileLg').attachFile('../media/State1-2.jpg');    
     cy.get('.MuiAlert-message').should('exist');
     cy.wait(10000);

     cy.get('button[id$="submitBtn"]').click();
     cy.get('button').contains('VIEW DASHBOARD').click();

     //assertions
     cy.get('#netbalm1').should('contain','-£691.16');
  });

   it('T04 Should Successfully View Most Common Transaction',() =>{
    cy.reload()
    cy.visit('https://olliebooth2001.github.io/fe5/');
     cy.get('button[id$="scrollToUploadBtn"]').click();
     cy.wait(2000);
     cy.get(':nth-child(1) > #formFileLg').attachFile('../media/State1-2.jpg');    
     cy.get('.MuiAlert-message').should('exist');
     cy.wait(10000);

     cy.get('button[id$="submitBtn"]').click();
     cy.get('button').contains('VIEW DASHBOARD').click();

     //assertions
     cy.get('#m1percent').should('contain','Made up 20.00% of all transactions');
  });

  it('T05 Should Successfully View Most Expensive',() =>{
    cy.reload()
    cy.visit('https://olliebooth2001.github.io/fe5/');
     cy.get('button[id$="scrollToUploadBtn"]').click();
     cy.wait(2000);
     cy.get(':nth-child(1) > #formFileLg').attachFile('../media/State1-2.jpg');    
     cy.get('.MuiAlert-message').should('exist');
     cy.wait(10000);

     cy.get('button[id$="submitBtn"]').click();
     cy.get('button').contains('VIEW DASHBOARD').click();

     //assertions
     cy.get('#m1expensive').should('contain','£975');
     
  });

  it('T06 Should Successfully View Net Spend',() =>{
    cy.reload()
    cy.visit('https://olliebooth2001.github.io/fe5/');
     cy.get('button[id$="scrollToUploadBtn"]').click();
     cy.wait(2000);
     cy.get(':nth-child(1) > #formFileLg').attachFile('../media/State1-2.jpg');    
     cy.get('.MuiAlert-message').should('exist');
     cy.wait(10000);

     cy.get('button[id$="submitBtn"]').click();
     cy.get('button').contains('VIEW DASHBOARD').click();

     //assertions
     cy.get('#m1daily').should('contain','£36.90');
     
  });
  
  it('T07 Should Successfully View Correct Month',() =>{
    cy.reload()
    cy.visit('https://olliebooth2001.github.io/fe5/');
     cy.get('button[id$="scrollToUploadBtn"]').click();
     cy.wait(2000);
     cy.get(':nth-child(1) > #formFileLg').attachFile('../media/State1-2.jpg');    
     cy.get('.MuiAlert-message').should('exist');
     cy.wait(10000);

     cy.get('button[id$="submitBtn"]').click();
     cy.get('button').contains('VIEW DASHBOARD').click();

     //assertions
     cy.get('#month1h1s').should('contain','January');
     
  });
  it('T02 Should Unsuccessfully upload invalid file', () => {
    cy.visit('https://olliebooth2001.github.io/fe5/');

    // cy.get('#scrollToUploadBtn').click();
    // cy.wait(2000);
    // cy.get(':nth-child(1) > #formFileLg').attachFile('../media/Example2AhmedPhd.pptx');    

  });
});