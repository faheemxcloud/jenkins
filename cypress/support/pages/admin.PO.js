import { faker } from "@faker-js/faker";
// const lastName = "Gracie";
// const firstName = "Schoen";
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = firstName + lastName + "@swiftmedical.com";
const phone = faker.number.int({ min: 1e14, max: 9e14 - 1 });

const adminUser = {
  qaEnvironment: () => cy.get('[role="radio"]'),
  startButton: () => cy.get('[aria-label="Start"]'),
  adminText: () => cy.get('[aria-label="Admin"]'),
  patientsTab: () => cy.get("#flt-semantic-node-25"),
  patientsText: () => cy.get("#flt-semantic-node-44"),
  adminLabel: () => cy.get('[aria-label="Admin"]'),
  createUserButton: () => cy.get('[aria-label="CREATE USER"]'),
  cancelButton: () => cy.get('[aria-label="Cancel"]'),
  phoneInputField: () => cy.get('[aria-label="Enter Phone Number (Username)"]'),
  firstNameInputField: () => cy.get('[aria-label="Enter First Name"]'),
  lastNameInputField: () => cy.get('[aria-label="Enter Last Name"]'),
  emailInputField: () => cy.get('[aria-label="Enter Email (Username)"]'),
  roleDropdown: () => cy.get('[aria-label="Select Role"]'),
  location: () => cy.get('[aria-label="Select Location"]'),
  roleType: () => cy.get('[aria-label="Tier 2 User"]'),
  updatedRoleType: () => cy.get('[aria-label="Tier 3 User"]'),
  locationType: () => cy.get("[role='checkbox']"),
  defaultLocationType: () => cy.get('[aria-label="IdentityOrg1LOC1"]'),
  closeLocationField: () => cy.get('[aria-label="IdentityOrg1LOC1 "]'),
  credentials: () => cy.get('[aria-label="Select Credentials"]'),
  credentialsType: () => cy.get('[aria-label="Certified Medical Assistant"]'),
  updatedCredentialsType: () => cy.get('[aria-label="Wound Technology Assistant"]'),
  subLocationType: () => cy.get('[aria-label="IdentityOrg1LOC1SUB1"]'),
  saveButton: () => cy.get('[aria-label="Save"]'),
  searchField: () => cy.get('[aria-label="Search"]'),
  listedUser: name => cy.get(`[aria-label="${name}"]`),
  scrollScreen: () => cy.get("flt-semantics-scroll-overflow"),
  editButton: () => cy.get('[role="button"]'),
  editedTextFields: () => cy.get('[data-semantics-role="text-field"]'),
  editedDropdowns: () => cy.get('[role="text"]'),
  filterButton: () => cy.get('[aria-label="Filters"]'),
  userInformationTitle: () => cy.get('[aria-label="USER INFORMATION"]'),
  copyToClipBoardButton: () => cy.get('[aria-label="Copy to Clipboard"]'),
  dotButton: () => cy.get('[aria-label="Show menu"]'),
  deactivateUserButton: () => cy.get('[aria-label="DEACTIVATE USER"]'),
  popupDeactivateButton: () => cy.get('[aria-label="DEACTIVATE"]'),
  deactivateStatusButton: () => cy.get('[aria-label="Deactivated"]'),
  enableUserButton: () => cy.get('[aria-label="ENABLE USER"]'),
  popupEnableButton: () => cy.get('[aria-label="ENABLE"]'),
  enableStatusButton: () => cy.get('[aria-label="Active"]'),
  resetPasswordButton: () => cy.get('[aria-label="RESET PASSWORD"]'),
  popupContinueButton: () => cy.get('[aria-label="CONTINUE"]'),

  redirectsToAdminPage: () => {
    adminUser.qaEnvironment().eq(1).click();
    adminUser.startButton().click();
    adminUser.adminText().should("be.visible");
    // practitioner.patientsTab().click()
    // practitioner.patientsText().should("be.visible")
  },
};

