package it.akademija.compensationApplication;

import java.time.LocalDate;

import it.akademija.application.ApplicationStatus;
import it.akademija.compensationApplication.childData.ChildDataInfo;
import it.akademija.compensationApplication.kindergartenData.KindergartenDataInfo;
import it.akademija.user.UserInfo;

public class CompensationApplicationInfo {
	
	private Long id;
	private LocalDate submitedAt;
	private ApplicationStatus applicationStatus;
	private LocalDate approvalDate;
	private KindergartenDataInfo kindergartenDataInfo;
	private UserInfo mainGuardianInfo;
	private ChildDataInfo childDataInfo;
	
	public CompensationApplicationInfo(Long id, 
			LocalDate submitedAt, 
			ApplicationStatus applicationStatus,
			LocalDate approvalDate) {
		super();
		this.id = id;
		this.submitedAt = submitedAt;
		this.applicationStatus = applicationStatus;
		this.approvalDate = approvalDate; 
	}
	
	
	public CompensationApplicationInfo() {
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalDate getSubmitedAt() {
		return submitedAt;
	}
	public void setSubmitedAt(LocalDate submitedAt) {
		this.submitedAt = submitedAt;
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
	
	public KindergartenDataInfo getKindergartenDataInfo() {
		return kindergartenDataInfo;
	}

	public void setKindergartenDataInfo(KindergartenDataInfo kindergartenDataInfo) {
		this.kindergartenDataInfo = kindergartenDataInfo;
	}

	public UserInfo getMainGuardianInfo() {
		return mainGuardianInfo;
	}

	public void setMainGuardianInfo(UserInfo mainGuardianInfo) {
		this.mainGuardianInfo = mainGuardianInfo;
	}

	public ChildDataInfo getChildDataInfo() {
		return childDataInfo;
	}

	public void setChildDataInfo(ChildDataInfo childDataInfo) {
		this.childDataInfo = childDataInfo;
	}

}
