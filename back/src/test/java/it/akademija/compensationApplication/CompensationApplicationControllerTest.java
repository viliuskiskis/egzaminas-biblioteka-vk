package it.akademija.compensationApplication;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import it.akademija.App;
import it.akademija.application.ApplicationController;

@SpringBootTest(classes = { App.class,
	ApplicationController.class }, 
	webEnvironment = WebEnvironment.RANDOM_PORT)

public class CompensationApplicationControllerTest {
	
	@Autowired
	CompensationApplicationController compensationApplicationController;
	
	@Test
	public void CompensationApplicationContextLoads() {
		assertNotNull(compensationApplicationController);
	}
}
