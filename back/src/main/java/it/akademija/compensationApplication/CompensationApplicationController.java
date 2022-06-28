package it.akademija.compensationApplication;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.ApplicationStatus;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;

@RestController
@Api(value = "Compensation application")
@RequestMapping(path = "/api/kompensacijos")
public class CompensationApplicationController {

    private static final Logger LOG = LoggerFactory.getLogger(CompensationApplicationController.class);

    @Autowired
    private JournalService journalService;

    @Autowired
    private CompensationApplicationService compensationApplicationService;
		
    /**
     * Create new compensation application for logged user
     * 
     * @param compensationApplicationDTO - compensation application details
     * @return message
     */   
    @Secured({ "ROLE_USER" })
    @PostMapping("/user/new")
    @ApiOperation(value = "Create new compensation application")
    public ResponseEntity<String> createNewCompensationApplication(
	    @ApiParam(value = "Application", required = true)
	    @Valid
	    @RequestBody CompensationApplicationDTO compensationApplicationDTO) {

	if (compensationApplicationDTO != null) {

	    String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

	    if (compensationApplicationService.childExistsByPersonalCode(
		    compensationApplicationDTO.getChildPersonalCode())) {
		
		journalService.newJournalEntry(OperationType.ERROR, null,
			ObjectType.COMPENSATION_APPLICATION,
			"Bandyta registruoti kompensacijos prašymą jau registruotam vaikui");

		LOG.warn("** Naudotojas [{}] bandė registruoti kompensacijos prašymą "
			+ "jau registruotam vaikui su asmens kodu [{}] **",
			currentUsername, compensationApplicationDTO.getChildPersonalCode());

		return new ResponseEntity<String>(
			"Kompensacijos prašymas vaikui su tokiu asmens kodu jau yra registruotas",
			HttpStatus.CONFLICT);
	    } else {

		Long compensationId = compensationApplicationService
			.createNewCompensationApplication(compensationApplicationDTO).getId();

		journalService.newJournalEntry(OperationType.APPLICATION_SUBMITED, compensationId,
			ObjectType.COMPENSATION_APPLICATION, "Sukurtas naujas kompensacijos prašymas");
		
		LOG.info("** Sukurtas kompensacijos prašymas id: [{}] **", compensationId);

		return new ResponseEntity<String>(
			"Kompensacijos prašymas sukurtas sėkmingai", HttpStatus.OK);
	    }
	}
	
	journalService.newJournalEntry(OperationType.ERROR, null,
		ObjectType.COMPENSATION_APPLICATION, "Įvyko klaida kuriant kompensacijos prašymą");
	
	LOG.warn("** Įvyko klaida kuriant kompensacijos prašymą **");

	return new ResponseEntity<String>("Prašymo sukurti nepavyko", HttpStatus.BAD_REQUEST);
    }
	
    /**
     * Get list of user's compensation applications for logged user
     * 
     * @return set of compensation applications
     */
    @Secured({ "ROLE_USER" })
    @GetMapping("/user")
    @ApiOperation(value = "Get all user applications")
    public ResponseEntity<Set<CompensationApplicationInfoUser>> getAllUserCompensationApplications() {

	String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

	Set<CompensationApplicationInfoUser> compensationApplicationInfoUser = 
		new HashSet<CompensationApplicationInfoUser>();

	if (currentUsername != null) {

	    compensationApplicationInfoUser = compensationApplicationService
		    .getAllUserCompensationApplicationsInfoUser(currentUsername);

	    return new ResponseEntity<Set<CompensationApplicationInfoUser>>(
		    compensationApplicationInfoUser, HttpStatus.OK);
	}

	return new ResponseEntity<Set<CompensationApplicationInfoUser>>(
		compensationApplicationInfoUser, HttpStatus.BAD_REQUEST);
    }
	
