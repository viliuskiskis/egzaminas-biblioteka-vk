package it.akademija.initializeData;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import it.akademija.user.UserDAO;
import it.akademija.user.UserDTO;
import it.akademija.user.UserService;

@Component
public class UsersInit {

    @Autowired
    UserService userService;
    
    @Autowired
    UserDAO userDAO;

    /**
     * Initialize user data
     * 
     * @throws IOException
     */
    @PostConstruct
    public void uploadUsersData() throws IOException {
	
//	if (userDAO.findAll().size() < 10) {
//	    ClassLoader classLoader = getClass().getClassLoader();
//	    InputStream inputStream = classLoader.getResourceAsStream("initial_data/users_data.txt");
//
//	    try (BufferedReader reader = new BufferedReader(
//		    new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
//		String line;
//		line = reader.readLine(); // Skip first line
//
//		while ((line = reader.readLine()) != null) {
//		    String[] data = line.split(";");
//		    UserDTO userDto = new UserDTO();
//		    userDto.setRole("USER");
//		    userDto.setName(data[0]);
//		    userDto.setSurname(data[1]);
//		    userDto.setPersonalCode(data[2]);
//		    userDto.setAddress(data[3]);
//		    userDto.setPhone(data[4]);
//		    userDto.setEmail(data[5]);
//		    userDto.setUsername(data[5]);
//		    userDto.setPassword(data[5]);
//
//		    userService.createUser(userDto);
//		}
//	    }
//	}
    }
}
