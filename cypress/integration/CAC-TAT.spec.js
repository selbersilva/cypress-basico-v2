///<refence types= "Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    //descrive - define a suite de teste
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        // it - adiciona o código que visita a aplicação
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
// 1 - Exercicio Preenchendo campo obrigatório com sucesso
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste,  teste, teste, teste, teste, teste, teste, teste, teste, teste. ' //Para subescrever o texto mais rápido com texto longo ('longText, { delay: 0}')
        cy.get('#firstName').type('Sel')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('sel.ber@live.com')
        //cy.get('#open-text-area').type('Teste') //Para subescrever o texto mais rápido com texto longo usa ('longText, { delay: 0}')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        
    })

// 2 Exercicio - Mensagem de erro ao preencer o email
    it('Exibe mensagem de erro quando o campo de email estiver inválido', function () {
         
        cy.get('#firstName').type('Sel')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('sel.ber@live,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

 // 3 Exercicio - Campo de telefone vazio
    it('campo de telefone continua vazio quando preenchido com valor não-numérico', function () {

        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', "")
    })
    
    // 4 Exercicio - Exibir mensagem de erro quando o telefone se torna obrigatório.
    it('exibe mensagem de erro que o telefone se torna obrigatório', function () {
        cy.get('#firstName').type('Sel')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('sel.ber@live.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    // 5 Exercicio - Funcionalidade do .clear limpar os campos
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Sel')
            .should('have.value', 'Sel')
            .clear()
            .should('have.value', '')
        
        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')
        
        cy.get('#email')
            .type('sel.ber@live.com')
            .should('have.value', 'sel.ber@live.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')

        
        cy.get('#open-text-area')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '')
        
    })

    // 6 Exercicio - Exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatório.
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        
    })

     // 7 Exercicio - Digitando em campo e verificando elementos - comando customizados
    it('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
        
    })

     // 8 Exercicio - Seleções suspensas - Seleciona pelo texto.
    it('selecione um produto (YouTube) por testo ', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    // 9 Exercicio - Seleciona pelo seu valor
    it('selecione um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
        .should('have.value', 'mentoria')
    })

    // 10  Exercicio - Seleciona pelo índice.
    it('selecione um produto (Blog) por see índice', function () {
        cy.get('#product')
            .select(1)
        .should('have.value', 'blog')
    })

     // 11  Exercicio - Marcando input tipo radio.
    it('marca o tipo de atendimento "Feedback" ', function () {
       cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
        
    })

     // 12  Exercicio - Marca cada  tipo de atendimento.
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
        })
    })

     // 13  Exercicio - Marcar e desmarcar os checkboxes.
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
        
    })

    // 14  Exercicio - Upload de arquivos com Cypress.
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('././cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
        })    
    })

     // 15  Exercicio - simulando um drag-and-drop
    it('seleciona um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('././cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    // 16  Exercicio - 
    it('seleciona um arquivo utilizando uma ixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
                
            })
    })

     // 16  Exercicio - Link que abre em outra aba do navegador.
    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })


    // 17  Exercicio - Acessa uma nova aba, removendo o target
    it('acessa a página da política de privacidade removendo o target e então', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

})  

