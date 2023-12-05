import Patients from "../support/pages/patients";
let data = null;
describe("login", () => {
  before(() => {
    cy.fixture("testData.json").then(function (_data) {
      data = _data;
    });
    cy.bypassLogin();
    cy.get("flt-glass-pane")
      .shadow()
      .find("flt-semantics-placeholder", { timeout: 30000 })
      .click({ force: true });
  });

  it("add user.", () => {
    Patients.addPatients(data.addPatient);
  });
  it("login", () => {
    console.log("test");
  });
});
