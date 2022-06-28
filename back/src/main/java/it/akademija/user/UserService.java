package it.akademija.user;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.application.Application;
import it.akademija.application.ApplicationService;
import it.akademija.document.DocumentDAO;
import it.akademija.journal.JournalService;
import it.akademija.role.Role;
import it.akademija.user.passwordresetrequests.UserPasswordResetRequestsDAO;
import it.akademija.user.passwordresetrequests.UserPasswordResetRequestsEntity;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserDAO userDao;

	@Autowired
	private ApplicationService applicationService; 

	@Autowired
	private UserPasswordResetRequestsDAO userPasswordResetRequestsDAO;

	@Autowired		
	private PasswordEncoder passwordEncoder;

	@Autowired
	DocumentDAO documentDao;

	@Autowired
	JournalService journalService;

	@Autowired
	@Lazy
	private SessionRegistry sessionRegistry;
	
	/**
	 * Finds User by username
	 * 
	 * @param id
	 */
	public User getUserByUsername(String username) {
		return userDao.findByUsername(username);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = findByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException(username + " not found.");
		} else {
			return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
					AuthorityUtils.createAuthorityList(new String[] { "ROLE_" + user.getRole().toString() }));
		}
	}

	/**
	 * Create new user with specified parameters. Deletes FirstUser "admin" which
	 * was initialized at start up if there are other users with ADMIN authorization
	 * in the user repository
	 * 
	 * @param userData data for new user
	 */
	@Transactional
	public void createUser(UserDTO userData) {
		User newUser = new User();

		/*
		 * if (userData.getRole().equals("USER")) { ParentDetails details = new
		 * ParentDetails();
		 * 
		 * details.setAddress(userData.getAddress());
		 * details.setEmail(userData.getEmail()); details.setName(userData.getName());
		 * details.setPersonalCode(userData.getPersonalCode());
		 * details.setPhone(userData.getPhone());
		 * details.setSurname(userData.getSurname());
		 * 
		 * newUser.setParentDetails(details); }
		 */

		newUser.setName(userData.getName());
		newUser.setSurname(userData.getSurname());
		newUser.setEmail(userData.getEmail());
		newUser.setRole(Role.valueOf(userData.getRole()));
		newUser.setUsername(userData.getUsername());
		newUser.setPassword(passwordEncoder.encode(userData.getUsername()));
		
		userDao.saveAndFlush(newUser);
	}

	/**
	 * 
	 * Delete user with a specified username. If user role equals USER, deletes
	 * associated Application and ParentDetails entries in the database and
	 * increases number of available places in approved Kindergarten if applicable.
	 * 
	 * @param username
	 */
	@Transactional
	public void deleteUser(String username) {

		User user = findByUsername(username);

		if (user.getRole().equals(Role.ADMIN) && userDao.findByRole(Role.ADMIN).size() == 1) {

			userDao.save(new User(Role.ADMIN, "admin", "admin", "admin@admin.lt", "admin@admin.lt",
					passwordEncoder.encode("admin@admin.lt")));

		} 
		
		if (user.getRole().equals(Role.USER)) {

			Set<Application> submittedApplications = user.getUserApplications();

			for (Application application : submittedApplications) {

				applicationService.detachAdditionalGuardian(application);
				applicationService.updateAvailablePlacesInKindergarten(application);
			}

			documentDao.deleteByUploaderId(user.getUserId());
		}

		expireSession(user);

		userDao.deleteByUsername(username);
	}

	/**
	 * 
	 * Expire session of logged in user if ADMIN deletes their account
	 * 
	 * @param user
	 */
	private void expireSession(User user) {

		List<Object> principals = sessionRegistry.getAllPrincipals();
		for (Object principal : principals) {
			UserDetails pUser = (UserDetails) principal;
			if (pUser.getUsername().equals(user.getUsername())) {
				for (SessionInformation activeSession : sessionRegistry.getAllSessions(principal, false)) {
					activeSession.expireNow();
				}
			}
		}
	}

	/**
	 * User can delete their own data. GDPR related functionality that deletes all
	 * user related entries from database.
	 */
	@Transactional
	public void deleteMyUserData() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		journalService.depersonalizeUserLogs(username);

		deleteUser(username);

	}

	/**
	 * Returns a page of registered Users info with specified page number,
	 * page size and username
	 * 
	 * @return list of user details for ADMIN
	 */
	@Transactional(readOnly = true)
	public Page<UserInfo> getAllUsers(Pageable pageable, String filter) {
	    
	    return userDao.getPageOfUsers(pageable, filter);
	}

	/**
	 * Returns details of specified user size
	 * 
	 * @return list of user details for ADMIN
	 * @param username
	 */
	@Transactional
	public UserInfo getUserDetails(String username) {
		User user = userDao.findByUsername(username);
		if (user.getRole().equals(Role.USER)) {
			return new UserInfo(user.getUserId(), user.getRole().name(), user.getName(), user.getSurname(),
					user.getParentDetails().getPersonalCode(), user.getParentDetails().getAddress(),
					user.getParentDetails().getPhone(), user.getEmail(), user.getUsername());

		}
		return new UserInfo(user.getUserId(), user.getRole().name(), user.getName(), user.getSurname(),
				user.getUsername(), user.getEmail());

	}

	/**
	 * 
	 * Finds user with a specified username. Don't return User entity via REST.
	 * 
	 * @param username
	 * @return User entity (includes sensitive data)
	 */
	@Transactional(readOnly = true)
	public User findByUsername(String username) {

		return userDao.findByUsername(username);
	}

	/**
	 * Restores user password to initial value for user with specified username.
	 * Initial password value equals to username
	 * 
	 * @param username
	 */
	@Transactional
	public void restorePassword(String username) {
		User user = findByUsername(username);
		userPasswordResetRequestsDAO.delete(new UserPasswordResetRequestsEntity(user.getUserId()));
		user.setPassword(passwordEncoder.encode(username));
		userDao.save(user);

	}

	/**
	 * Changes users password
	 * 
	 * @param username
	 * @param oldPassword
	 * @param newPassword
	 * @return true or false
	 */
	@Transactional
	public boolean changePassword(String username, String oldPassword, String newPassword) {
		User user = findByUsername(username);
		String currentPassword = user.getPassword();
		if (passwordEncoder.matches(oldPassword, currentPassword)) {
			user.setPassword(passwordEncoder.encode(newPassword));
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 
	 * Updates fields for user with specified username. Field for setting user role,
	 * password or username can not be updated. Any user can update their own data.
	 * 
	 * @param userData new user data
	 * @param username
	 * @return updated user
	 */
	@Transactional
	public User updateUserData(UserDTO userData, String username) {

		User user = findByUsername(username);

		if (user.getRole().equals(Role.USER)) {
			ParentDetails details = user.getParentDetails();
			details.setAddress(userData.getAddress());
			details.setPersonalCode(userData.getPersonalCode());
			details.setPhone(userData.getPhone());
			details.setEmail(userData.getEmail());
			details.setName(userData.getName());
			details.setSurname(userData.getSurname());
		}

		user.setName(userData.getName());
		user.setSurname(userData.getSurname());
		user.setEmail(userData.getEmail());

		return userDao.save(user);
	}

	/**
	 * 
	 * Returns all applications of specified user.
	 * 
	 * @param username
	 * @return user's applications
	 */

	@Transactional(readOnly = true)
	public Set<Application> getUserApplications(String currentUsername) {

		return userDao.findByUsername(currentUsername).getUserApplications();
	}
	
	/**
	 * 
	 * Returns information about logged in user.
	 * 
	 * @param username
	 * @return user information
	 */
	@Transactional(readOnly = true)
	public UserInfo getUserInfoByUsername(String currentUsername) {
		return userDao.getUserInfoByUsername(currentUsername);
	}

	/**
	 * 
	 * Returns information about user by compensation application id.
	 * 
	 * @param application id
	 * @return user information
	 */
	public UserInfo getUserInfoById(Long id) {
		return userDao.getUserInfoByCompensationApplicationId(id);
	}
	
	/**
	 * 
	 * Returns information about user by application id.
	 * 
	 * @param application id
	 * @return user information
	 */
	public UserInfo getUserInfoByApplicationId(Long id) {
		return userDao.getUserInfoByApplicationId(id);
	}

}
