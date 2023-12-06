import Admin from "../support/pages/admin.PO.js";

// let data = null;
describe("login", () => {
  beforeEach(() => {
    // cy.fixture("testData.json").then(function (_data) {
    //   data = _data;
    // });

    cy.bypassLogin("/#/admin");
    cy.get("flt-glass-pane").shadow().find("flt-semantics-placeholder", { timeout: 30000 }).click({ force: true });
  });

  it("Add User", () => {
    Admin.cancelUserCreation();
    // Admin.addUser();
  });

  // it("Verify Added User", () => {
  //   Admin.verifyAddedUser();
  // });

  // it("Edit The Added User", () => {
  //   Admin.editUser();
  // });

  // it("Reset Password From Edit User Screen", () => {
  //   Admin.resetpasswordFromEditUser();
  // });

  // it("Deactivate User From Edit User Screen", () => {
  //   Admin.deactivateUserFromEditUser();
  // });

  // it("Verify The Edited User", () => {
  //   Admin.verifyEditedUser();
  // });

  // it("Enable The Added User", () => {
  //   Admin.enableUser();
  // });

  // it("Deactivate Added User", () => {
  //   Admin.deactivateUser();
  // });

  // it("Reset Password Of The Added User", () => {
  //   Admin.resetPassword();
  // });

  //   it("add user", () => {
  //     Admin.filters();
  //   });
});
