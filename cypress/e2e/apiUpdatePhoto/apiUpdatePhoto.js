import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

var cor = 'CAIXA'
var token = ''
var userID = ''
var prodID = 20
var source = 'teste'


Given('I am logged in as a Admin user', () => {
    cy.loginAPI().then((authLogin) => {
        token = authLogin.body.statusMessage.token
        userID = authLogin.body.statusMessage.userId
    }).then((loginResponse) => {
        if (loginResponse.status !== 200) {
            cy.createAdmin();
            cy.loginAPI()
        } else {
            expect(loginResponse.status).to.eq(200);
        }
    })
});


When('I send a request to update the product image', () => {    
    cy.alteraFotoAPI(prodID, token, userID, source, cor).then((response) =>{
        expect(response.status).to.eq(200)
    })
});

Then('I should receive a response confirming the update', () => {
    cy.buscaProdAPI(20).then((prodRes)=>{
        expect(prodRes.body.images).to.have.deep.property('2', 'CAIXA##custom_image_teste_4e73c3fa-dcfe-435f-aa1d-9eb5482bd38e');
    })
});