    /**
     * Get compensation application for logged user by id
     * 
     * @param id - compensation application id
     * @return compensation application information
     */
    @Secured({ "ROLE_USER" })
    @GetMapping("/user/{id}")
    @ApiOperation(value = "Get compensation application by id")
    public ResponseEntity<CompensationApplicationInfo> getUserCompensationApplication(
	    @ApiParam(value = "CompensationApplication id", required = true) @PathVariable Long id) {

	String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

	if (id != null && compensationApplicationService
		.isCompensationApplicationPresentAndMatchesMainGuardian(id)) {

	    CompensationApplicationInfo compensationApplicationInfo = 
		    compensationApplicationService.getUserCompensationApplicationInfo(currentUsername, id);
	    
	    journalService.newJournalEntry(OperationType.APPLICATION_REVIEWED, id,
		    ObjectType.COMPENSATION_APPLICATION, "Peržiūrėtas kompensacijos prašymas");

	    return new ResponseEntity<CompensationApplicationInfo>(
		    compensationApplicationInfo, HttpStatus.OK);
	}
	journalService.newJournalEntry(OperationType.ERROR, id,
		ObjectType.COMPENSATION_APPLICATION, "Nepavyko peržiūrėti kompensacijos prašymo");
	
	return new ResponseEntity<CompensationApplicationInfo>(new CompensationApplicationInfo(),
		HttpStatus.BAD_REQUEST);
    }
	
    /**
     * Delete user compensation application by id
     * 
     * @param id - compenastion application id
     * @return message
     */
    @Secured({ "ROLE_USER" })
    @DeleteMapping("/user/delete/{id}")
    @ApiOperation("Delete user application by id")
    public ResponseEntity<String> deleteUserCompensationApplication(
	    @ApiParam(value = "CompensationApplication id", required = true)
	    @PathVariable Long id) {

	if (id != null && compensationApplicationService
		.isCompensationApplicationPresentAndMatchesMainGuardian(id)) {

	    compensationApplicationService.deleteCompensationApplicationById(id);
	    
	    journalService.newJournalEntry(OperationType.APPLICATION_DELETED, id,
		    ObjectType.COMPENSATION_APPLICATION, "Ištrintas kompensacijos prašymas");
	    
	    LOG.info("** Kompen\n"
	    		+ "	void sacijos prašymas id: [{}] ištrintas **", id);

	    return new ResponseEntity<String>("Ištrinta sėkmingai", HttpStatus.OK);
	}
	
	journalService.newJournalEntry(OperationType.ERROR, id, ObjectType.COMPENSATION_APPLICATION,
		    "Bandyta ištrinti neegzistuojantį kompensacijos prašymą");
	
	LOG.warn("** Naudotojas bandė ištrinti neegzistuojantį kompensacijos prašymą **");

	return new ResponseEntity<String>("Prašymas kompensacijai nerastas", HttpStatus.NOT_FOUND);
    }
	
    /**
     * Get information about compensation application by id
     * 
     * @param id - compensation application id
     * @return CompensationApplication Info
     */
    @Secured({ "ROLE_MANAGER" })
    @GetMapping("/manager/{id}")
    @ApiOperation("Get compensation application by id")
    public ResponseEntity<CompensationApplicationInfo> getCompensationApplication(
	    @ApiParam(value = "CompensationApplication id", required = true)
	    @PathVariable Long id) {

	if (id != null) {
	    CompensationApplicationInfo compensationApplicationInfo = 
		    compensationApplicationService.getCompensationApplicationInfo(id);
	    
	    journalService.newJournalEntry(OperationType.APPLICATION_REVIEWED, id,
		    ObjectType.COMPENSATION_APPLICATION, "Peržiūrėtas kompensacijos prašymas");

	    return new ResponseEntity<CompensationApplicationInfo>(
		    compensationApplicationInfo, HttpStatus.OK);
	}
	journalService.newJournalEntry(OperationType.ERROR, id,
		ObjectType.COMPENSATION_APPLICATION, "Nepavyko peržiūrėti kompensacijos prašymo");

	return new ResponseEntity<CompensationApplicationInfo>(new CompensationApplicationInfo(),
		HttpStatus.BAD_REQUEST);
    }
	
    /**
     * Get page from compensation applications for manager
     * 
     * @param pageNumber
     * @param pageSize - number of entries in a page
     * @param sortBy
     * @param filter - part of child personal code from start
     * @return set of compensation applications info
     */
    @Secured({ "ROLE_MANAGER" })
    @GetMapping("/manager")
    @ApiOperation(value = "Get page from compensations applications list")
    public Page<CompensationApplicationInfoUser> getAllUserCompensationApplicationsInfoUser(
	    @RequestParam(value = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
	    @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
	    @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
	    @RequestParam(value = "filter", required = false, defaultValue = "") String filter) {

	Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));

