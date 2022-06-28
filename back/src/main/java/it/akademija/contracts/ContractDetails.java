package it.akademija.contracts;

import java.time.LocalDate;

public class ContractDetails {

    private LocalDate approvalDate;
    private String kindergartenName;
    private String kindergartenManagerName;
    private String mainGuardianName;
    private String mainGuardianAddress;
    private String mainGuardianPhone;
    private String mainGuardianEmail;
    private String additionalGuardianName;
    private String additionalGuardianAddress;
    private String additionalGuardianPhone;
    private String additionalGuardianEmail;
    private String childName;

    public ContractDetails() {
	super();
    }

    public ContractDetails(LocalDate approvalDate, String kindergartenName, String kindergartenManagerName,
	    String mainGuardianName, String mainGuardianAddress, String mainGuardianPhone, String mainGuardianEmail,
	    String additionalGuardianName, String additionalGuardianAddress, String additionalGuardianPhone,
	    String additionalGuardianEmail, String childName) {
	super();
	this.approvalDate = approvalDate;
	this.kindergartenName = kindergartenName;
	this.kindergartenManagerName = kindergartenManagerName;
	this.mainGuardianName = mainGuardianName;
	this.mainGuardianAddress = mainGuardianAddress;
	this.mainGuardianPhone = mainGuardianPhone;
	this.mainGuardianEmail = mainGuardianEmail;
	this.additionalGuardianName = additionalGuardianName;
	this.additionalGuardianAddress = additionalGuardianAddress;
	this.additionalGuardianPhone = additionalGuardianPhone;
	this.additionalGuardianEmail = additionalGuardianEmail;
	this.childName = childName;
    }

    public LocalDate getApprovalDate() {
	return approvalDate;
    }

    public void setApprovalDate(LocalDate approvalDate) {
	this.approvalDate = approvalDate;
    }

    public String getKindergartenName() {
	return kindergartenName;
    }

    public void setKindergartenName(String kindergartenName) {
	this.kindergartenName = kindergartenName;
    }

    public String getKindergartenManagerName() {
	return kindergartenManagerName;
    }

    public void setKindergartenManagerName(String kindergartenManagerName) {
	this.kindergartenManagerName = kindergartenManagerName;
    }

    public String getMainGuardianName() {
	return mainGuardianName;
    }

    public void setMainGuardianName(String mainGuardianName) {
	this.mainGuardianName = mainGuardianName;
    }

    public String getMainGuardianAddress() {
	return mainGuardianAddress;
    }

    public void setMainGuardianAddress(String mainGuardianAddress) {
	this.mainGuardianAddress = mainGuardianAddress;
    }

    public String getMainGuardianPhone() {
	return mainGuardianPhone;
    }

    public void setMainGuardianPhone(String mainGuardianPhone) {
	this.mainGuardianPhone = mainGuardianPhone;
    }

    public String getMainGuardianEmail() {
	return mainGuardianEmail;
    }

    public void setMainGuardianEmail(String mainGuardianEmail) {
	this.mainGuardianEmail = mainGuardianEmail;
    }

    public String getAdditionalGuardianName() {
	return additionalGuardianName;
    }

    public void setAdditionalGuardianName(String additionalGuardianName) {
	this.additionalGuardianName = additionalGuardianName;
    }

    public String getAdditionalGuardianAddress() {
	return additionalGuardianAddress;
    }

    public void setAdditionalGuardianAddress(String additionalGuardianAddress) {
	this.additionalGuardianAddress = additionalGuardianAddress;
    }

    public String getAdditionalGuardianPhone() {
	return additionalGuardianPhone;
    }

    public void setAdditionalGuardianPhone(String additionalGuardianPhone) {
	this.additionalGuardianPhone = additionalGuardianPhone;
    }

    public String getAdditionalGuardianEmail() {
	return additionalGuardianEmail;
    }

    public void setAdditionalGuardianEmail(String additionalGuardianEmail) {
	this.additionalGuardianEmail = additionalGuardianEmail;
    }

    public String getChildName() {
	return childName;
    }

    public void setChildName(String childName) {
	this.childName = childName;
    }

}
