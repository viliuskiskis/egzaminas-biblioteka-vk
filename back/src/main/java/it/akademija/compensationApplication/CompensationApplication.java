package it.akademija.compensationApplication;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.springframework.format.annotation.DateTimeFormat;

import it.akademija.application.ApplicationStatus;
import it.akademija.compensationApplication.childData.ChildData;
import it.akademija.compensationApplication.kindergartenData.KindergartenData;
import it.akademija.user.User;

@Entity
public class CompensationApplication {

    @Id
    @Column(name = "compensation_application_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
    @JoinColumn(name = "user_id")
    private User mainGuardian;

    @OneToOne(mappedBy = "compensationApplication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private KindergartenData kindergartenData;

    @OneToOne(mappedBy = "compensationApplication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ChildData childData;

    @Column(name = "date_of_submition")
    private LocalDate submitedAt;

    private ApplicationStatus applicationStatus;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate approvalDate;

    public CompensationApplication() {
    }

    public CompensationApplication(ChildData childData, KindergartenData kindergartenData) {
	super();
	this.childData = childData;
	this.kindergartenData = kindergartenData;
    }

    public CompensationApplication(Long id, ChildData childData, KindergartenData kindergartenData) {
	super();
	this.id = id;
	this.childData = childData;
	this.kindergartenData = kindergartenData;
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

    public ChildData getChildData() {
	return childData;
    }

    public void setChildData(ChildData childData) {
	this.childData = childData;
    }

    public LocalDate getApprovalDate() {
	return approvalDate;
    }

    public void setApprovalDate(LocalDate approvalDate) {
	this.approvalDate = approvalDate;
    }

    public KindergartenData getKindergartenData() {
	return kindergartenData;
    }

    public void setKindergartenData(KindergartenData kindergartenData) {
	this.kindergartenData = kindergartenData;
    }

    @Override
    public String toString() {
	return "CompensationApplication [id=" + id + ", mainGuardian=" + mainGuardian + ", submitedAt=" + submitedAt
		+ ", applicationStatus=" + applicationStatus + "]";
    }

    @Override
    public int hashCode() {
	return Objects.hash(applicationStatus, approvalDate, childData, id, submitedAt);
    }

    @Override
    public boolean equals(Object obj) {
	if (this == obj)
	    return true;
	if (obj == null)
	    return false;
	if (getClass() != obj.getClass())
	    return false;
	CompensationApplication other = (CompensationApplication) obj;
	return applicationStatus == other.applicationStatus && Objects.equals(approvalDate, other.approvalDate)
		&& Objects.equals(childData, other.childData) && Objects.equals(id, other.id)
		&& Objects.equals(submitedAt, other.submitedAt);
    }

}