	return compensationApplicationService.getPageFromCompensationApplications(pageable, filter.trim());
    }
	
    /**
     * Deactivate compensation application
     * 
     * @param id - compensation application id
     * @return message
     */
    @Secured({ "ROLE_MANAGER" })
    @PostMapping("/manager/deactivate/{id}")
    @ApiOperation(value = "Deactivate compensation application")
    public ResponseEntity<String> deactivateCompensationApplication(
	    @ApiParam(value = "CompensationApplication id", required = true)
	    @PathVariable Long id) {

	if (id != null && compensationApplicationService.isCompensationApplicationExistsById(id)) {

	    CompensationApplication compensationApplication =
		    compensationApplicationService.getCompensationApplicationById(id);

	    if (compensationApplication.getApplicationStatus()
				       .equals(ApplicationStatus.Patvirtintas)) {
		
		journalService.newJournalEntry(OperationType.ERROR, id,
			ObjectType.COMPENSATION_APPLICATION,
			"Bandyta atmesti jau patvirtintą kompensacijos prašymą");
		
		LOG.warn("** Bnadyta atmesti jau patvirtintą prašymą [{}]**", id);

		return new ResponseEntity<String>("Veiksmas negalimas. Prašymas jau patvirtintas.",
			HttpStatus.METHOD_NOT_ALLOWED);
	    }
	    
	    journalService.newJournalEntry(OperationType.APPLICATION_DEACTVATED, id,
		    ObjectType.COMPENSATION_APPLICATION, "Atmestas kompensacijos prašymas");

	    LOG.info("**CompensationApplicationController: deaktyvuojamas prasymas [{}] **", id);

	    compensationApplicationService.deactivateCompensationApplication(compensationApplication);

	    return new ResponseEntity<String>("Statusas pakeistas sėkmingai", HttpStatus.OK);
	}
	journalService.newJournalEntry(OperationType.ERROR, id,
		ObjectType.COMPENSATION_APPLICATION,
		"Bandyta atmesti neegzistuojantį kompensacijos prašymą");
	
	LOG.warn("** Bnadyta atmesti neegzistuojantį prašymą [{}]**", id);

	return new ResponseEntity<String>("Kompensacijos prašymas nerastas", HttpStatus.BAD_REQUEST);
    }
	
    /**
     * Confirm compensation application
     * 
     * @param id - compensation application id
     * @return message
     */
    @Secured({ "ROLE_MANAGER" })
    @PostMapping("/manager/confirm/{id}")
    @ApiOperation(value = "Confirm compensation application")
    public ResponseEntity<String> confirmCompensationApplication(
	    @ApiParam(value = "CompensationApplication id", required = true)
	    @PathVariable Long id) {

	if (id != null && compensationApplicationService.isCompensationApplicationExistsById(id)) {

	    CompensationApplication compensationApplication =
		    compensationApplicationService.getCompensationApplicationById(id);

	    if (compensationApplication.getApplicationStatus()
				       .equals(ApplicationStatus.Neaktualus)) {
		
		journalService.newJournalEntry(OperationType.ERROR, id,
			ObjectType.COMPENSATION_APPLICATION,
			"Bandyta patvirtinti atmestą kompensacijos prašymą");

		return new ResponseEntity<String>("Veiksmas negalimas. Prašymas jau atmestas.",
			HttpStatus.METHOD_NOT_ALLOWED);
	    }
	    
	    journalService.newJournalEntry(OperationType.APPLICATION_CONFIRMED, id,
		    ObjectType.COMPENSATION_APPLICATION, "Patvirtintas kompensacijos prašymas");

	    LOG.info("**CompensationApplicationController: patvirtinamas prasymas [{}] **", id);

	    compensationApplicationService.confirmCompensationApplication(compensationApplication);

	    return new ResponseEntity<String>("Statusas pakeistas sėkmingai", HttpStatus.OK);
	}
	journalService.newJournalEntry(OperationType.ERROR, id,
		ObjectType.COMPENSATION_APPLICATION,
		"Bandyta patvirtinti neegzistuojantį kompensacijos prašymą");
	
	LOG.warn("** Bnadyta patvirtinti neegzistuojantį prašymą [{}]**", id);

	return new ResponseEntity<String>("Kompensacijos prašymas nerastas", HttpStatus.BAD_REQUEST);
    }
	
}
