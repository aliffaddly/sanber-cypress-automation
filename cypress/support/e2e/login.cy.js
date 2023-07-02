describe('Login Test', ()=>{
    beforeEach(()=>{
        // visit URL before execute each test
        cy.visit('/');
    });

    it('Login with correct email and password', ()=>{
        // input email and password and click login button
        cy.get('#email').type('toko.cypress@gmail.com');
        cy.get('#password').type('123456');
        cy.get('.chakra-button').click();

        // assertion
        cy.url().should('include','/dashboard');
        cy.get('h3').contains('kasirAja');
    });

    it('Login with invalid email and password, should display error message', ()=>{
        // 1 - input invalid email
        cy.get('#email').type('toko.cypress123@gmail.com');
        cy.get('#password').type('123456');
        cy.get('.chakra-button').click();

        // assertion, should display error message
        cy.get('.chakra-alert').should('be.visible');
        cy.get('.chakra-alert').should('have.css','background-color','rgb(254, 215, 215)');
        cy.get('.chakra-alert').should('have.text','Kredensial yang Anda berikan salah');

        // 2 - input invalid password
        cy.get('#email').clear();
        cy.get('#password').clear();
        cy.get('#email').type('toko.cypress@gmail.com');
        cy.get('#password').type('Toko123');
        cy.get('.chakra-button').click();

        // assertion, should display error message
        cy.get('.chakra-alert').should('be.visible');
        cy.get('.chakra-alert').should('have.css','background-color','rgb(254, 215, 215)');
        cy.get('.chakra-alert').should('have.text','Kredensial yang Anda berikan salah');
    });

    it('Login with invalid email format, should display error message', ()=>{
        cy.get('#email').type('toko.cypress@gmail');
        // input invalid password
        cy.get('#password').type('Toko123');
        cy.get('.chakra-button').click();

        // assertion, should display error message
        cy.get('.chakra-alert').should('be.visible');
        cy.get('.chakra-alert').should('have.css','background-color','rgb(254, 215, 215)');
        cy.get('.chakra-alert').should('have.text','"email" must be a valid email');
    });

    it('Login with email field is empty, should display error message', ()=>{
        cy.get('#password').type('123456');
        cy.get('.chakra-button').click();

        // assertion, should display error message
        cy.get('.chakra-alert').should('be.visible');
        cy.get('.chakra-alert').should('have.css','background-color','rgb(254, 215, 215)');
        cy.get('.chakra-alert').should('have.text','"email" is not allowed to be empty');
    });

    it('Login with password field is empty, should display error message', ()=>{
        cy.get('#email').type('toko.cypress@gmail.com');
        cy.get('.chakra-button').click();

        // assertion, should display error message
        cy.get('.chakra-alert').should('be.visible');
        cy.get('.chakra-alert').should('have.css','background-color','rgb(254, 215, 215)');
        cy.get('.chakra-alert').should('have.text','"password" is not allowed to be empty');
    });
})