package it.akademija.kindergartenchoise;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface KindergartenChoiseDAO extends JpaRepository<KindergartenChoise, Long> {
	
	
	@Query("SELECT kc FROM KindergartenChoise kc WHERE kc.choiseId=?1 AND kc.application.id=?2")
	KindergartenChoise getKindergartenChoise(String kindergartenId, Long applicationId);

}
