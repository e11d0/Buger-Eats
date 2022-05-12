///<reference types ='Cypress'/>
//importa a classe Signuppage que tem as funcoes
import signup from '../pages/SignupPage'

describe('home page', () => {

    it('CT000_App deve estar online', () => {
        //executa a funcao go, que faz a validacado da tela incial e o ajuste da resolucao da tela
        signup.go();
    })

})