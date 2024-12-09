describe("Adicionar Produto ao Carrinho", ()=>{

    beforeEach(() => {
        cy.visit('https://advantageonlineshopping.com/');
        cy.busca("Speaker");
        cy.selecProd();
    });

    it("Adicionar produto ao carrinho", ()=>{
        cy.addCart();
    });
    it("Adicionar produto com estoque insuficiente", ()=>{
        cy.get('[name="quantity"]').type(11);
        cy.addCart()
        cy.get('[data-ng-class="message._class"]').should('contain', 'Oops! We only have 10 in stock. We updated your order accordingly')
    });

    it('teste qtdd', ()=>{
        cy.get('[name="quantity"]').type('lorem');
        cy.addCart()
    });
});