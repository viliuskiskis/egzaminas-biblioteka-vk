package it.akademija.application;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.akademija.application.priorities.PrioritiesDTO;
import it.akademija.application.queue.ApplicationQueueInfo;
import it.akademija.contracts.ContractDetails;
import it.akademija.kindergartenchoise.KindergartenChoicesDTO;

public interface ApplicationDAO extends JpaRepository<Application, Long> {

    boolean existsApplicationByChildPersonalCode(String childPersonalCode);

    @Query("SELECT new it.akademija.application.ApplicationInfoUser("
	    + "a.id, "
	    + "a.childName, "
	    + "a.childSurname, "
	    + "a.submitedAt, "
	    + "k.name, "
	    + "a.status, "
	    + "a.numberInWaitingList) "
	    + "FROM Application a "
	    + "LEFT JOIN Kindergarten k ON a.approvedKindergarten.id=k.id "
	    + "WHERE a.mainGuardian.username=?1")
    Set<ApplicationInfoUser> findAllUserApplications(String currentUsername);

    @Query("SELECT new it.akademija.application.ApplicationInfo("
	    + "a.id, "
	    + "a.childPersonalCode, "
	    + "a.childName, "
	    + "a.childSurname, "
	    + "a.status, "
	    + "max(case when c.kindergartenChoisePriority ='1' then c.kindergarten.name end) as choise1, "
	    + "max(case when c.kindergartenChoisePriority ='2' then c.kindergarten.name end) as choise2, "
	    + "max(case when c.kindergartenChoisePriority ='3' then c.kindergarten.name end) as choise3, "
	    + "max(case when c.kindergartenChoisePriority ='4' then c.kindergarten.name end) as choise4, "
	    + "max(case when c.kindergartenChoisePriority ='5' then c.kindergarten.name end) as choise5) "
	    + "FROM Application a LEFT JOIN KindergartenChoise c ON a.id = c.application.id "
	    + "WHERE a.childPersonalCode LIKE(CONCAT('%', ?1, '%')) "
	    + "GROUP BY a.id")
    Page<ApplicationInfo> findAllApplications(Pageable pageable, String filter);

    @Query("SELECT a FROM Application a WHERE a.status=0 OR a.status=3")
    List<Application> findAllApplicationsWithStatusSubmitted();

    @Query("SELECT new it.akademija.application.queue.ApplicationQueueInfo("
	    + "a.id, "
	    + "a.childPersonalCode, "
	    + "a.childName, "
	    + "a.childSurname, "
	    + "k.name, a.status, "
	    + "a.numberInWaitingList) "
	    + "FROM Application a LEFT JOIN Kindergarten k ON a.approvedKindergarten.id=k.id "
	    + "WHERE a.childPersonalCode LIKE(CONCAT('%', ?1, '%'))")
    Page<ApplicationQueueInfo> findQueuedApplications(Pageable pageable, String filter);

    @Query("SELECT COUNT(a.id) "
	    + "FROM Application a "
	    + "WHERE a.status=0 "
	    + "AND a.approvedKindergarten=null "
	    + "AND a.numberInWaitingList=0")
    int findNumberOfUnprocessedApplications();
	
    @Query("SELECT new it.akademija.application.ApplicationDetails("
	    + "a.id, "
	    + "a.submitedAt, "
	    + "a.status, "
	    + "a.childName, "
	    + "a.childSurname, "
	    + "a.childPersonalCode, "
	    + "a.approvalDate, "
	    + "a.birthdate, "
	    + "a.numberInWaitingList, "
	    + "CONCAT(k.name, ' (', k.address, ')'), "
	    + "CONCAT(k.managerName, ' ', k.managerSurname)) "
	    + "FROM Application a "
	    + "LEFT JOIN Kindergarten k ON a.approvedKindergarten.id = k.id "
	    + "WHERE a.id=?1")
    ApplicationDetails getApplicationDetails(Long id);
	
    @Query("SELECT new it.akademija.kindergartenchoise.KindergartenChoicesDTO("
	    + "max(case when c.kindergartenChoisePriority = '1' then concat(c.kindergarten.name, ' (', c.kindergarten.address, ')') end) as kindergarten1, "
	    + "max(case when c.kindergartenChoisePriority = '2' then concat(c.kindergarten.name, ' (', c.kindergarten.address, ')') end) as kindergarten2, "
	    + "max(case when c.kindergartenChoisePriority = '3' then concat(c.kindergarten.name, ' (', c.kindergarten.address, ')') end) as kindergarten3, "
	    + "max(case when c.kindergartenChoisePriority = '4' then concat(c.kindergarten.name, ' (', c.kindergarten.address, ')') end) as kindergarten4, "
	    + "max(case when c.kindergartenChoisePriority = '5' then concat(c.kindergarten.name, ' (', c.kindergarten.address, ')') end) as kindergarten5) "
	    + "FROM Application a LEFT JOIN KindergartenChoise c ON a.id = c.application.id WHERE a.id=?1")
	KindergartenChoicesDTO getKindergartenChoicesByApplicationId(Long id);
	
    @Query("SELECT new it.akademija.application.priorities.PrioritiesDTO("
	    + "p.livesInVilnius, "
	    + "p.childIsAdopted, "
	    + "p.familyHasThreeOrMoreChildrenInSchools, "
	    + "p.guardianInSchool, "
	    + "p.guardianDisability, "
	    + "p.livesMoreThanTwoYears) "
	    + "FROM Application a LEFT JOIN Priorities p ON a.priorities.priorityId = p.priorityId "
	    + "WHERE a.id=?1")
    PrioritiesDTO getPrioritiesByApplicationId(Long id);
	
    @Query("SELECT new it.akademija.contracts.ContractDetails("
	    + "a.approvalDate, "
	    + "k.name, "
	    + "CONCAT(k.managerName, ' ', k.managerSurname), "
	    + "CONCAT(mg.name, ' ', mg.surname), "
	    + "pd.address, "
	    + "pd.phone, "
	    + "mg.email, "
	    + "CONCAT(ag.name, ' ', ag.surname), "
	    + "ag.address, "
	    + "ag.phone, "
	    + "ag.email, "
	    + "CONCAT(a.childName, ' ', a.childSurname)) "
	    + "FROM Application a "
	    + "LEFT JOIN Kindergarten k ON a.approvedKindergarten.id = k.id "
	    + "LEFT JOIN User mg ON a.mainGuardian.userId = mg.userId "
	    + "LEFT JOIN ParentDetails pd ON mg.parentDetails.parentDetailsId = pd.parentDetailsId "
	    + "LEFT JOIN ParentDetails ag ON a.additionalGuardian.parentDetailsId = ag.parentDetailsId "
	    + "WHERE a.id=?1")
    ContractDetails getContractDetailsByApplicationId(Long id);
}
