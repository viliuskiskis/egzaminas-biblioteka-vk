package it.akademija.application;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.management.RegistrationStatusService;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;

@RestController
@Api(value = "application")
@RequestMapping(path = "/api/prasymai")
public class ApplicationController {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private RegistrationStatusService statusService;

    @Autowired
    private JournalService journalService;

    /**
     * Create new application for logged user
     * 
     * @param data - applictaion data
     * @return message
     */
    @Secured({ "ROLE_USER" })
    @PostMapping("/user/new")
    @ApiOperation(value = "Create new application for logged user")
    public ResponseEntity<String> createNewApplication(
	    @ApiParam(value = "Application", required = true)
	    @Valid
	    @RequestBody ApplicationDTO data) {
	
	String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
	String childPersonalCode = data.getChildPersonalCode();

	if (!statusService.getStatus().isRegistrationActive()) {
	    
	    journalService.newJournalEntry(OperationType.ERROR, null, ObjectType.REGISTRATION_APPLICATION,
		    "Bandyta registruoti prašymą esant neaktyviai registracijai");
	    
	    LOG.warn("** Naudotojas [{}] bandė registruoti prašymą "
	    	+ "esant neaktyviai registracijai **", currentUsername);
	    
	    return new ResponseEntity<String>("Šiuo metu registracija nevykdoma.",
		    HttpStatus.METHOD_NOT_ALLOWED);
	    
	} else if (applicationService.existsByPersonalCode(childPersonalCode)) {
	    
	    journalService.newJournalEntry(OperationType.ERROR, null, ObjectType.REGISTRATION_APPLICATION,
		    "Bandyta registruoti registracijos prašymą jau registruotam vaikui");
	    
	    LOG.warn("** Naudotojas [{}] bandė registruoti prašymą jau registruotam vaikui "
	    	+ "su asmens kodu [{}] **", currentUsername, data.getChildPersonalCode());
	    
	    return new ResponseEntity<String>(
		    "Prašymas vaikui su tokiu asmens kodu jau yra registruotas",
		    HttpStatus.CONFLICT);
	    
	} else {
	    
	    Application application = applicationService.createNewApplication(currentUsername, data);
	    
	    if (application != null) {
		
		journalService.newJournalEntry(OperationType.APPLICATION_SUBMITED, application.getId(),
			ObjectType.REGISTRATION_APPLICATION, "Sukurtas naujas registracijos prašymas");
		
		LOG.info("** Prašymas [{}] sukurtas **", application.getId());

		return new ResponseEntity<String>("Prašymas sukurtas sėkmingai", HttpStatus.OK);
	    }
		journalService.newJournalEntry(OperationType.ERROR, null,
			ObjectType.REGISTRATION_APPLICATION, "Įvyko klaida kuriant registracijos prašymą");
		
		LOG.warn("** ApplicationController: Įvyko klaida kuriant prašymą **");
		
	    return new ResponseEntity<String>("Prašymo sukurti nepavyko", HttpStatus.BAD_REQUEST);
	}
    }

    /**
     * Get list of user's applications for logged user
     * 
     * @return list of applications
     */
    @Secured({ "ROLE_USER" })
    @GetMapping("/user")
    @ApiOperation(value = "Get all user applications")
	public Set<ApplicationInfoUser> getAllUserApplications() {
	    
	String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

	return applicationService.getAllUserApplications(currentUsername);
    }
	
    /**
     * Get application for logged user by application id
     * 
     * @param id - application id
     * @return application details
     */
    @Secured({ "ROLE_USER" })
    @GetMapping("/user/{id}")
    @ApiOperation(value = "Get application by application id")
    public ResponseEntity<ApplicationDetails> getUserApplicationDetails(
	    @ApiParam(value = "Application id", required = true)
	    @PathVariable Long id) {

	if (id != null) {
	    
	    journalService.newJournalEntry(OperationType.APPLICATION_REVIEWED, id,
		    ObjectType.REGISTRATION_APPLICATION, "Peržiūrėtas registracijos prašymas");
	    
	    return applicationService.getUserApplicationDetails(id);
	}
	journalService.newJournalEntry(OperationType.ERROR, id,
		ObjectType.REGISTRATION_APPLICATION, "Nepavyko peržiūrėti registracijos prašymo");
	
	return new ResponseEntity<ApplicationDetails>(new ApplicationDetails(), HttpStatus.BAD_REQUEST);
    }
	
