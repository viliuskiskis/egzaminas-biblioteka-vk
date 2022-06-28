package it.akademija.application;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.application.priorities.Priorities;
import it.akademija.application.priorities.PrioritiesDAO;
import it.akademija.application.priorities.PrioritiesDTO;
import it.akademija.kindergarten.Kindergarten;
import it.akademija.kindergarten.KindergartenService;
import it.akademija.kindergartenchoise.KindergartenChoise;
import it.akademija.kindergartenchoise.KindergartenChoiseDTO;
import it.akademija.kindergartenchoise.KindergartenChoiseService;
import it.akademija.user.ParentDetails;
import it.akademija.user.ParentDetailsDAO;
import it.akademija.user.ParentDetailsDTO;
import it.akademija.user.User;
import it.akademija.user.UserService;

@Service
public class ApplicationService {

	@Autowired
	private ApplicationDAO applicationDao;

	@Autowired
	private UserService userService;

	@Autowired
	private KindergartenService gartenService;

	@Autowired
	private ParentDetailsDAO parentDetailsDao;

	@Autowired
	private PrioritiesDAO prioritiesDao;

	@Autowired
	private KindergartenChoiseService kindergartenChoiseService;

	
	/**
	 * 
	 * Get information about submitted applications for logged in user
	 * 
	 * @param currentUsername
	 * @return list of user applications
	 */
	@Transactional(readOnly = true)
	public Set<ApplicationInfoUser> getAllUserApplications(String currentUsername) {

		return applicationDao.findAllUserApplications(currentUsername);
	}

	/**
	 * Create an application for logged in user's child with specified child data.
	 * Receives and updates user data, receives saves additional child's guardian if
	 * person with such personal code is not already in the database. Sets received
	 * main guardian, additional guardian, priorities and chosen kindergartens to
	 * application.
	 * 
	 * @param currentUsername
	 * @param data
	 * @return application or null if no kindergarten are chosen
	 */
	@Transactional
	public Application createNewApplication(
			String currentUsername, 
			ApplicationDTO data) {

		Application application = new Application();

		User firstParent = userService
				.updateUserData(data.getMainGuardian(), currentUsername);

		ParentDetailsDTO detailsDto = data
				.getAdditionalGuardian();

		if (detailsDto!=null && detailsDto.getPersonalCode() != null && !detailsDto.getPersonalCode().isEmpty()) {
			ParentDetails secondParent = parentDetailsDao.findByPersonalCode(detailsDto.getPersonalCode());

			if (secondParent == null) {
				secondParent = parentDetailsDao.save(
						new ParentDetails(detailsDto.getPersonalCode(), detailsDto.getName(), detailsDto.getSurname(),
								detailsDto.getEmail(), detailsDto.getAddress(), detailsDto.getPhone()));
			}

			application.setAdditionalGuardian(secondParent);
		}

		PrioritiesDTO prioritiesDto = data.getPriorities();

		Priorities priorities = prioritiesDao.save(new Priorities(prioritiesDto.isLivesInVilnius(),
				prioritiesDto.isChildIsAdopted(), prioritiesDto.isFamilyHasThreeOrMoreChildrenInSchools(),
			prioritiesDto.isGuardianInSchool(), prioritiesDto.isGuardianDisability(),
			prioritiesDto.isLivesMoreThanTwoYears()));

		application.setPriorities(priorities);
		application.setPriorityScore(priorities.getScore());

		application.setSubmitedAt();
		application.setStatus(ApplicationStatus.Pateiktas);
		application.setChildName(capitalize(data.getChildName()));
		application.setChildSurname(capitalize(data.getChildSurname()));
		application.setChildPersonalCode(data.getChildPersonalCode());
		application.setBirthdate(data.getBirthdate());

		application.setMainGuardian(firstParent);

		KindergartenChoiseDTO kindergartenChoiseDTO = data.getKindergartenChoises();
		Set<KindergartenChoise> kindergartenChoises = new HashSet<>();

		for (int i = 1; i <= 5; i++) {
			if (kindergartenChoiseDTO.getKindergartenId(i) != null) {
				
				Kindergarten kindergarten = 
						gartenService.findById(kindergartenChoiseDTO.getKindergartenId(i));
				
				if (kindergarten != null) {
					
					KindergartenChoise kindergartenChoise = 
							kindergartenChoiseService.saveKindergartenChoise(
							new KindergartenChoise(kindergarten, application, i));
					
					kindergartenChoises.add(kindergartenChoise);
				}
			}
		}

		if (kindergartenChoises.isEmpty()) {

			return null;

		}

		application.setKindergartenChoises(kindergartenChoises);
		application = applicationDao.saveAndFlush(application);

		return application;

	}

