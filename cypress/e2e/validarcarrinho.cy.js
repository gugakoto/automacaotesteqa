describe("Validar Produtos no Carrinho", () => {

    beforeEach(() => {
        cy.visit('https://advantageonlineshopping.com/');
        cy.get('[id="shoppingCartLink"]').click();
        cy.get('[class="roboto-bold ng-scope"]').should('contain', 'Your shopping cart is empty');
        cy.get('[class="logo"]').click();
        cy.busca("Speaker");
        cy.selecProd();
        cy.addCart();
        cy.get('[class="logo"]').click();
        cy.busca("Mice");
        cy.selecProd();
        cy.addCart();
        cy.get('[class="logo"]').click();
        cy.busca("Laptop");
        cy.selecProd();
        cy.addCart();
        cy.get('[id="shoppingCartLink"]').click();
    });

    it("Validar Produtos no Carrinho", () => {
        cy.validaCart(0, 'LAPTOP','GRAY','1','$849.99');
        cy.validaCart(1, 'MOUSE','BLACK','1','$9.99');
        cy.validaCart(2, 'SPEAKER','GRAY','1','$200.00');
        });

    it("Validar Botão Editar no Carrinho", () => {
        cy.get('.fixedTableEdgeCompatibility tbody tr:eq(0) td:eq(5)').find('.edit').click();
        cy.url().should('include','product');
        cy.get('[name="quantity"]').type(2);
        cy.get('[name="save_to_cart"]').click();
        cy.url().should('include','shoppingCart');
        cy.validaCart(0, 'LAPTOP','GRAY','2','$1,699.98');
    });

    it("Validar Botão Remover do Carrinho", () => {
        cy.get('.fixedTableEdgeCompatibility tbody tr:eq(0) td:eq(5)').find('.remove').click();
        cy.validaCart(0, 'MOUSE','BLACK','1','$9.99');
    });
});

