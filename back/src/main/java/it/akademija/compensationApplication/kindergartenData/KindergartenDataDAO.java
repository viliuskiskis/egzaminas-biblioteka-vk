package it.akademija.compensationApplication.kindergartenData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface KindergartenDataDAO extends JpaRepository<KindergartenData, Long> {
	
	@Query(value="SELECT new it.akademija.compensationApplication.kindergartenData.KindergartenDataInfo("
			+ "kd.entityName, "
			+ "kd.code, "
			+ "kd.phone, "
			+ "kd.email, "
			+ "kd.address, "
			+ "kd.account, "
			+ "kd.bankCode, "
			+ "kd.bankName) "
			+ "FROM KindergartenData kd "
			+ "WHERE kd.compensationApplication.id=?1")
	KindergartenDataInfo getByCompensationApplication(Long id);


}
