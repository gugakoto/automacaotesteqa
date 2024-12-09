// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('busca', (produto) => {
    cy.get('[id="mobileSearch"]').type(produto);
    cy.get('[id="menuSearch"]').eq(1).click({ force: true });
});

Cypress.Commands.add('selecProd', () => {
    cy.get('[class="cell categoryRight"]').should('be.visible');
    cy.get('[class="imgProduct"]').eq(0).click();
});

Cypress.Commands.add('addCart', () => {
    cy.get('[name="save_to_cart"]').click();
    cy.get('[name="quantity"]').then(($qtdd) => {
        const valor = $qtdd.val()
        if (/^[0-9]+$/.test(valor)) {
            cy.get('[ng-show="cart.productsInCart.length > 0"]').should('be.visible');

        } else {
            cy.get('[ng-show="cart.productsInCart.length > 0"]').should('not.be.visible');
        }
    });
});

Cypress.Commands.add('validaCart', (linha, prod, color, qtdd, preco) => {
cy.get('.fixedTableEdgeCompatibility tbody tr').eq(linha).as('linhas');
cy.get('@linhas').each(($row) => {
    cy.wrap($row).find('td:eq(1)').should('contain', prod);
    cy.wrap($row).find('td:eq(3) span').should('have.attr', 'title', color);
    cy.wrap($row).find('td:eq(4)').should('contain', qtdd)
    cy.wrap($row).find('td:eq(5)').should('contain', preco)
})
});
