package it.akademija.compensationApplication;

import java.time.LocalDate;

import it.akademija.application.ApplicationStatus;
import it.akademija.compensationApplication.kindergartenData.KindergartenDataDTO;
import it.akademija.user.UserDTO;

public class CompensationApplicationDTO {
	
	private Long id;
	private LocalDate birthdate;
	private String childName;
	private String childPersonalCode;
	private String childSurname;
	private KindergartenDataDTO kindergartenData;
	private UserDTO mainGuardian;
	private ApplicationStatus applicationStatus;
	private LocalDate approvalDate;
	
	public CompensationApplicationDTO() {
		super();
	}
	
	public CompensationApplicationDTO(
			Long id, 
			LocalDate birthdate, 
			String childName, 
			String childPersonalCode, 
			String childSurname,
			KindergartenDataDTO kindergartenData, 
			UserDTO mainGuardian) {
		super();
		this.id = id;
		this.birthdate = birthdate;
		this.childName = childName;
		this.childPersonalCode = childPersonalCode;
		this.childSurname = childSurname;
		this.kindergartenData = kindergartenData;
		this.mainGuardian = mainGuardian;
	}
	
	public CompensationApplicationDTO( 
			LocalDate birthdate, 
			String childName, 
			String childPersonalCode, 
			String childSurname,
			KindergartenDataDTO kindergartenData, 
			UserDTO mainGuardian) {
		super();
		this.birthdate = birthdate;
		this.childName = childName;
		this.childPersonalCode = childPersonalCode;
		this.childSurname = childSurname;
		this.kindergartenData = kindergartenData;
		this.mainGuardian = mainGuardian;
	}

	public CompensationApplicationDTO(
			LocalDate birthdate, 
			String childName, 
			String childPersonalCode,
			String childSurname, 
			KindergartenDataDTO kindergartenData, 
			UserDTO mainGuardian,
			ApplicationStatus applicationStatus, 
			LocalDate approvalDate) {
		super();
		this.birthdate = birthdate;
		this.childName = childName;
		this.childPersonalCode = childPersonalCode;
		this.childSurname = childSurname;
		this.kindergartenData = kindergartenData;
		this.mainGuardian = mainGuardian;
		this.applicationStatus = applicationStatus;
		this.approvalDate = approvalDate;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public ApplicationStatus getApplicationStatus() {
		return applicationStatus;
	}

	public void setApplicationStatus(ApplicationStatus applicationStatus) {
		this.applicationStatus = applicationStatus;
	}

	public LocalDate getApprovalDate() {
		return approvalDate;
	}

	public void setApprovalDate(LocalDate approvalDate) {
		this.approvalDate = approvalDate;
	}

	public UserDTO getMainGuardian() {
		return mainGuardian;
	}

	public void setMainGuardian(UserDTO mainGuardian) {
		this.mainGuardian = mainGuardian;
	}

	public LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	public String getChildName() {
		return childName;
	}

	public void setChildName(String childName) {
		this.childName = childName;
	}

	public String getChildPersonalCode() {
		return childPersonalCode;
	}

	public void setChildPersonalCode(String childPersonalCode) {
		this.childPersonalCode = childPersonalCode;
	}

	public String getChildSurname() {
		return childSurname;
	}

	public void setChildSurname(String childSurname) {
		this.childSurname = childSurname;
	}

	public KindergartenDataDTO getKindergartenData() {
		return kindergartenData;
	}

	public void setKindergartenData(KindergartenDataDTO kindergartenData) {
		this.kindergartenData = kindergartenData;
	}

	@Override
	public String toString() {
		return "CompensationApplicationDTO [birthdate=" + birthdate + ", childName=" + childName
				+ ", childPersonalCode=" + childPersonalCode + ", childSurname=" + childSurname
				+ ", kindergartenDataDTO=" + kindergartenData + ", mainGuardian=" + mainGuardian + "]";
	}

	

	
}