
describe("Buscar Produto na API", () => {

    it('Busca Produto', () => {

        const prodID = 20

        cy.request({
            method: 'GET',
            url: `https://www.advantageonlineshopping.com/catalog/api/v1/products/${prodID}`,
            failOnStatusCode: false
        }).as('ProdutoResult');

        cy.get('@ProdutoResult').then((retornoAPI) => {
            expect(retornoAPI.status).equal(200);
            expect(retornoAPI.body.productId).equal(prodID);
            expect(retornoAPI.body.productName).equal("Bose Soundlink Bluetooth Speaker III");
        });

    });

});