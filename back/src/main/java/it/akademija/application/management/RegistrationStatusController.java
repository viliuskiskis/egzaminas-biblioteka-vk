package it.akademija.application.management;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.queue.ApplicationQueueService;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;

@RestController
@Api(value = "status-manager")
@RequestMapping(path = "/api")
public class RegistrationStatusController {

    private static final Logger LOG = LoggerFactory.getLogger(RegistrationStatusController.class);

    @Autowired
    private RegistrationStatusService statusService;

    @Autowired
    private ApplicationQueueService queueService;

    @Autowired
    private JournalService journalService;

    /**
     * Changes registration status
     * 
     * @return registration status
     * @param status
     */
    @Secured({ "ROLE_MANAGER" })
    @PostMapping("/status/{registrationActive}")
    @ApiOperation(value = "Set application status")
    public RegistrationStatus setStatus(
	    @ApiParam(value = "registrationActive", required = true)
	    @PathVariable boolean registrationActive) {
	
	String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

	if (registrationActive) {
	    
	    journalService.newJournalEntry(OperationType.REGISTRATION_STARTED, null,
		    ObjectType.REGISTRATION, "Pra??ym?? registracija prad??ta");
	    
	    LOG.info("Naudotojas [{}] pradeda pra??ym?? registracij??", currentUsername);
	} else {
	    
	    journalService.newJournalEntry(OperationType.REGISTRATION_ENDED, null,
		    ObjectType.REGISTRATION, "Pra??ym?? registracija sustabdyta");
	    
	    LOG.info("Naudotojas [{}] sustabdo pra??ym?? registracij??", currentUsername);
	}
	return statusService.setStatus(registrationActive);
    }

    /**
     * Returns registration status
     * 
     * @return registration status
     */
    @Secured({ "ROLE_USER", "ROLE_ADMIN", "ROLE_MANAGER" })
    @GetMapping("/status")
    @ApiOperation(value = "Get application status")
    public RegistrationStatus getStatus() {
	
	return statusService.getStatus();
    }

    /**
     * Start queue processing
     * 
     * @return message
     */
    @Secured({ "ROLE_MANAGER" })
    @PostMapping("/queue/process")
    @ApiOperation(value = "Process queue")
    public ResponseEntity<String> processQueue() {
	
	String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
	
	queueService.processApplicationsToQueue();
	
	journalService.newJournalEntry(OperationType.QUEUE_FORMED, null,
		ObjectType.QUEUE, "Pra??ym?? eil?? suformuota");
	
	LOG.info("Naudotojas [{}] pradeda eili?? formavim??", currentUsername);
	
	return new ResponseEntity<String>("Eil?? suformuota", HttpStatus.OK);
    }

    /**
     * Confirm queue
     * 
     * @return message
     */
    @Secured({ "ROLE_MANAGER" })
    @PostMapping("/queue/confirm")
    @ApiOperation(value = "Confirm queue")
    public ResponseEntity<String> confirmQueue() {
	
	String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
	
	journalService.newJournalEntry(OperationType.QUEUE_CONFIRMED, null,
		ObjectType.QUEUE, "Pra??ym?? eil?? patvirtinta");
	
	LOG.info("Naudotojas [{}] tvirtina eiles.", currentUsername);
	
	return queueService.confirmApplicationsInQueue();
    }

    /**
     * Lock queue editing for Manager
     */
    @Secured({ "ROLE_ADMIN" })
    @PostMapping("/queue/lock")
    @ApiOperation(value = "Lock queue editing for Manager")
    public void lockQueueEditing() {
	
	String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
	
	journalService.newJournalEntry(OperationType.QUEUE_LOCKED, null,
		ObjectType.QUEUE, "Pra??ym?? eil??s redagavimas u??rakintas");
	
	LOG.info("Naudotojas [{}] u??rakina eili?? redagavim??.", currentUsername);
	
	statusService.lockQueueEditing();
    }

    /**
     * Unlock queue editing for Manager
     */
    @Secured({ "ROLE_ADMIN" })
    @PostMapping("/queue/unlock")
    @ApiOperation(value = "Unlock queue editing for Manager")
    public void unlockQueueEditing() {
	
	String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
	
	journalService.newJournalEntry(OperationType.QUEUE_UNLOCKED, null,
		ObjectType.QUEUE, "Pra??ym?? eil??s redagavimas atrakintas");
	
	LOG.info("Naudotojas [{}] atrakina eili?? redagavim??.", currentUsername);
	
	statusService.unlockQueueEditing();
    }

    public RegistrationStatusService getStatusService() {
	return statusService;
    }

    public void setStatusService(RegistrationStatusService statusService) {
	this.statusService = statusService;
    }

    public ApplicationQueueService getQueueService() {
	return queueService;
    }

    public void setQueueService(ApplicationQueueService queueService) {
	this.queueService = queueService;
    }

}
