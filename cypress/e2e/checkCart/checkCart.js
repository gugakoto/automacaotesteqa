import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { elementsBusca } from "../../support/pageObjects/busca/elements";
import { elementsCart } from "../../support/pageObjects/carrinho/elements";
import { elementsProd } from "../../support/pageObjects/produto/elements";

Given('I am on the cart page', () => {
    cy.openCart();
});

When('I view products in the cart', () => {
    cy.fillUpCart("Speaker", "Mice", "Laptop");
});

When('I click the "Edit" button on a product', () => {
    cy.fillUpCart("Speaker", "Mice", "Laptop");
    cy.get('.fixedTableEdgeCompatibility tbody tr:eq(0) td:eq(5)').find('.edit').click();
});

When('I have a empty cart', () => {
    cy.get(elementsCart.carrinhoVazio).should('contain', 'Your shopping cart is empty');
});

When('I remove a product from the cart', () => {
    cy.fillUpCart("Speaker", "Mice", "Laptop");
    cy.get('.fixedTableEdgeCompatibility tbody tr:eq(0) td:eq(5)').find('.remove').click();
});

Then('I should see correctly added products', () => {
    cy.validaCart(0, 'LAPTOP','GRAY','1','$849.99');
    cy.validaCart(1, 'MOUSE','BLACK','1','$9.99');
    cy.validaCart(2, 'SPEAKER','GRAY','1','$200.00');
});

Then('I should be directed to the product edit page', () => {
    cy.url().should('include','product');
    cy.get(elementsProd.inputQTDD).type(2);
    cy.get(elementsProd.botaoAddCart).click();
    cy.url().should('include','shoppingCart');
    cy.validaCart(0, 'LAPTOP','GRAY','2','$1,699.98');
});

Then('I should see the message "Your shopping cart is empty"', () => {
    cy.get(elementsCart.carrinhoVazio).should('contain', 'Your shopping cart is empty');
});

Then('I should not see the removed product in the cart.', () => {
    cy.validaCart(0, 'MOUSE','BLACK','1','$9.99');
});
