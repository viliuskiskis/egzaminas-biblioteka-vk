package it.akademija.compensationApplication.childData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildDataDAO extends JpaRepository<ChildData, Long> {
	
	boolean existsChildDataByChildPersonalCode(String childPersonalCode);
	
	@Query(value = "SELECT new it.akademija.compensationApplication.childData.ChildDataInfo("
			+ "cd.birthdate, "
			+ "cd.childName, "
			+ "cd.childPersonalCode, "
			+ "cd.childSurname) "
			+ "FROM ChildData cd "
			+ "WHERE cd.compensationApplication.id = ?1", nativeQuery = false)
	ChildDataInfo getChildDataInfoByCompensationApplicationId(Long id);

	@Query(value = "SELECT cd "
			+ "FROM ChildData cd "
			+ "WHERE cd.compensationApplication.id=?1",
			nativeQuery = false)
	ChildData getChildDataByCompensationApplicationId(Long id);
}
