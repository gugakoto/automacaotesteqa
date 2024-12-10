import { elementsBusca } from "../support/pageObjects/busca/elements";
import { elementsCart } from "../support/pageObjects/carrinho/elements";
import { elementsProd } from "../support/pageObjects/produto/elements";

describe("Validar Produtos no Carrinho", () => {

    beforeEach(() => {
        cy.visit('https://advantageonlineshopping.com/');
        cy.get('.loader').should('not.be.visible');
        cy.get(elementsCart.botaoCarrinho).click();
        cy.get(elementsCart.carrinhoVazio).should('contain', 'Your shopping cart is empty');
        cy.get(elementsCart.botaoHome).click();
        cy.busca("Speaker");
        cy.selecProd();
        cy.addCart();
        cy.get(elementsCart.botaoHome).click();
        cy.busca("Mice");
        cy.selecProd();
        cy.addCart();
        cy.get(elementsCart.botaoHome).click();
        cy.busca("Laptop");
        cy.selecProd();
        cy.addCart();
        cy.get(elementsCart.botaoCarrinho).click();
    });

    it("Validar Produtos no Carrinho", () => {
        cy.validaCart(0, 'LAPTOP','GRAY','1','$849.99');
        cy.validaCart(1, 'MOUSE','BLACK','1','$9.99');
        cy.validaCart(2, 'SPEAKER','GRAY','1','$200.00');
        });

    it("Validar Botão Editar no Carrinho", () => {
        cy.get('.fixedTableEdgeCompatibility tbody tr:eq(0) td:eq(5)').find('.edit').click();
        cy.url().should('include','product');
        cy.get(elementsBusca.barraBusca).type(2);
        cy.get(elementsProd.botaoAddCart).click();
        cy.url().should('include','shoppingCart');
        cy.validaCart(0, 'LAPTOP','GRAY','2','$1,699.98');
    });

    it("Validar Botão Remover do Carrinho", () => {
        cy.get('.fixedTableEdgeCompatibility tbody tr:eq(0) td:eq(5)').find('.remove').click();
        cy.validaCart(0, 'MOUSE','BLACK','1','$9.99');
    });
});

