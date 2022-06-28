package it.akademija.compensationApplication.childData;

import java.time.LocalDate;

public class ChildDataInfo {
	
	private LocalDate birthdate;
	private String childName;
	private String childPersonalCode;
	private String childSurname;
	
	public ChildDataInfo(LocalDate birthdate, 
			String childName, 
			String childPersonalCode, 
			String childSurname) {
		super();
		this.birthdate = birthdate;
		this.childName = childName;
		this.childPersonalCode = childPersonalCode;
		this.childSurname = childSurname;
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
	
	
}
