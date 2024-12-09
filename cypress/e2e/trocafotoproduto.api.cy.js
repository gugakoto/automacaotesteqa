///<reference types="cypress"/>

describe("alterar a foto do Produto na API", () => {

    var token = ''
    var userID = ''
    var novoprodID = ''
    var source = 'teste'
    before(() => {

        cy.request({
            method: 'POST',
            url: `https://www.advantageonlineshopping.com/accountservice/accountrest/api/v1/login`,
            body: {
                "loginPassword": "Password123",
                "loginUser": "admintest2"
            }
        }).then((authLogin) => {
            token = authLogin.body.statusMessage.token
            userID = authLogin.body.statusMessage.token
        })

    });

    it('Altera Produto', () => {

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
        }).as('prodCadastrado');

        cy.get('@prodCadastrado').then((response) => {
            expect(response.status).equals(200);
            novoprodID = response.body.id;
            const imagem = 'caixa.jpg';


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

        });

    });