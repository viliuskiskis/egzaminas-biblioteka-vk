package it.akademija.compensationApplication;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;

import static it.akademija.application.ApplicationStatus.Neaktualus;
import static it.akademija.application.ApplicationStatus.Patvirtintas;

import it.akademija.compensationApplication.childData.ChildDataDAO;
import it.akademija.compensationApplication.kindergartenData.KindergartenDataDAO;
import it.akademija.compensationApplication.kindergartenData.KindergartenDataDTO;
import it.akademija.user.UserDTO;
import it.akademija.user.UserService;

@ContextConfiguration(locations = "classpath:application-context.xml")
@SpringBootTest(classes = CompensationApplicationService.class, webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(Lifecycle.PER_CLASS)
@TestMethodOrder(OrderAnnotation.class)
public class CompensationApplicationServiceTest {
	
	@Autowired
	CompensationApplicationService compensationApplicationService;
	
	@Autowired
	CompensationApplicationDAO compensationApplicationDAO;
	
	@Autowired
	UserService userService;
	
	@Autowired
	KindergartenDataDAO kindergartenDataDAO;

	@Autowired
	ChildDataDAO childDataDAO;
	
	CompensationApplication compensationApplication;
	
	CompensationApplicationDTO compensationApplicationDTO;
	
	UserDTO userDTO;
	
	KindergartenDataDTO kindergartenDataDTO;
	
	Long compensationApplicationId;
	
	@BeforeAll
	void setUp() {
		userDTO = new UserDTO(
				"USER", 
				"Test", 
				"Tester", 
				"22345678989", 
				"Address 1", 
				"+37061398876",
				"test@user.lt", 
				"test@user.lt", 
				"test@user.lt");
		
		kindergartenDataDTO = new KindergartenDataDTO(
				"Test kindergarten", 
				"123456789", 
				"+37061398876", 
				"testKindergarten@email.com", 
				"Test Address", 
				"AB123456789123456789", 
				"AZSAZS235", 
				"TestBank");
		
		compensationApplicationDTO = new CompensationApplicationDTO(
				LocalDate.of(2019, 5, 5), 
				"Tomas", 
				"51913245685", 
				"Tomulis", 
				kindergartenDataDTO, 
				userDTO);
		
		userService.createUser(userDTO);
		
		compensationApplication = 
					compensationApplicationService
						.createNewCompensationApplication(compensationApplicationDTO);
		
		compensationApplicationId = compensationApplication.getId();
	}
	
	@AfterAll
	void cleanUp() {
		compensationApplicationService.deleteCompensationApplicationById(compensationApplicationId);
		userService.deleteUser("test@user.lt");
	}
	

	
	@Test
	@Order(1)
	void createNewCompensationApplicationTest() {
		
		assertTrue(compensationApplicationDAO
				.existsById(compensationApplicationId));
	}
	
	@Test
	@Order(2)
	void getAllUserCompensationApplicationsInfoUserTest() {
		
		Set<CompensationApplicationInfoUser> compensationApplications = 
				compensationApplicationService
						.getAllUserCompensationApplicationsInfoUser("test@user.lt");
		
		assertEquals(1, compensationApplications.size(), 
				"number of user applications does not match");
	}
	
	@Test
	@Order(3)
	void getUserCompensationApplicationInfoTest() {
		
		CompensationApplicationInfo compensationApplicationInfo = 
				compensationApplicationService
						.getUserCompensationApplicationInfo(
								"test@user.lt", 
								compensationApplicationId);
		
		assertNotNull(compensationApplicationInfo);
		
		assertEquals(compensationApplicationId, 
				compensationApplicationInfo.getId(), 
				"application id does not match");
		
		assertEquals("test@user.lt", 
				compensationApplicationInfo.getMainGuardianInfo().getUsername(), 
				"user name is not the same");
	}
	
	@Test
	@Order(4)
	void getCompensationApplicationInfoTest() {
		
		CompensationApplicationInfo compensationApplicationInfo = 
				compensationApplicationService
						.getCompensationApplicationInfo(compensationApplicationId);
		
		assertNotNull(compensationApplicationInfo);
		
		assertEquals(compensationApplicationId, 
				compensationApplicationInfo.getId(), 
				"application id does not match");
	}
	
	@Test
	@Order(5)
	@WithMockUser(username = "test@user.lt", password = "test@user.lt", roles = "USER")
	void isCompensationApplicationPresentAndMatchesMainGuardianTest() {
		
		boolean isMatch = compensationApplicationService
				.isCompensationApplicationPresentAndMatchesMainGuardian(
						compensationApplicationId);
		
		assertTrue(
				"id in compensationApplication does not match with provided user", 
				isMatch);
	}
	
	@Test
	@Order(6)
	void childExistsByPersonalCodeTest() {
		
		boolean isChildExists = compensationApplicationService
				.childExistsByPersonalCode("51913245685");
		
		assertTrue(
				"child with such personal code was not found", 
				isChildExists);
	}
	
	@Test
	@Order(7)
	void isCompensationApplicationExistsByIdTest() {
		boolean isCompensationApplicationExists = compensationApplicationService
			.isCompensationApplicationExistsById(compensationApplicationId);
		
		assertTrue(
				"compensationApplication not found with such id", 
				isCompensationApplicationExists);
	}
	
	@Test
	@Order(8)
	void deactivateCompensationApplicationTest() {
		compensationApplicationService
			.deactivateCompensationApplication(compensationApplication);
		
		assertEquals(
				Neaktualus, 
				compensationApplication.getApplicationStatus(),
				"status was not changed to Neaktualus");
	}
	
	@Test
	@Order(9)
	void confirmCompensationApplicationTest() {
		compensationApplicationService
			.confirmCompensationApplication(compensationApplication);
		
		assertEquals(
				Patvirtintas, 
				compensationApplication.getApplicationStatus(),
				"status was not changed to Patvirtintas");
	}

	@Test
	@Order(10)
	void getCompensationApplicationByIdTest() {
		
		CompensationApplication compensationApplicationFromMethod = 
				compensationApplicationService
						.getCompensationApplicationById(compensationApplicationId);
		
		assertNotNull(compensationApplicationFromMethod);		
	}
	
	@Test
	@Order(11)
	void getPageFromCompensationApplicationsTest() {
		
		Pageable pageable = PageRequest.of(0, 10, Sort.by("id"));
		
		List<CompensationApplicationInfoUser> page = compensationApplicationService
				.getPageFromCompensationApplications(pageable, "51913245685")
				.toList();
		
		assertNotNull(
				"result should not be null", 
				page);
		
		assertEquals(1, 
				page.size(),
				"page size should be 1");
		
		assertEquals(
				"51913245685", 
				page.get(0).getChildPersonalCode(),
				"page should contain object with child personal code 51913245685");
	}
}
