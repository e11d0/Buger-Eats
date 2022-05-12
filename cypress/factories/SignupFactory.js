//fazendo a chamada (importando) a biblioteca do faker para randomizar nomes e e-mails
var faker = require('faker');
//fazendo a chamada(importando) a biblioteca do gerador-validador-cpf para randomizar os cpfs
var cpf = require('gerador-validador-cpf')
//define a exportação como padrão
export default {
    deliver: function () {
        //criando a instanacia do primeiro nome e gerando 
        var firstName = faker.name.firstName();
        //criando a instancia do sobrenome e gerando
        var lastName = faker.name.lastName();
        var data = {
            //adicionando no campo nome da massa o nome e sobrenome gerado no fake
            name: `${firstName} ${lastName}`,
            //usando o generate() do gerador-validador-cpf para gerar um cpf
            cpf: cpf.generate(),
            //usando o nome gerado no fake junto com a funcao internet.email para gerar um email
            email: faker.internet.email(firstName),
            whatsapp: '11999999999',
            address: {
                postalcode: '58300370',
                street: 'Rua Edson de Queiroz',
                bairro: 'Centro',
                number: '0',
                details: 'casa',
                city_state: 'Santa Rita/PB'
            },
            meotodo_entrega: 'Moto',
            cnh: 'cnh-digital.jpg'
        }
        //retorna data encapsulada no deliver
        return data;
    }
}