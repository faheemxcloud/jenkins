Cypress.Commands.add("selectDateInCalendar", (year, month, day) => {
  cy.get('[aria-label="Select Date"]').click({ force: true }).wait(500); // Assuming clicking opens the calendar
  cy.get(`[aria-label="Switch to input"]`).click({ force: true }).wait(500);
  cy.get(`[aria-label="Enter Date"]`).type(month + "/" + day + "/" + year);
});

Cypress.Commands.add("bypassLogin", (url = "") => {
  Cypress.on("uncaught:exception", err => {
    // returning false here prevents Cypress from
    // failing the test
    console.log("Cypress detected uncaught exception: ", err);
    return false;
  });
  window.localStorage.setItem("flutter.PREF_AZURE_ACCESS_TOKEN", JSON.stringify(Cypress.env("accessToken")));
  cy.visit(url);
  cy.wait(100000);
});
