const { describe } = require("mocha");
const { elementsBusca } = require("../support/pageObjects/busca/elements");

describe("Buscar Produto", () => {
    
    beforeEach(() => {
        cy.visit('https://www.advantageonlineshopping.com/');
        cy.get('.loader').should('not.be.visible');
    });

    it("Buscar produto Existente", () => {
        cy.busca("Speaker");
        cy.url().should('include','Speaker');
        cy.get(elementsBusca.filtroBusca).should('be.visible');
    });

    it("Buscar Produto Inexistente", () => {
        cy.busca("Notebook");
        cy.url().should('include','Notebook');
        cy.get(elementsBusca.listaProdVazia).should('be.visible');
    })
})