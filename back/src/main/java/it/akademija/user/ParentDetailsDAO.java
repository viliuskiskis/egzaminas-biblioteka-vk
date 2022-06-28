package it.akademija.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ParentDetailsDAO extends JpaRepository<ParentDetails, String> {

	ParentDetails findByPersonalCode(String personalCode);
	
	@Query("SELECT new it.akademija.user.ParentDetailsDTO("
		+ "d.personalCode, "
		+ "d.name, "
		+ "d.surname, "
		+ "d.email, "
		+ "d.address, "
		+ "d.phone) "
		+ "FROM Application a LEFT JOIN ParentDetails d ON "
		+ "a.additionalGuardian.parentDetailsId = d.parentDetailsId "
		+ "WHERE a.id=?1")
	ParentDetailsDTO getParentDetailsByApplicationId(Long id);

}
