describe('Home Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('http://localhost:3000');
  });

  it('should load the home page successfully', () => {
    // Check if the page has loaded
    cy.get('header').should('be.visible');
    cy.get('header a[href="/"]').should('be.visible');
  });

  it('should have navigation links', () => {
    // Check navigation links
    cy.contains('a', 'Work').should('be.visible');
    cy.contains('a', 'Services').should('be.visible');
    cy.contains('a', 'About').should('be.visible');
  });

  it('should open mobile menu on click', () => {
    // Adjust viewport to mobile size
    cy.viewport('iphone-x');

    // The mobile menu should be initially hidden
    cy.get('[class*="opacity-0"]').should('exist');

    // Click the menu button
    cy.get('button[aria-label="Open menu"]').click();

    // The mobile menu should now be visible
    cy.get('[class*="opacity-100"]').should('be.visible');
  });

  it('should scroll to sections when navigation links are clicked', () => {
    // Click the About link
    cy.contains('a', 'About').click();

    // Check if the About section is in view (using ID)
    cy.get('#about').should('be.visible');

    // Click the Work link
    cy.contains('a', 'Work').click();

    // Check if the Work section is in view
    cy.get('#work').should('be.visible');
  });
});
