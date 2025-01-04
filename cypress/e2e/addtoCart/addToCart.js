import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { elementsProd } from "../../support/pageObjects/produto/elements";
import { elementsBusca } from "../../support/pageObjects/busca/elements";


Given("I am on the product page", () => {
    cy.visit('https://www.advantageonlineshopping.com/');
    cy.get('.loader').should('not.be.visible');
    cy.get(elementsBusca.barraBusca).should('be.visible');
    cy.busca("Speaker");
    cy.selecProd();
});

When('I click the "Add to Cart" button', () => {
    cy.addCart();
});

Then('I should see the product in the cart', () => {
    cy.checkQTDD();
});

When('I select a quantity greater than the stock', () => {
    cy.get(elementsProd.inputQTDD).type(11);
});

And('I click the "Add to Cart" button', () => {
    cy.addCart();
});

Then('I should see an alert message indicating insufficient stock', () => {
    cy.get(elementsProd.msgErro).should('contain', 'Oops! We only have 10 in stock. We updated your order accordingly')
});