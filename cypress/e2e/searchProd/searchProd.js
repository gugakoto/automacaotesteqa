import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { elementsBusca } from "../../support/pageObjects/busca/elements.js";


Given("I am on the website homepage", () => {
    cy.visit('https://www.advantageonlineshopping.com/');
    cy.get('.loader').should('not.be.visible');
});

When("I type an existing product name in the search field", () => {
    cy.busca("Speaker");

});

Then("I should see products with that name in the search results", () => {
    cy.url().should('include','Speaker');
    cy.get(elementsBusca.filtroBusca).should('be.visible');
});

When("I type an non-existing product name in the search field", () => {
    cy.busca("Notebook");
});

Then("I should see the message 'Product not found'", () => {
    cy.url().should('include','Notebook');
    cy.get(elementsBusca.listaProdVazia).should('be.visible');
});