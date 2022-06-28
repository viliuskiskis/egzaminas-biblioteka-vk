
package it.akademija.application;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ContextConfiguration;

import it.akademija.application.priorities.Priorities;
import it.akademija.application.priorities.PrioritiesDTO;
import it.akademija.application.queue.ApplicationQueueInfo;
import it.akademija.application.queue.ApplicationQueueService;
import it.akademija.kindergartenchoise.KindergartenChoiseDTO;
import it.akademija.user.ParentDetailsDTO;
import it.akademija.user.UserDTO;
import it.akademija.user.UserService;

@ContextConfiguration(locations = "classpath:application-context.xml")
@SpringBootTest(classes = ApplicationService.class)
@TestInstance(Lifecycle.PER_CLASS)
@TestMethodOrder(OrderAnnotation.class)
public class ApplicationServiceIntegrationTest {

	@Autowired
	private ApplicationService service;

	@Autowired
	private ApplicationDAO applicationDAO;
	
	@Autowired
	private ApplicationQueueService queueService;

	@Autowired
	private UserService userService;
	
	UserDTO newUser;
	
	ParentDetailsDTO secondGuardian;
	
	Application application;
	
	Long applicationId;
	
	ApplicationQueueInfo queueInfo;
	
	ApplicationInfo app;
	
	@BeforeAll
	void setUp() {
		newUser = new UserDTO(
				"USER", 
				"Test", 
				"Tester", 
				"22345678985", 
				"Address 1", 
				"+37061398875",
				"test@user2.lt", 
				"test@user2.lt", 
				"test@user2.lt");
		userService.createUser(newUser);
		
		secondGuardian = new ParentDetailsDTO(
				"48702241234", 
				"seconduser", 
				"seconduser",
				"second2@user.lt", 
				"Address 1", 
				"+37061398874");

		PrioritiesDTO priorities = new PrioritiesDTO();
		priorities.setLivesInVilnius(true);

		KindergartenChoiseDTO choices = new KindergartenChoiseDTO();
		choices.setKindergartenId1("190028324");

		ApplicationDTO applicationDTO = new ApplicationDTO(
				"Test", 
				"Testing", 
				"51913245686", 
				LocalDate.of(2019, 5, 5),
				priorities, 
				newUser, 
				secondGuardian, 
				choices);

		application = service
				.createNewApplication("test@user2.lt", applicationDTO);
		
		applicationId = userService.findByUsername("test@user2.lt").getUserApplications()
				.stream()
				.filter(a -> a.getChildName().equals("Test"))
				.findFirst()
				.get()
				.getId();
		
		queueInfo = new ApplicationQueueInfo(
				123L, 
				"39902254789", 
				"Test", 
				"Test", 
				"Kindergarten 1",
				ApplicationStatus.Patvirtintas, 
				0);
		
		app = new ApplicationInfo(123L, 
				"49902261456", 
				"Test", 
				"Test",
				ApplicationStatus.Laukiantis,
				"123456789", 
				"123456749", 
				"133456789", 
				"123446789", 
				"128456789");
	}
	
	@AfterAll
	void cleanUp() {
		applicationDAO.delete(application);
		userService.deleteUser("test@user2.lt");
	}
	
	@Test
	@Order(1)
	public void testGetQueueInformation() {

		PageRequest page = PageRequest.of(1, 10);
		
		Page<ApplicationQueueInfo> info = queueService
				.getApplicationQueueInformation(page, null);
		
		assertTrue(info.getSize() != 0);
		
		assertEquals(123L, queueInfo.getId());
	}

	@Test
	@Order(2)
	public void userExistsTest() {

		assertEquals("Test", 
				userService
						.findByUsername("test@user2.lt")
						.getName());
	}
	
	@Test
	@Order(3)
	public void childExistsByPersonalCodeTest() {
		assertTrue(service.existsByPersonalCode("51913245686"));
	}
	
	@Test
	@Order(4)
	public void getSizeOfAllUserApplicationsTest() {
		assertEquals(1, 
				service
					.getAllUserApplications("test@user2.lt")
					.size());
	}

	@Test
	@Order(4)
	public void getSizeOfAllUserApplicationsByUsernameTest() {
		assertEquals(1, userService
							.findByUsername("test@user2.lt")
							.getUserApplications()
							.size());
	}

	@Test
	@Order(4)
	public void deactivateApplicationTest() {
		service.deactivateApplication(applicationId);
		
		assertEquals(ApplicationStatus.Neaktualus, 
				userService.findByUsername("test@user2.lt").getUserApplications()
					.stream()
					.filter(a -> a.getChildName().equals("Test"))
					.findFirst()
					.get()
					.getStatus());
	}

	@Test
	@Order(5)
	public void testApplicationInfoAndPriorities() {
		
		assertTrue(app.getChildSurname().equals("Test"));
		assertTrue(app.getChildName().equals("Test"));
		assertTrue(app.getChildPersonalCode().equals("49902261456"));

		Application applic = new Application();
		Priorities prior = new Priorities();
		prior.setChildIsAdopted(false);
		prior.setFamilyHasThreeOrMoreChildrenInSchools(true);
		prior.setGuardianDisability(false);
		prior.setGuardianInSchool(true);
		prior.setLivesInVilnius(true);
		prior.setLivesMoreThanTwoYears(true);
		prior.setApplication(applic);

		assertEquals(13, prior.getScore());
		assertFalse(prior.isChildIsAdopted());
		assertTrue(prior.isFamilyHasThreeOrMoreChildrenInSchools());
		assertFalse(prior.isGuardianDisability());
		assertTrue(prior.isLivesInVilnius());
		assertTrue(prior.isGuardianInSchool());
		assertEquals(applic, prior.getApplication());
	}

}

