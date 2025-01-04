import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const prodID = 20

Given('The product exists in the database', () => {
   cy.allProdAPI();
});


When('I search for the product by code or description', () => {
    cy.buscaProdAPI(prodID).as('retornoAPI');    
});

Then('I should receive a response with the found product', () => {
    cy.get('@retornoAPI').then((response)=>{
    expect(response.body.productId).equal(prodID);
    expect(response.body.productName).equal("Bose Soundlink Bluetooth Speaker III");
});
});