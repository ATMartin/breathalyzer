describe('Splash Page', () => {
  it('Loads the splash page', () => {
    cy.visit('https://gin-and-tonnies.herokuapp.com');
    cy.contains('SIGN IN');
    cy.contains('CREATE AN ACCOUNT');
  });

  it('Logs in and out of the demo user', () => {
    cy.visit('https://gin-and-tonnies.herokuapp.com');
    cy.contains('DEMO LOGIN').click();

    cy.url().should('include', '/drinks');
    cy.contains('Demo-lition');

    cy.contains('Log Out').click();
    cy.url().should('not.include', '/drinks');
  });
});

describe('Drinks Page', () => {
  beforeEach(() => {
    cy.visit('https://gin-and-tonnies.herokuapp.com');
    cy.contains('DEMO LOGIN').click();
    cy.url().should('include', '/drinks');
  });

  it('Lists drinks', () => {
    const drinksToMatch = ['Fizzy Bite Chiller', 'Naughty Angel Kiss'];
    drinksToMatch.forEach((drink) => cy.contains(drink));
  });

  it('Includes a "Learn More" link', () => {
    cy.get('button.learn-more-button').contains('Learn More');
  });

  it('Includes a "Create Drink" form', () => {
    const formWrapper = cy.get('#create-drink-container');
    formWrapper.get('input.create-drink-title');
    formWrapper.get('textarea.create-drink-content');
    formWrapper.get('input.create-drink-img');
    formWrapper.get('button.drink-create-button');
  });

  it('Includes the footer', () => {
    cy.contains('mixed with joy by jane martin');
  });
});

describe('Single Drink Page', () => {
  beforeEach(() => {
    cy.visit('https://gin-and-tonnies.herokuapp.com');
    cy.contains('DEMO LOGIN').click();
    cy.url().should('include', '/drinks');
    cy.contains('Learn More').click();
    cy.url().should('include', '/drinks/');
  });

  it('Shows drink info', () => {
    cy.get('h1#single-drink-title');
    cy.get('h2#single-drink-creator');
    cy.get('img.single-drink-img');
  });

  it('Shows reviews', () => {
    cy.get('h1#review-list-header');
    cy.get('img').filter('[src="/images/lime3.png"]').should('be.visible');
  });

  it('Includes the footer', () => {
    cy.contains('mixed with joy by jane martin');
  });
});

describe('Create Drink Page', () => {
  beforeEach(() => {
    cy.visit('https://gin-and-tonnies.herokuapp.com');
    cy.contains('DEMO LOGIN').click();
    cy.url().should('include', '/drinks');
    cy.contains('Create A Drink').click();
    cy.url().should('include', '/drinks/new');
  });

  it('Creates a new drink', () => {
    cy.get('input.create-drink-title').type('Demo-licious Test Drink');
    cy.get('textarea.create-drink-content').type('This is a test drink! If you\'re seeing this, the test or running (or something went wrong.');
    cy.get('input.create-drink-img').type('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/webcarmine-s-amaretto-sidecar-1571169801.jpg?crop=0.447xw:1.00xh;0.267xw,0&resize=480:*');
    cy.contains('Create new drink').click();
    cy.url().should('include', '/drinks/');
    cy.get('h1#single-drink-title').contains('Demo-licious Test Drink');
    cy.get('h2#single-drink-creator').contains('Demo-lition');
    cy.get('img.single-drink-img');
  });

  it('Includes the footer', () => {
    cy.contains('mixed with joy by jane martin');
  });
});

describe('Update Drink Page', () => {
  beforeEach(() => {
    cy.visit('https://gin-and-tonnies.herokuapp.com');
    cy.contains('DEMO LOGIN').click();
    cy.url().should('include', '/drinks');
    cy.contains('Demo-licious Test Drink').parent().contains('Learn More').click();
    cy.url().should('include', '/drinks/');
    cy.get('h1#single-drink-title').contains('Demo-licious Test Drink');
    cy.contains('Update This Drink').click();
  });

  it('Updates the drink', () => {
    cy.url().should('include', '/edit');
    cy.get('textarea.update-drink-content').type(' Here\'s an edit!');
    cy.contains('Update Drink').click();
    cy.url().should('not.include', '/edit');
    cy.contains('Here\'s an edit!');
  });

  it('Includes the footer', () => {
    cy.contains('mixed with joy by jane martin');
  });
});

