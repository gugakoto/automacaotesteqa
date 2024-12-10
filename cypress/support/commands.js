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

const { elementsBusca } = require("./pageObjects/busca/elements");
const { elementsProd } = require("./pageObjects/produto/elements");

// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('busca', (produto) => {
    cy.get(elementsBusca.barraBusca).type(produto);
    cy.get(elementsBusca.botaoBusca).eq(1).click({ force: true });
});

Cypress.Commands.add('selecProd', () => {
    cy.get(elementsProd.listaProduto).should('be.visible');
    cy.get(elementsProd.produtoGrid).eq(0).click();
});

Cypress.Commands.add('addCart', () => {
    cy.get(elementsProd.botaoAddCart).click();
    cy.get(elementsProd.inputQTDD).then(($qtdd) => {
        const valor = $qtdd.val()
        if (/^[0-9]+$/.test(valor)) {
            cy.get(elementsProd.popupCart).should('be.visible');

        } else {
            cy.get(elementsProd.popupCart).should('not.be.visible');
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
Cypress.Commands.add('loginAPI', () => {

    cy.request({
        method: 'POST',
        url: `https://www.advantageonlineshopping.com/accountservice/accountrest/api/v1/login`,
        body: {
            "loginPassword": "Password123",
            "loginUser": "admintest2"
        }
    })

});
Cypress.Commands.add('buscaProdAPI', (prodID) => {

    cy.request({
        method: 'GET',
        url: `https://www.advantageonlineshopping.com/catalog/api/v1/products/${prodID}`,
        failOnStatusCode: false
    });
});
Cypress.Commands.add('novoProdAPI', (token) => {

    cy.request({
        method: 'POST',
        url: 'https://www.advantageonlineshopping.com/catalog/api/v1/products',
        failOnStatusCode: false,
        body:
        {
            "attributes": [
                {
                    "attributeName": "GRAPHICS",
                    "attributeValue": "1"
                }
            ],
            "categoryId": 1,
            "colors": [
                {
                    "code": "FFFFFF",
                    "inStock": 12,
                    "name": "BLACK"
                }
            ],
            "description": "Um Produto teste para API",
            "imageUrl": "https://cdn.prod.website-files.com/5eb4a2a92bf8e062214710a1/663e6c3e2bd9cc65f72b0e50_IMAGENS%20BLOG%20INGRAL%20(2).png",
            "images": [
                "string"
            ],
            "price": 100,
            "productId": 54321,
            "productName": "Caixa com Coisas",
            "productStatus": "Active"
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
});

const imagem = 'caixa.jpg';

Cypress.Commands.add('alteraFotoAPI', (novoprodID, token, userID, source) => {

    cy.fixture(imagem, 'binary').then((imagemBuffer) => {
        const blob = new Blob([imagemBuffer], { type: 'image/jpeg' });
        const formData = new FormData();
        formData.append('file', blob, imagem);
        console.log(formData.getAll('file')); // Verifique se o arquivo está anexado

        cy.request({
            method: 'POST',
            url: `https://www.advantageonlineshopping.com/catalog/api/v1/product/image/${novoprodID}/${userID}/${source}`,
            failOnStatusCode: false,
            qs: {
                'productID': `${novoprodID}`
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,

            },
            body: formData
        });
    });
});