class SignupPage{
    go(){
        //visita a pagina raiz 
        cy.visit('/')
        //verifica o titulo da pagina
        cy.get('#page-home main h1')
        .should('have.text', 'Seja um parceiro entregador pela Buger Eats')
        //valida o texto da pagina incial
        cy.get('#page-home main p')
        .should('have.text', 'Em vez de oportunidades tradicionais de entrega de refeições em horários pouco flexíveis, seja seu próprio chefe.')
        //clica no botão para inciar o cadastro
        cy.get('a[href="/deliver"]')
        .should('have.text','Cadastre-se para fazer entregas')
        .click()
        //valida se a pagina atual é a pagina de cadastro
        cy.url().should('equal','https://buger-eats-qa.vercel.app/deliver')
    }
    //função que preenche todos os campos do formulario de cadastro a partir de uma massa
    fillForm(deliver){
        //preenche o nome
        cy.get('input[name="fullName"]').type(deliver.name);
        //preenche o cpf
        cy.get('input[name="cpf"]').type(deliver.cpf);
        //preenche o email
        cy.get('input[name="email"]').type(deliver.email);
        //preenche o numero do whatsapp
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp);
        //preenche o cep
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
        //pclica no botão buscar cep
        cy.get('input[value="Buscar CEP"][type="button"]').click();

        //preenche o nummero da casa
        cy.get('input[name="address-number"]').type(deliver.address.number);
        //preenche o completo
        cy.get('input[name="address-details"]').type(deliver.address.details);

        //valida se o conteudo trazido no campo do endereço esta correto
        cy.get('input[name="address"]').should('have.value',deliver.address.street);
        //valida se o conteudo trazido no campo da cidade esta correto
        cy.get('input[name="district"]').should('have.value',deliver.address.bairro);
        //valida se o conteudo trazido no campo cidade/uf
        cy.get('input[name="city-uf"]').should('have.value',deliver.address.city_state);
        
        //seleciona um metodo de entrega moto/bicicleta/van
        cy.contains('.delivery-method li', deliver.meotodo_entrega).click();

        //adiciona a imagem atravez do metodo attachfile do plugin cypress-file-upload
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh);

    }
    //função que clica no botão confirmar cadastro
    submit(){
        cy.get('form button[type="submit"]').click();
    }
    //valida a mensagem de confirmação de cadastro
    modalContentShouldBe(expectedMessage){
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage);
    }
    //valida as mnesagens e exibição das mensagens de erro
    alertMessageShouldBe(expectedMessage){
        cy.contains('.alert-error', expectedMessage).should('be.visible');
    }
    //valida a mensagens e exibição das mensagens de alerta
    errorMessageShouldBe(expectedMessage){
        cy.contains('.alert-warning', expectedMessage).should('be.visible');
    }

}
//exporta a 'classe' SignupPage como um objeto que ao ser importado já instacia a classe
export default new SignupPage;