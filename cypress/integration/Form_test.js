describe('Testing form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/Pizza');
    });
    it('Add text to inputs and submit form', () => {
        cy.get('input[name="name"]')
            .type("Loc Giang")
            .should('have.value', 'Loc Giang');
        cy.get('select[name="pizzaSize"]')
            .select('large')
            .should('have.value', 'large');
        cy.get('input[name="pepperoni"]')
            .check()
            .should('be.checked');
        cy.get('input[name="mushroom"]')
            .check()
            .should('be.checked');
        cy.get('button[name="buttonName"]')
            .click();
    })
});