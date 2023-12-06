import Patients from "../support/pages/patients.PO";
// let data = null;
describe("login", () => {
  before(() => {
    // cy.fixture("testData.json").then(function (_data) {
    //   data = _data;
    // });
    cy.bypassLogin("/#/admin");
    cy.get("flt-glass-pane").shadow().find("flt-semantics-placeholder", { timeout: 30000 }).click({ force: true });
  });

  it("Add New Patient", () => {
    Patients.addPatients();
  });
});
