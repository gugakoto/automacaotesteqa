
describe("Buscar Produto na API", () => {

    it('Busca Produto', () => {

        const prodID = 20

        cy.buscaProdAPI(prodID).then((retornoAPI) => {
            expect(retornoAPI.status).equal(200);
            expect(retornoAPI.body.productId).equal(prodID);
            expect(retornoAPI.body.productName).equal("Bose Soundlink Bluetooth Speaker III");
        });

    });

});