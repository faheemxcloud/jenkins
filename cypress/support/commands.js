// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("selectDateInCalendar", (year, month, day) => {
  cy.get('[aria-label="Select Date"]').click({ force: true }).wait(500); // Assuming clicking opens the calendar
  cy.get(`[aria-label="Switch to input"]`).click({ force: true }).wait(500);
  cy.get(`[aria-label="Enter Date"]`).type(month + "/" + day + "/" + year);
});

Cypress.Commands.add("bypassLogin", (url = "") => {
  Cypress.on("uncaught:exception", (err) => {
    // returning false here prevents Cypress from
    // failing the test
    console.log("Cypress detected uncaught exception: ", err);
    return false;
  });
  window.localStorage.setItem(
    "flutter.PREF_AZURE_ACCESS_TOKEN",
    JSON.stringify(Cypress.env("accessToken"))
  );
  cy.visit(url);
  cy.wait(10000);
});