	/**
	 * 
	 * Capitalize first letter of word, other letters to lowercase
	 * 
	 * @param str
	 * @return
	 */
	private String capitalize(String str) {
		if (str == null || str.isEmpty()) {
			return str;
		}

		return Pattern.compile("\\b(.)(.*?)\\b").matcher(str)
				.replaceAll(match -> match.group(1).toUpperCase() + match.group(2).toLowerCase());
	}

	/**
	 * Delete user application by id. Also deletes connected priorities,
	 * kindergarten choises, and additional guardian who has no other applications
	 * connected to them. Also decreases number of taken places in approved
	 * Kindergarten if applicable. Accessible to User only
	 * 
	 * @param id
	 * @return message indicating whether deletion was successful
	 */
	@Transactional
	public ResponseEntity<String> deleteApplication(Long id) {

		Optional<Application> optionalApplication = applicationDao.findById(id);

		User user = userService.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());

		if (optionalApplication.isPresent() == true && 
				optionalApplication.get().getMainGuardian().equals(user)) { 
			
			Application application = optionalApplication.get();
			
			detachAdditionalGuardian(application);

			updateAvailablePlacesInKindergarten(application);

			applicationDao.delete(application);

			return new ResponseEntity<String>("Ištrinta sėkmingai", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("Prašymas nerastas", HttpStatus.NOT_FOUND);
	}

	/**
	 * Removes additional guardian who has no other applications connected to them.
	 * 
	 * @param id
	 * @param application
	 */
	public void detachAdditionalGuardian(Application application) {
		ParentDetails additionalGuardian = application.getAdditionalGuardian();

		if (additionalGuardian != null) {
			int numberOfAdditionalGuardianApplications = additionalGuardian.removeApplication(application);

			if (numberOfAdditionalGuardianApplications == 0) {
				parentDetailsDao.delete(additionalGuardian);
			}

			application.setAdditionalGuardian(null);

		}
	}

	/**
	 * Updates number of available places in approved Kindergarten
	 * 
	 * @param application
	 */
	public void updateAvailablePlacesInKindergarten(Application application) {
		long age = application.calculateAgeInYears();

		if (age < 7) {

			ApplicationStatus status = application.getStatus();

			if (status.equals(ApplicationStatus.Pateiktas)) {

				Kindergarten garten = application.getApprovedKindergarten();

				if (garten != null) {

					gartenService.decreaseNumberOfTakenPlacesInAgeGroup(garten, age);
				}

			} else if (status.equals(ApplicationStatus.Patvirtintas)) {

				Kindergarten garten = application.getApprovedKindergarten();

				gartenService.increaseNumberOfAvailablePlacesInAgeGroup(garten, age);

			}
		}

	}

	/**
	 * Deactivate application by id. Also decreases number of taken places in
	 * approved Kindergarten if applicable. Accessible to Manager only
	 * 
	 * @param id
	 */
	@Transactional
	public ResponseEntity<String> deactivateApplication(Long id) {

		Optional<Application> optionalApplication = 
				applicationDao.findById(id);

		if (optionalApplication.isPresent() == false) { 

			return new ResponseEntity<String>
					("Prašymas nerastas", HttpStatus.NOT_FOUND);

		} 
			
		Application application = optionalApplication.get();
		
		if (application.getStatus()
					.equals(ApplicationStatus.Patvirtintas)) {
			
			return new ResponseEntity<String>
					("Veiksmas negalimas. Prašymas jau patvirtintas.",
							HttpStatus.METHOD_NOT_ALLOWED);
		}
		else {

			application.setStatus(ApplicationStatus.Neaktualus);

			if (application.getApprovedKindergarten() != null) {

				gartenService.decreaseNumberOfTakenPlacesInAgeGroup(
						application.getApprovedKindergarten(),
						application.calculateAgeInYears());
						application.setApprovedKindergarten(null);
			}

			application.setNumberInWaitingList(0);

			applicationDao.save(application);

			return new ResponseEntity<String>
					("Statusas pakeistas sėkmingai", HttpStatus.OK);
		}
	}

	/**
	 * 
	 * Check if application for a child already exists
	 * 
	 * @param childPersonalCode
	 * @return true if exists
	 */
	public boolean existsByPersonalCode(String childPersonalCode) {
		return applicationDao.existsApplicationByChildPersonalCode(childPersonalCode);
	}

	/**
	 * Returns a page of information from submitted Applications list with specified
	 * page number and page size.
	 * 
	 * @param pageable
	 * @return page from Application database
	 */
	public Page<ApplicationInfo> getPageFromSubmittedApplications(Pageable pageable, String filter) {

		return applicationDao.findAllApplications(pageable, filter);

	}

	/**
	 * Returns application details about submitted application by id and username
	 * 
	 * @param currentUsername 
	 * @param id
	 * @return application details
	 */
	public ResponseEntity<ApplicationDetails> getUserApplicationDetails(Long id) {

	    String currentUsername = SecurityContextHolder.getContext()
							  .getAuthentication()
							  .getName();
	    String applicationUsername = "";

	    if (applicationDao.findById(id).isPresent()) {
		applicationUsername = applicationDao.findById(id)
						    .get()
						    .getMainGuardian()
						    .getUsername();
	    }

	    if (currentUsername.equals(applicationUsername)) {
		return getApplicationDetails(id);
	    } else {
		return new ResponseEntity<ApplicationDetails>(new ApplicationDetails(), HttpStatus.FORBIDDEN);
	    }
	}

	/**
	 * Returns application details about submitted application by id 
	 * 
	 * @param id
	 * @return application details
	 */
	public ResponseEntity<ApplicationDetails> getApplicationDetails(Long id) {
	    
	    ApplicationDetails applicationDetails = applicationDao.getApplicationDetails(id);
	    applicationDetails.setMainGuardian(userService.getUserInfoByApplicationId(id));
	    applicationDetails.setAdditionalGuardian(parentDetailsDao.getParentDetailsByApplicationId(id));
	    applicationDetails.setKindergartenChoices(applicationDao.getKindergartenChoicesByApplicationId(id));
	    applicationDetails.setPriorities(applicationDao.getPrioritiesByApplicationId(id));
	    return new ResponseEntity<ApplicationDetails>(applicationDetails, HttpStatus.OK);
	}

	/**
	 * Returns boolean is application and user data matches 
	 * 
	 * @param id
	 * @return boolean
	 */
	public boolean isApplicationPresentAndMatchesMainGuardian(Long id) {
		Optional<Application> optionalApplication = 
				applicationDao.findById(id);
		
		if (optionalApplication.isPresent()) {
			
			Application application = 
					optionalApplication.get();			
			
			User user = userService.findByUsername(SecurityContextHolder
					.getContext()
					.getAuthentication()
					.getName());
			
				if(application.getMainGuardian().equals(user)) {
					return true;
				}	
		}
		return false;
	}

	/**
	 * Updates application
	 * 
	 * @param applicationDTO
	 * @param id 
	 */
	public void updateApplication(ApplicationDTO applicationdDTO, Long id) {
		
		Application application = 
				applicationDao.getById(id);
		
		application.setBirthdate(applicationdDTO.getBirthdate());
		application.setChildName(applicationdDTO.getChildName());
		application.setChildSurname(applicationdDTO.getChildSurname());
		application.setChildPersonalCode(applicationdDTO.getChildPersonalCode());
		
		applicationDao.save(application);
		
		KindergartenChoiseDTO kindergartenChoiseDTO = 
				applicationdDTO.getKindergartenChoises();
		
		kindergartenChoiseService
			.updateKindergartenChoises(kindergartenChoiseDTO, application);
		
		
		String currentUsername = SecurityContextHolder
				.getContext()
				.getAuthentication()
				.getName();
		
		userService
				.updateUserData(applicationdDTO
				.getMainGuardian(), currentUsername);
		
		ParentDetailsDTO parentDetailsDTO =  
				applicationdDTO.getAdditionalGuardian();
		
		
		ParentDetails parentDetails = 
				parentDetailsDao.findByPersonalCode(
						application.getAdditionalGuardian()
						.getPersonalCode());
		
		parentDetails.setAddress(parentDetailsDTO.getAddress());
		parentDetails.setEmail(parentDetailsDTO.getEmail());
		parentDetails.setName(parentDetailsDTO.getName());
		parentDetails.setSurname(parentDetailsDTO.getSurname());
		parentDetails.setPhone(parentDetailsDTO.getPhone());
		parentDetails.setPersonalCode(parentDetailsDTO.getPersonalCode());
		
		parentDetailsDao.save(parentDetails);
	}

}
