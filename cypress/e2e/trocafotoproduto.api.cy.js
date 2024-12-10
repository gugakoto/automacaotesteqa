///<reference types="cypress"/>

describe("alterar a foto do Produto na API", () => {

    var token = ''
    var userID = ''
    var novoprodID = ''
    var source = 'teste'
    before(() => {

        cy.loginAPI().then((authLogin) => {
            token = authLogin.body.statusMessage.token
            userID = authLogin.body.statusMessage.token
        })

    });

    it('Altera Foto do Produto', () => {

        cy.novoProdAPI(token).then((response) => {
            expect(response.status).equals(200);
            novoprodID = response.body.id;

            cy.alteraFotoAPI(token, novoprodID, userID, source);
            });
        });
    });


