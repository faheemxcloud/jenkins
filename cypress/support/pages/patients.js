const patients = {
  qaEnvironment: () => cy.get("#flt-semantic-node-9"),
  startButton: () => cy.get('[aria-label="Start"]'),
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
    // patients.qaEnvironment().click();
    // patients.startButton().click();
    patients.adminText().should("be.visible");
    patients.patientsTab().eq(8).click({ force: true });
    patients.patientsText().should("be.visible");
  },
};

function addPatients(data) {
  patients.redirectsToPatientsPage();
  patients.addNewPatientsButton().should("be.visible");
  patients.addNewPatientsButton().click();
  patients.patientsFirstNameField().type(data.firstName, { force: true });
  patients.patientMiddleNameField().type(data.middleName, { force: true });
  patients.patientsLastNameField().type(data.lastName, { force: true });

  cy.selectDateInCalendar("1980", "01", "01");
  patients.okButton().click({ force: true });

  patients.administrativeSex().click({ force: true });
  patients.selectedGender().click({ force: true });
  patients.genderIdentity().click({ force: true });
  patients.selectedGender().click({ force: true });
  patients
    .medicalRecordNumber()
    .type(data.medicalRecordNumber, { force: true });
  patients.scrollScreen().scrollIntoView({ duration: 500 }).wait(1000);
  patients.patientEmailAddress().type(data.emailAddress, { force: true });
  patients.patientPhoneNumber().type(data.PhoneNumber, { force: true });
}
export default {
  patients,
  addPatients,
};
