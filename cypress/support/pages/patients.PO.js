import { faker } from "@faker-js/faker";
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const middleName = faker.name.middleName();
const email = firstName + lastName + "@swiftmedical.com";
const medicalRecordNumber = faker.number.int();
const phoneNumber = faker.number.int({ min: 1e14, max: 9e14 - 1 });

const patients = {
  adminText: () => cy.get('[aria-label="Admin"]'),
  patientsTab: () => cy.get('flt-semantics[id^="flt-semantic-node-"]'),
  patientsText: () => cy.get('[aria-label="Patients"]'),
  addNewPatientsButton: () => cy.get('[aria-label="Add new patient"]'),
  patientsFirstNameField: () => cy.get('[aria-label="Enter First Name"]'),
  patientMiddleNameField: () => cy.get('[aria-label="Enter Middle Name"]'),
  patientsLastNameField: () => cy.get('[aria-label="Enter Last Name"]'),
  dateOfBirth: () => cy.get('[aria-label="Select Date"]'),
  okButton: () => cy.get('[aria-label="OK"]'),
  administrativeSex: () => cy.get('[aria-label="Enter Administrative Sex"]'),
  genderIdentity: () => cy.get('[aria-label="Enter Gender Identity"]'),
  selectedGender: () => cy.get('[aria-label="Male"]'),
  medicalRecordNumber: () => cy.get('[aria-label="Enter MRN"]'),
  scrollScreen: () => cy.get("flt-semantics-scroll-overflow"),
  patientEmailAddress: () => cy.get('[aria-label="Email Address"]'),
  patientPhoneNumber: () => cy.get('[aria-label="123-456-7890"]'),

  redirectsToPatientsPage: () => {
    patients.adminText().should("be.visible");
    patients.patientsTab().eq(8).click({ force: true });
    patients.patientsText().should("be.visible");
  },
};

function addPatients(data) {
  patients.redirectsToPatientsPage();
  patients.addNewPatientsButton().should("be.visible");
  patients.addNewPatientsButton().click();
  patients.patientsFirstNameField().type(firstName, { force: true });
  patients.patientMiddleNameField().type(middleName, { force: true });
  patients.patientsLastNameField().type(lastName, { force: true });

  cy.selectDateInCalendar("1980", "01", "01");
  patients.okButton().click({ force: true });

  patients.administrativeSex().click({ force: true });
  patients.selectedGender().click({ force: true });
  patients.genderIdentity().click({ force: true });
  patients.selectedGender().click({ force: true });
  patients.medicalRecordNumber().type(medicalRecordNumber, { force: true });
  patients.scrollScreen().scrollIntoView({ duration: 500 }).wait(1000);
  patients.patientEmailAddress().type(email, { force: true });
  patients.patientPhoneNumber().type(phoneNumber, { force: true });
}
export default {
  patients,
  addPatients,
};
