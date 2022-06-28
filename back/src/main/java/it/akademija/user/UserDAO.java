package it.akademija.user;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.akademija.role.Role;

public interface UserDAO extends JpaRepository<User, Long> {

	User findByUsername(String username);

	List<User> findByRole(Role role);

	void deleteByUsername(String username);

	@Query("SELECT new User(u.userId, u.role, u.username) FROM User u")
	Page<User> findAll(Pageable pageable);
	
	@Query(value="SELECT new it.akademija.user.UserInfo("
			+ "u.userId, "
			+ "u.name, "
			+ "u.surname, "
			+ "pd.personalCode, "
			+ "pd.address, "
			+ "pd.phone, "
			+ "u.email, "
			+ "u.username) "
			+ "FROM User u "
			+ "JOIN ParentDetails pd "
			+ "ON u.userId = pd.user.id "
			+ "WHERE u.username=?1", 
			nativeQuery = false)
	UserInfo getUserInfoByUsername(String currentUsername);
	
	@Query(value="SELECT new it.akademija.user.UserInfo("
			+ "u.userId, "
			+ "u.name, "
			+ "u.surname, "
			+ "pd.personalCode, "
			+ "pd.address, "
			+ "pd.phone, "
			+ "u.email, "
			+ "u.username) "
			+ "FROM User u "
			+ "JOIN ParentDetails pd "
			+ "ON u.userId = pd.user.id "
			+ "JOIN CompensationApplication ca "
			+ "ON u.userId = ca.mainGuardian.id "
			+ "WHERE ca.id=?1", 
			nativeQuery = false)
	UserInfo getUserInfoByCompensationApplicationId(Long id);
	
	@Query(value="SELECT new it.akademija.user.UserInfo("
			+ "u.userId, "
			+ "u.name, "
			+ "u.surname, "
			+ "pd.personalCode, "
			+ "pd.address, "
			+ "pd.phone, "
			+ "u.email, "
			+ "u.username) "
			+ "FROM User u "
			+ "JOIN ParentDetails pd "
			+ "ON u.userId = pd.user.id "
			+ "JOIN Application a "
			+ "ON u.userId = a.mainGuardian.id "
			+ "WHERE a.id=?1", 
			nativeQuery = false)
	UserInfo getUserInfoByApplicationId(Long id);
	
	@Query("SELECT new it.akademija.user.UserInfo("
		+ "u.userId, "
		+ "u.role, "
		+ "u.name, "
		+ "u.surname, "
		+ "u.username, "
		+ "u.email) "
		+ "FROM User u WHERE u.username LIKE(CONCAT('%', ?1, '%'))")
	Page<UserInfo> getPageOfUsers(Pageable pageable, String filter);

}
