import { elementsProd } from "../support/pageObjects/produto/elements";

describe("Adicionar Produto ao Carrinho", ()=>{

    beforeEach(() => {
        cy.visit('https://advantageonlineshopping.com/');
        cy.get('.loader').should('not.be.visible');
        cy.busca("Speaker");
        cy.selecProd();
    });

    it("Adicionar produto ao carrinho", ()=>{
        cy.addCart();
    });
    it("Adicionar produto com estoque insuficiente", ()=>{
        cy.get(elementsProd.inputQTDD).type(11);
        cy.addCart()
        cy.get(elementsProd.msgErro).should('contain', 'Oops! We only have 10 in stock. We updated your order accordingly')
    });

    it('teste qtdd', ()=>{
        cy.get(elementsProd.inputQTDD).type('lorem');
        cy.addCart()
    });
});