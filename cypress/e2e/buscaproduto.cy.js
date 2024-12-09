const { describe } = require("mocha");

describe("Buscar Produto", () => {
    
    beforeEach(() => {
        cy.visit('https://advantageonlineshopping.com/');
    });

    it("Buscar produto Existente", () => {
        cy.busca("Speaker");
        cy.url().should('include','Speaker');
        cy.get('[class="cell categoryLeft"]').should('be.visible');
    });

    it("Buscar Produto Inexistente", () => {
        cy.busca("Notebook");
        cy.url().should('include','Notebook');
        cy.get('[class="noProducts roboto-bold "]').should('be.visible');
    })
})