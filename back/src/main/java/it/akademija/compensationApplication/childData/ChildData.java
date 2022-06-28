package it.akademija.compensationApplication.childData;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import org.springframework.format.annotation.DateTimeFormat;

import it.akademija.compensationApplication.CompensationApplication;

@Entity
public class ChildData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "compensation_application_id")
    private CompensationApplication compensationApplication;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthdate;

    @NotEmpty(message = "Vardas privalomas!")
    // @Pattern(regexp = "^[A-zÀ-ž\\s-]{2,32}")
    @Column
    private String childName;

    @NotEmpty(message = "Pavardė privaloma!")
    // @Pattern(regexp = "^[A-zÀ-ž\\s-]{2,32}")
    @Column
    private String childSurname;

    @Pattern(regexp = "^(?!\\s*$)[0-9\\s]{11}$|")
    private String childPersonalCode;

    public ChildData() {
	super();
    }

    public ChildData(LocalDate birthdate, String childName, String childPersonalCode, String childSurname) {
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

    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

    public CompensationApplication getCompensationApplication() {
	return compensationApplication;
    }

    public void setCompensationApplication(CompensationApplication compensationApplication) {
	this.compensationApplication = compensationApplication;
    }

    @Override
    public int hashCode() {
	return Objects.hash(birthdate, childName, childPersonalCode, childSurname, id);
    }

    @Override
    public boolean equals(Object obj) {
	if (this == obj)
	    return true;
	if (obj == null)
	    return false;
	if (getClass() != obj.getClass())
	    return false;
	ChildData other = (ChildData) obj;
	return Objects.equals(birthdate, other.birthdate) && Objects.equals(childName, other.childName)
		&& Objects.equals(childPersonalCode, other.childPersonalCode)
		&& Objects.equals(childSurname, other.childSurname) && Objects.equals(id, other.id);
    }

}
