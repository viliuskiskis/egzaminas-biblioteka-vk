package it.akademija.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.user.User;
import it.akademija.user.UserDAO;

@Component
public class DatabaseUserDetailPasswordService implements UserDetailsPasswordService {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private UserDAO userDao;

	
	public DatabaseUserDetailPasswordService(UserDetailsService userDetailsService, UserDAO userDAO) {
		this.userDetailsService = userDetailsService;
		this.userDao = userDAO;
	}
	
	@Override
	public UserDetails updatePassword(UserDetails userDetails, String newPassword) {

		User user = userDao.findByUsername(userDetails.getUsername());
		user.setPassword(newPassword);
		userDao.saveAndFlush(user);

		return this.userDetailsService.loadUserByUsername(user.getUsername());
	}

}