const verifyUser = {
  firstName: () => cy.get(`flt-semantics[aria-label="${firstName}"]`),
  lastName: () => cy.get(`[aria-label="${lastName}"]`),
  email: () => cy.get(`[aria-label="${email}"]`),
  role: () => cy.get('[aria-label="T2U"]'),
  credentials: () => cy.get('[aria-label="CMA"]'),
  editedFirstName: () => cy.get(`[aria-label="new${firstName}"]`),
  editedLastName: () => cy.get(`[aria-label="new${lastName}"]`),
  editedRole: () => cy.get('[aria-label="T3U"]'),
  editedCredentials: () => cy.get('[aria-label="WTA"]'),
  userUpdatedSuccessMessage: () => cy.get(`[aria-label="${firstName} ${lastName} edited successfully"]`),
};

function cancelUserCreation() {
  adminUser.createUserButton().click({ force: true });
  adminUser.scrollScreen().scrollIntoView({ duration: 500 }).wait(1000);
  adminUser.cancelButton().click({ force: true });
}

function addUser() {
  adminUser.createUserButton().should("be.visible");
  adminUser.searchField().should("be.visible");
  adminUser.filterButton().should("be.visible");
  adminUser.createUserButton().click().wait(1000);
  adminUser.firstNameInputField().type(firstName, { force: true });
  adminUser.lastNameInputField().type(lastName, { force: true });
  adminUser.emailInputField().type(email, { force: true });
  adminUser.phoneInputField().type(phone, { force: true });
  adminUser.roleDropdown().click({ force: true });
  adminUser.roleType().click({ force: true }).wait(500);
  adminUser.scrollScreen().scrollIntoView({ duration: 400 }).wait(1000);
  adminUser.location().eq(0).click().wait(2000);
  adminUser.locationType().last().trigger("click").wait(1000);
  adminUser.closeLocationField().click({ force: true }).wait(1000);
  adminUser.location().eq(0).click({ force: true });
  adminUser.defaultLocationType().click({ force: true });
  adminUser.credentials().click({ force: true }).wait(1000);
  adminUser.credentialsType().click({ force: true }).wait(1000);
  adminUser.saveButton().click({ force: true });
  adminUser.copyToClipBoardButton().click();
}

function verifyAddedUser() {
  adminUser.searchField().type(firstName, { force: true, delay: 500 });
  verifyUser.firstName().should("exist");
  verifyUser.lastName().should("exist");
  verifyUser.email().should("exist");
  adminUser.scrollScreen().eq(1).scrollIntoView({ duration: 500 }).wait(500);
  verifyUser.role().should("be.visible");
  verifyUser.credentials().should("be.visible");
}

function editUser() {
  adminUser.searchField().type(firstName, { force: true, delay: 500 });
  adminUser.listedUser(firstName).should("be.visible");
  adminUser.scrollScreen().eq(1).scrollIntoView({ duration: 500 }).wait(500);
  adminUser.editButton().eq(2).click({ force: true });
  adminUser.userInformationTitle().should("be.visible");
  adminUser
    .editedTextFields()
    .eq(0)
    .clear({ force: true })
    .type("Updated" + email, { force: true });
  adminUser
    .editedTextFields()
    .eq(1)
    .clear({ force: true })
    .type("new" + firstName, { force: true });
  adminUser
    .editedTextFields()
    .eq(2)
    .clear({ force: true })
    .type("new" + lastName, { force: true });
  adminUser.scrollScreen().scrollIntoView({ duration: 500 }).wait(1000);
  adminUser.roleType().click({ force: true });
  adminUser.editedDropdowns().eq(1).click();
  adminUser.credentialsType().click({ force: true }).wait(1000);
  adminUser.scrollScreen().scrollIntoView({ duration: 500 }).wait(1000);
  adminUser.updatedCredentialsType().click();
  adminUser.saveButton().click({ force: true }).wait(1000);
  //   verifyUser.userUpdatedSuccessMessage().should("exist");
}