describe('Review Drink Page', () => {
  beforeEach(() => {
    cy.visit('https://gin-and-tonnies.herokuapp.com');
    cy.contains('DEMO LOGIN').click();
    cy.url().should('include', '/drinks');
    cy.contains('Demo-licious Test Drink').parent().contains('Learn More').click();
    cy.url().should('include', '/drinks/');
    cy.get('h1#single-drink-title').contains('Demo-licious Test Drink');
    cy.contains('Review This Drink').click();
    cy.url().should('include', '/reviews/new');
  });

  it('Adds a review to the drink', () => {
    cy.get('input.create-review-rating').type('4');
    cy.get('textarea.create-review-content').type('Whoo, what a good drink! Needs a little more liquor though.');
    cy.contains('Create new review').click();
    cy.url().should('include', '/drinks/');
    cy.get('h1#review-list-header');
    cy.get('img').filter('[src="/images/lime3.png"]').should('have.length', 4);
    cy.contains('Whoo, what a good drink! Needs a little more liquor though.');
  });

  it('Includes the footer', () => {
    cy.contains('mixed with joy by jane martin');
  });
});

describe('Update Review Page', () => {
  beforeEach(() => {
    cy.visit('https://gin-and-tonnies.herokuapp.com');
    cy.contains('DEMO LOGIN').click();
    cy.url().should('include', '/drinks');
    cy.contains('Demo-licious Test Drink').parent().contains('Learn More').click();
    cy.url().should('include', '/drinks/');
    cy.get('h1#single-drink-title').contains('Demo-licious Test Drink');
    cy.contains('UPDATE THIS REVIEW').click();
    cy.url().should('include', '/edit');
  });

  it('Updates the review', () => {
    cy.get('input.edit-review-rating').clear().type('3');
    cy.get('textarea.edit-review-content').type('Here\'s a review edit!');
    cy.contains('Update Review').click();
    cy.url().should('include', '/drinks/');
    cy.get('img').filter('[src="/images/lime3.png"]').should('have.length', 3);
    cy.contains('Here\'s a review edit!');
  });

  it('Includes the footer', () => {
    cy.contains('mixed with joy by jane martin');
  });
});

describe('Delete Review', () => {
  beforeEach(() => {
    cy.visit('https://gin-and-tonnies.herokuapp.com');
    cy.contains('DEMO LOGIN').click();
    cy.url().should('include', '/drinks');
    cy.contains('Demo-licious Test Drink').parent().contains('Learn More').click();
    cy.url().should('include', '/drinks/');
    cy.get('h1#single-drink-title').contains('Demo-licious Test Drink');
    cy.contains('UPDATE THIS REVIEW').click();
    cy.url().should('include', '/edit');
  });

  it('Deletes the review', () => {
    cy.contains('Delete This Review').click();
    cy.url().should('include', '/drinks/');
    cy.get('img').filter('[src="/images/lime3.png"]').should('have.length', 0);
  });
});

describe('Delete Drink', () => {
  beforeEach(() => {
    cy.visit('https://gin-and-tonnies.herokuapp.com');
    cy.contains('DEMO LOGIN').click();
    cy.url().should('include', '/drinks');
    cy.contains('Demo-licious Test Drink').parent().contains('Learn More').click();
    cy.url().should('include', '/drinks/');
    cy.get('h1#single-drink-title').contains('Demo-licious Test Drink');
    cy.contains('Update This Drink').click();
  });

  it('Deletes the drink', () => {
    cy.contains('Delete This Drink').click();
    cy.url().should('include', '/drinks');
    cy.contains('Demo-licious Test Drink').should('not.exist');
  });
});
