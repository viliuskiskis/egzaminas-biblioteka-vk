
package it.akademija.application;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.akademija.application.priorities.Priorities;
import it.akademija.kindergarten.Kindergarten;
import it.akademija.kindergartenchoise.KindergartenChoise;
import it.akademija.user.ParentDetails;
import it.akademija.user.User;

@Entity
public class Application {

    @Id
    @Column(name = "application_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "date_of_submition")
    LocalDate submitedAt;

    private ApplicationStatus status;

    @NotEmpty(message = "Vardas privalomas!")
    @Pattern(regexp = "^[A-zÀ-ž\\s-]{2,32}")
    private String childName;

    @NotEmpty(message = "Pavardė privaloma!")
    @Pattern(regexp = "^[A-zÀ-ž\\s-]{2,32}")
    private String childSurname;

    @Pattern(regexp = "[56][12][0-9][01][0-9][0-3][0-9]{5}")
    private String childPersonalCode;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthdate;

    private int priorityScore;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "priorities_id")
    @JsonIgnore
    private Priorities priorities;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
    @JoinColumn(name = "user_id")
    private User mainGuardian;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
    @JoinColumn(name = "additional_guardian_id")
    private ParentDetails additionalGuardian;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<KindergartenChoise> kindergartenChoises;

    private int numberInWaitingList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_kindergarten_id", nullable = true)
    private Kindergarten approvedKindergarten;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate approvalDate;

    public Application() {

    }

    public Application(String childName, String childSurname, String childPersonalCode, LocalDate birthdate,
	    User mainGuardian, ParentDetails additionalGuardian) {

	this.childName = childName;
	this.childSurname = childSurname;
	this.childPersonalCode = childPersonalCode;
	this.birthdate = birthdate;
	this.mainGuardian = mainGuardian;
	this.additionalGuardian = additionalGuardian;
    }

    /**
     * 
     * Get child's age for this calendar year
     * 
     * @param birthdate
     * @return
     */
    public long calculateAgeInYears() {

	int thisYear = LocalDate.now()
				.getYear();
	LocalDate endOfYear = LocalDate.of(thisYear, 12, 31);
	return ChronoUnit.YEARS.between(this.birthdate, endOfYear);
    }

    public ApplicationStatus getStatus() {
	return status;
    }

    public void setStatus(ApplicationStatus status) {
	this.status = status;
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

    public String getChildPersonalCode() {
	return childPersonalCode;
    }

    public void setChildPersonalCode(String childPersonalCode) {
	this.childPersonalCode = childPersonalCode;
    }

    public LocalDate getBirthdate() {
	return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
	this.birthdate = birthdate;
    }

    public Set<KindergartenChoise> getKindergartenChoises() {
	return kindergartenChoises;
    }

    public void setKindergartenChoises(Set<KindergartenChoise> kindergartenChoises) {
	this.kindergartenChoises = kindergartenChoises;
    }

    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

    public User getMainGuardian() {
	return mainGuardian;
    }

    public void setMainGuardian(User mainGuardian) {
	this.mainGuardian = mainGuardian;
    }

    public ParentDetails getAdditionalGuardian() {
	return additionalGuardian;
    }

    public void setAdditionalGuardian(ParentDetails additionalGuardian) {
	this.additionalGuardian = additionalGuardian;
    }

    public LocalDate getSubmitedAt() {
	return submitedAt;
    }

    public void setSubmitedAt() {
	this.submitedAt = LocalDate.now();
    }

    public Priorities getPriorities() {
	return priorities;
    }

    public void setPriorities(Priorities priorities) {
	this.priorities = priorities;
	priorities.setApplication(this);
    }

    public int getPriorityScore() {
	return priorityScore;
    }

    public void setPriorityScore(int priorityScore) {
	this.priorityScore = priorityScore;
    }

    public Kindergarten getApprovedKindergarten() {
	return approvedKindergarten;
    }

    public void setApprovedKindergarten(Kindergarten approvedKindergarten) {
	this.approvedKindergarten = approvedKindergarten;
    }

    public int getNumberInWaitingList() {
	return numberInWaitingList;
    }

    public void setNumberInWaitingList(int numberInWaitingList) {
	this.numberInWaitingList = numberInWaitingList;
    }

    public LocalDate getApprovalDate() {
	return approvalDate;
    }

    public void setApprovalDate() {
	this.approvalDate = LocalDate.now();
    }

    @Override
    public int hashCode() {
	return Objects.hash(birthdate, childName, childPersonalCode, childSurname, id, submitedAt);
    }

    @Override
    public boolean equals(Object obj) {
	if (this == obj)
	    return true;
	if (obj == null)
	    return false;
	if (getClass() != obj.getClass())
	    return false;
	Application other = (Application) obj;
	return Objects.equals(birthdate, other.birthdate) && Objects.equals(childName, other.childName)
		&& Objects.equals(childPersonalCode, other.childPersonalCode)
		&& Objects.equals(childSurname, other.childSurname) && Objects.equals(id, other.id)
		&& Objects.equals(submitedAt, other.submitedAt);
    }

}