function verifyEditedUser() {
  adminUser.searchField().type("new" + firstName, { force: true, delay: 500 });
  verifyUser.editedFirstName().should("exist");
  verifyUser.editedLastName().should("exist");
  adminUser.scrollScreen().eq(1).scrollIntoView({ duration: 500 }).wait(500);
  verifyUser.editedRole().should("exist");
  verifyUser.editedCredentials().should("exist");
}

function resetpasswordFromEditUser() {
  adminUser.searchField().type("new" + firstName, { force: true, delay: 500 });
  adminUser.scrollScreen().eq(1).scrollIntoView({ duration: 500 }).wait(500);
  adminUser.editButton().eq(2).click({ force: true });
  adminUser.scrollScreen().scrollIntoView({ duration: 500 }).wait(1000);
  adminUser.resetPasswordButton().click();
  adminUser.popupContinueButton().click();
  adminUser.copyToClipBoardButton().click();
}

function deactivateUserFromEditUser() {
  adminUser.searchField().type("new" + firstName, { force: true, delay: 500 });
  adminUser.scrollScreen().eq(1).scrollIntoView({ duration: 500 }).wait(500);
  adminUser.editButton().eq(2).click({ force: true });
  adminUser.scrollScreen().scrollIntoView({ duration: 500 }).wait(1000);
  adminUser.deactivateUserButton().click();
  adminUser.popupDeactivateButton().click();
  adminUser.deactivateStatusButton().should("exist");
}

function deactivateUser() {
  adminUser.searchField().type("new" + firstName, { force: true, delay: 500 });
  adminUser.scrollScreen().eq(1).scrollIntoView({ duration: 500 }).wait(1000);
  adminUser.dotButton().click();
  adminUser.deactivateUserButton().click();
  adminUser.popupDeactivateButton().click();
  adminUser.deactivateStatusButton().should("exist");
}

function enableUser() {
  adminUser.searchField().type("new" + firstName, { force: true, delay: 500 });
  adminUser.scrollScreen().eq(1).scrollIntoView({ duration: 500 }).wait(1000);
  adminUser.dotButton().click();
  adminUser.enableUserButton().click();
  adminUser.popupEnableButton().click();
  adminUser.enableStatusButton().should("exist");
}

function filters() {
  adminUser.filterButton().click({ force: true });
  cy.get('[aria-label^="Show menu"]').eq(0).click().wait(10000);
  //   cy.get('flt-semantics[aria-label="Deactivated"]')
  //     .trigger("mouseover")
  //     .then(($element) => {
  //       console.log("Element:", $element);
  //     });

  //   cy.get('flt-semantics[aria-label="Deactivated"]')
  //     .click()
  //     .then(($element) => {
  //       console.log("Element clicked:", $element);
  //     });
  //   cy.get('flt-semantics[aria-label="Deactivated"]')
  //     .trigger("mouseover")
  //     .trigger("click");
  cy.get('[aria-label="Active"]').trigger("mouseover");
  cy.get('[role="checkbox"]').eq(0).click();
  //   cy.get('[aria-label="APPLY"]').click();
}

function resetPassword() {
  adminUser.searchField().type("new" + firstName, { force: true, delay: 500 });
  adminUser.scrollScreen().eq(1).scrollIntoView({ duration: 500 }).wait(1000);
  adminUser.dotButton().click();
  adminUser.resetPasswordButton().click();
  adminUser.popupContinueButton().click();
  adminUser.copyToClipBoardButton().click();
}
export default {
  adminUser,
  verifyUser,
  cancelUserCreation,
  addUser,
  verifyAddedUser,
  editUser,
  verifyEditedUser,
  resetpasswordFromEditUser,
  deactivateUserFromEditUser,
  deactivateUser,
  enableUser,
  resetPassword,
  filters,
};
