/// <reference types="Cypress" />

context('Window', () => {
	beforeEach(() => {
		cy.visit('http://localhost:4200/')
		window.localStorage.setItem('config', `{"api":{"baseUrl":"http://localhost:7000"}}`)
	})

	// https://docs.cypress.io/api/commands/
	it("take me to the login screen first", () => {
		cy.location('pathname').should('include', '/auth/login')
			.get('h1').should('exist')
			.title().should('include', 'Badgr')
	})

	it("let me create and account and show errors", () => {
		cy.get('nav.navbar > nav > div > a:nth-child(2)').click()
			.get('#email').type('root@example.com')
			.get('#first_name').type('Bob')
			.get('#last_name').type('Flannigan')
			.get('#password_must_be_at_least_8_characters_').type('12345678')
			.get('#confirm_password').type('12345679')
			.get('form > div > div > button').click()
			.get('bg-formfield-text.forminput.forminput-is-error > p').should('contain', 'not match')
			.get('.checkbox-x-errortext').should('contain', 'Please read')
			.get('#terms').click()
			.get('#confirm_password').clear().type('12345678')
			.get('form > div > div > button').click()
			.get('bg-formfield-text.forminput.forminput-is-error > p').should('not.exist')
			.get('.checkbox-x-errortext').should('not.exist')
			.get('sign-up > div > form-message > div').should('exist')
	})

	it("allow me to sign in with credentials and open the mozilla modal", () => {
		cy.get('nav.navbar > nav > div > a:nth-child(1)').click()
			.get('#email').type('root@example.com')
			.get('#password').clear().type('12345678')
			.get('login > div > div > form > div > button').click()
			.get('.notification-x-text > h2').should('contain', 'Mozilla')
			.get('.notification-x-text > p > button').click()
	})


})
