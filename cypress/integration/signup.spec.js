//adiciona as referencias do cypress pra ajudar a digitar
///<reference types ='Cypress'/>
//importa a classe Signuppage que tem as funcoes
import signup from '../pages/SignupPage'
import signupfactory from '../factories/SignupFactory'

//incia a sut de teste
describe('Signup', () => {
    //executa antes de cada teste como teste separado
    //beforeEach(function () {
    //executa a funcao go, que faz a validacado da tela incial e o ajuste da resolucao da tela
    //signup.go();
    //})
    //primeiro caso de teste
    it('CT001_User should be deliver', function () {
        //executa a funcao go, que faz a validacado da tela incial e o ajuste da resolucao da tela
        signup.go();
        //criando uma isntancia da massa de teste
        var deliver = signupfactory.deliver();
        //chama a funcao para preencher os campos a partir da massa de teste
        signup.fillForm(deliver)
        //clica no botao pra confirmar o cadastro
        signup.submit()
        //definindo a constante da mensagem a ser validada
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        //chamada da funcao pra validacao da mensagem de confirmacao de cadastro
        signup.modalContentShouldBe(expectedMessage);
    })
    //segundo caso de teste
    it('CT002_Invalid CPF', function () {
        //executa a funcao go, que faz a validacado da tela incial e o ajuste da resolucao da tela
        signup.go();
        //criando uma instancia da massa de teste
        var deliver = signupfactory.deliver();
        //alterando o valor de 'campo' da massa
        deliver.cpf = '00234123AA'
        //chama a funcao para preencher os campos a partir da massa de teste
        signup.fillForm(deliver)
        //clica no botao pra confirmar o cadastro
        signup.submit()
        //validando a mensagem de erro do cpf ausente/invalido
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })
    //terceiro caso de teste
    it('CT003_Invalid Email', function () {
        //executa a funcao go, que faz a validacado da tela incial e o ajuste da resolucao da tela
        signup.go();
        //criando uma instancia da massa de teste
        var deliver = signupfactory.deliver();
        //alterando o valor de 'campo' da massa
        deliver.email = 'ahueauh.hotmail.com'
        //chama a função para preencher os campos a partir da massa de teste deliver
        signup.fillForm(deliver);
        //clica no botão para confirmar o cadastro
        signup.submit();
        //valida a exibição da mensagem de e-mail invalido
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })
    //cria um context usando js para gerar o teste dinamico
    context('CT004_Required fields', function () {
        //definido a constanet com o nome do campo e o resultado esperado das mensagens de dos campos obrigatorios
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]
        //before criado para antes de inciar o teste clicar no botão de confirmar para gerar os erros de campos obrigatorios ausentes
        before(function () {
            //executa a funcao go, que faz a validacado da tela incial e o ajuste da resolucao da tela
            signup.go();
            //clica no botão para confirmar o cadastro
            signup.submit();
        })
        //executa um loop para cada campo do array de mensagens para caso algum de erro o proximo seja executando normalmente
        messages.forEach(function (msg) {
            //cada it roda como um cenario individual, só que dentro de um laço
            it(`${msg.field} is required`, function () {
                //valida a mensagem de erro de acordo com o item msg do array messages
                signup.alertMessageShouldBe(msg.output);
            })
        })
    })
})