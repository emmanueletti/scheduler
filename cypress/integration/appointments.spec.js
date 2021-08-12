describe('Appointments', () => {
  // reset test db before each test
  beforeEach(() => {
    // reset test db
    cy.request('GET', '/api/debug/reset');

    cy.visit('/');

    // implicity assertion to make sure page is fully loaded
    cy.contains('Monday');
  });

  it('should book an interview', () => {
    cy.get('[alt=Add]').first().click();

    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');

    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains('Save').click();

    cy.contains('Saving');

    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
    cy.get('[alt=Edit]').first().click({ force: true });

    cy.get('[data-testid=student-name-input]').clear().type('John Doe');

    cy.get('[alt="Tori Malcolm"]').click();

    cy.contains('Save').click();

    cy.contains('Saving');

    cy.contains('.appointment__card--show', 'John Doe');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it.only('should cancel an interview', () => {
    cy.get('[alt=Delete]').first().click({ force: true });

    cy.contains('Are you sure you would like to delete');

    cy.contains('Confirm').click();

    cy.contains('Deleting');

    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
