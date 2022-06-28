package it.akademija.compensationApplication;

import java.time.LocalDate;

import it.akademija.application.ApplicationStatus;

public class CompensationApplicationInfoUser {
	
	private Long id;
	private ApplicationStatus applicationStatus;
	private LocalDate submitedAt;
    private String childName;
    private String childSurname;
    private String childPersonalCode;
    private String entityName; 
    
	public CompensationApplicationInfoUser() {
		super();
	}

	public CompensationApplicationInfoUser(Long id, ApplicationStatus applicationStatus, LocalDate submitedAt,
			String childName, String childSurname, String childPersonalCode, String entityName) {
		super();
		this.id = id;
		this.applicationStatus = applicationStatus;
		this.submitedAt = submitedAt;
		this.childName = childName;
		this.childSurname = childSurname;
		this.childPersonalCode = childPersonalCode;
		this.entityName = entityName;
	}

	
	public CompensationApplicationInfoUser(Long id, ApplicationStatus applicationStatus, LocalDate submitedAt,
			String childName, String childSurname, String entityName) {
		super();
		this.id = id;
		this.applicationStatus = applicationStatus;
		this.submitedAt = submitedAt;
		this.childName = childName;
		this.childSurname = childSurname;
		this.entityName = entityName;
	}

	public String getChildName() {
		return childName;
	}

	public void setChildName(String childName) {
		this.childName = childName;
	}

	public String getChildSurname() {
		return childSurname;
	}

	public void setChildSurname(String childSurname) {
		this.childSurname = childSurname;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public ApplicationStatus getApplicationStatus() {
		return applicationStatus;
	}

	public void setApplicationStatus(ApplicationStatus applicationStatus) {
		this.applicationStatus = applicationStatus;
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

	public String getChildPersonalCode() {
		return childPersonalCode;
	}

	public void setChildPersonalCode(String childPersonalCode) {
		this.childPersonalCode = childPersonalCode;
	}

	
}
