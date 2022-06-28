package it.akademija.initializeData;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Random;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import it.akademija.kindergarten.Kindergarten;
import it.akademija.kindergarten.KindergartenDAO;

@Component
public class KindergartensInit {
    
    @Autowired
    KindergartenDAO kindergartenDAO;
    
  /**
   * Initialize kindergartens data
   * 
   * @throws IOException
   */
    @PostConstruct
    public void uploadKindergartensData() throws IOException {
	
//	if (kindergartenDAO.findAll().size() < 10) {
//	    ClassLoader classLoader = getClass().getClassLoader();
//	    InputStream inputStream = classLoader.getResourceAsStream("initial_data/kindergartens_data.txt");
//	    Random random = new Random();
//	    
//	    try (BufferedReader reader = new BufferedReader(
//		    new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
//		String line;
//		line = reader.readLine(); //Skip first line
//		
//		while ((line = reader.readLine()) != null) {
//		    String[] data = line.split(";");
//		    Kindergarten kindergarten = new Kindergarten();
//		    kindergarten.setId(data[0]);
//		    kindergarten.setName(data[1]);
//		    kindergarten.setAddress(data[2]);
//		    kindergarten.setElderate(data[3]);
//		    kindergarten.setManagerName(data[4]);
//		    kindergarten.setManagerSurname(data[5]);
//		    kindergarten.setCapacityAgeGroup2to3(random.nextInt(6));
//		    kindergarten.setCapacityAgeGroup3to6(random.nextInt(2));
//		    kindergarten.setLatitude(Double.parseDouble(data[6]));
//		    kindergarten.setLongitude(Double.parseDouble(data[7]));
//		    
//		    kindergartenDAO.save(kindergarten);
//		}
//	    }
//	}
	
    }

}
