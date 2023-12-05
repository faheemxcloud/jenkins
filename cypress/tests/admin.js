import Admin from "../support/pages/admin.js";
let data = null;
describe("login", () => {
  beforeEach(() => {
    cy.fixture("testData.json").then(function (_data) {
      data = _data;
    });

    cy.bypassLogin("/#/admin");
    cy.get("flt-glass-pane")
      .shadow()
      .find("flt-semantics-placeholder", { timeout: 30000 })
      .click({ force: true });
  });

  it("add user", () => {
    Admin.cancelUserCreation();
    Admin.addUser();
  });
  //   it("verify added user", () => {
  //     Admin.verifyAddedUser();
  //   });
  //   it("edit the added user", () => {
  //     Admin.editUser();
  //   });
  //   it("reset password from edit user screen", () => {
  //     Admin.resetpasswordFromEditUser();
  //   });
  //   it("verify the edited user", () => {
  //     Admin.verifyEditedUser();
  //   });
  //   it("deactivate added user", () => {
  //     Admin.deactivateUser();
  //   });
  //   it("deactivate added user", () => {
  //     Admin.enableUser();
  //   });

  //   it("reset password of the added user", () => {
  //     Admin.resetPassword();
  //   });
  //   it("add user", () => {
  //     Admin.filters();
  //   });
});
