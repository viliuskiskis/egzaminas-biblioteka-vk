package it.akademija.initializeData;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import it.akademija.application.ApplicationDAO;
import it.akademija.application.ApplicationDTO;
import it.akademija.application.ApplicationService;
import it.akademija.application.priorities.PrioritiesDTO;
import it.akademija.kindergarten.Kindergarten;
import it.akademija.kindergarten.KindergartenDAO;
import it.akademija.kindergartenchoise.KindergartenChoiseDTO;
import it.akademija.user.ParentDetailsDTO;
import it.akademija.user.UserDTO;

@Component
@DependsOn({ "usersInit", "kindergartensInit" })
public class ApplicationsInit {

    @Autowired
    UsersInit usersInit;

    @Autowired
    KindergartensInit kindergartensInit;
    
    @Autowired
    KindergartenDAO kindergartenDAO;

    @Autowired
    ApplicationService applicationService;

    @Autowired
    ApplicationDAO applicationDAO;

    /**
     * Initialize applications data
     * 
     * @throws IOException
     */
    @PostConstruct
    public void uploadApplicationsData() throws IOException {

//	if (applicationDAO.findAll().size() < 10) {
//	    ClassLoader classLoader = getClass().getClassLoader();
//	    InputStream inputStream = classLoader.getResourceAsStream("initial_data/applications_data.txt");
//	    
//	    List<Kindergarten> kindergartenList = kindergartenDAO.findAll();
//	    Integer numberOfKindergartens = kindergartenList.size();
//	    Random random = new Random();
//
//	    try (BufferedReader reader = new BufferedReader(
//		    new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
//		String line;
//		line = reader.readLine(); // Skip first line
//
//		while ((line = reader.readLine()) != null) {
//		    String[] data = line.split(";",-1);
//		    ApplicationDTO applicationDTO = new ApplicationDTO();
//		    String username = data[7];
//		    applicationDTO.setChildName(data[0]);
//		    applicationDTO.setChildSurname(data[1]);
//		    applicationDTO.setChildPersonalCode(data[2]);
//		    applicationDTO.setBirthdate(LocalDate.parse(data[3]));
//		    PrioritiesDTO prioritiesDTO = new PrioritiesDTO(
//			    random.nextBoolean(), 
//			    random.nextBoolean(), 
//			    random.nextBoolean(), 
//			    random.nextBoolean(), 
//			    random.nextBoolean(), 
//			    random.nextBoolean());		
//		    applicationDTO.setPriorities(prioritiesDTO);
//		    UserDTO userDTO = new UserDTO();
//		    userDTO.setRole("USER");
//		    userDTO.setName(data[4]);
//		    userDTO.setSurname(data[5]);
//		    userDTO.setPersonalCode(data[6]);
//		    userDTO.setAddress(data[9]);
//		    userDTO.setPhone(data[8]);
//		    userDTO.setEmail(data[7]);
//		    userDTO.setUsername(data[7]);
//		    applicationDTO.setMainGuardian(userDTO);
//		    if (data[12] != null && data[12] != "") {
//			ParentDetailsDTO parentDetailsDTO = new ParentDetailsDTO();
//			parentDetailsDTO.setPersonalCode(data[12]);
//			parentDetailsDTO.setName(data[11]);
//			parentDetailsDTO.setSurname(data[10]);
//			parentDetailsDTO.setEmail(data[14]);
//			parentDetailsDTO.setAddress(data[15]);
//			parentDetailsDTO.setPhone(data[13]);
//			applicationDTO.setAdditionalGuardian(parentDetailsDTO);
//		    }
//		    KindergartenChoiseDTO kindergartenChoiseDTO = new KindergartenChoiseDTO();
//		    kindergartenChoiseDTO.setKindergartenId1(kindergartenList.get(random.nextInt(numberOfKindergartens)).getId());
//		    kindergartenChoiseDTO.setKindergartenId2(kindergartenList.get(random.nextInt(numberOfKindergartens)).getId());
//		    kindergartenChoiseDTO.setKindergartenId3(kindergartenList.get(random.nextInt(numberOfKindergartens)).getId());
//		    kindergartenChoiseDTO.setKindergartenId4(kindergartenList.get(random.nextInt(numberOfKindergartens)).getId());
//		    kindergartenChoiseDTO.setKindergartenId5(kindergartenList.get(random.nextInt(numberOfKindergartens)).getId());
//		    applicationDTO.setKindergartenChoises(kindergartenChoiseDTO);	
//
//		    applicationService.createNewApplication(username, applicationDTO);
//		}
//	    }
//	}
    }
}