    /**
     * Delete user application by application id
     * 
     * @param id - application id
     * @return message
     */
    @Secured({ "ROLE_USER" })
    @DeleteMapping("/user/delete/{id}")
    @ApiOperation(value = "Delete user application by id")
    public ResponseEntity<String> deleteApplication(
	    @ApiParam(value = "Application id", required = true)
	    @PathVariable Long id) {
	
	journalService.newJournalEntry(OperationType.APPLICATION_DELETED, id,
		ObjectType.REGISTRATION_APPLICATION, "Ištrintas registracijos prašymas");

	LOG.info("**ApplicationController: trinamas prasymas [{}] **", id);

	return applicationService.deleteApplication(id);
    }
	
    /**
     * Get page of applications sorted by child surname and name,
     * filtered by child personal code
     *
     * @param page   - page number
     * @param size   - number of entries in a page
     * @param filter - part of child personal code from start
     * @return page of sorted and filtered application information
     */
    @Secured({ "ROLE_MANAGER" })
    @GetMapping("/manager")
    @ApiOperation(value = "Get a page from all submitted applications")
    public Page<ApplicationInfo> getPageFromSubmittedApplications(
	    @RequestParam(value = "page", required = false, defaultValue = "0") int page,
	    @RequestParam(value = "size", required = false, defaultValue = "10") int size,
	    @RequestParam(value = "filter", required = false, defaultValue = "") String filter) {

	List<Order> orders = new ArrayList<>();
	orders.add(new Order(Direction.ASC, "childSurname").ignoreCase());
	orders.add(new Order(Direction.ASC, "childName").ignoreCase());

	Pageable pageable = PageRequest.of(page, size, Sort.by(orders));

	return applicationService.getPageFromSubmittedApplications(pageable, filter.trim());
    }

    /**
     * Manager sets user application status to inactive
     * 
     * @param id - application id
     * @return message
     */
    @Secured({ "ROLE_MANAGER" })
    @PostMapping("/manager/deactivate/{id}")
    @ApiOperation("Delete user application by id")
    public ResponseEntity<String> deactivateApplication(
	    @ApiParam(value = "Application id", required = true)
	    @PathVariable Long id) {
	
	journalService.newJournalEntry(OperationType.APPLICATION_DEACTVATED, id,
		ObjectType.REGISTRATION_APPLICATION, "Atmestas registracijos prašymas");

	LOG.info("**ApplicationController: deaktyvuojamas prasymas [{}] **", id);

	return applicationService.deactivateApplication(id);
    }
	
    /**
     * Get application by id
     * 
     * @param id - application id
     * @return application details
     */
    @Secured({ "ROLE_MANAGER" })
    @GetMapping("/manager/{id}")
    @ApiOperation(value = "Get application by id")
    public ResponseEntity<ApplicationDetails> getApplication(
	    @ApiParam(value = "Application id", required = true)
	    @PathVariable Long id) {

	if (id != null) {
	    
	    journalService.newJournalEntry(OperationType.APPLICATION_REVIEWED, id,
		    ObjectType.REGISTRATION_APPLICATION, "Peržiūrėtas registracijos prašymas");
	    
	    return applicationService.getApplicationDetails(id);
	}
	journalService.newJournalEntry(OperationType.ERROR, id,
		ObjectType.REGISTRATION_APPLICATION, "Nepavyko peržiūrėti registracijos prašymo");
	
	return new ResponseEntity<ApplicationDetails>(new ApplicationDetails(), HttpStatus.BAD_REQUEST);
    }

}
