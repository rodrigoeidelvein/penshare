/// <reference types="cypress" />

context('Navigation', () => {
  it('Carrega a página inicial com sucesso', () => {
    cy.visit('http://localhost:3000');
    cy.get('.app-name').should(($title) => {
      expect($title).to.have.text('Penshare');
    })

    cy.get('nav li').should(($lis) => {
      expect($lis).to.have.length(3);
      expect($lis.eq(0)).to.contain('Início');
      expect($lis.eq(1)).to.contain('Entrar');
      expect($lis.eq(2)).to.contain('Sobre');
    })

  })

  it('Abre a página de login', () => {
    cy.get('nav li:nth-child(2)').click();
    cy.url().should('include', '/entrar');
  })

  it('Faz login', () => {
    const username = Cypress.env('USER_EMAIL');
    const password = Cypress.env('USER_PASSWORD');
    const loginUrl = Cypress.env('LOGIN_URL');
    const cookieName = 'token';

    const socialLoginOptions = {
      username: username,
      password: password,
      loginUrl: loginUrl,
      headless: false,
      logs: false,
      loginSelector: 'button',
      postLoginSelector: '.user-side-nav'
    }

    return cy.task('GoogleSocialLogin', socialLoginOptions).then(({ cookies }) => {
      cy.clearCookies();

      const cookie = cookies.filter(cookie => cookie.name === cookieName).pop();

      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure
        })

        Cypress.cookies.defaults({
          preserve: cookieName
        })
      }
    })
  })
})
