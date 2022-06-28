package it.akademija.contracts;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.Application;
import it.akademija.application.ApplicationDAO;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;

@RestController
@Api(value = "contractsBlah")
@RequestMapping(path = "/api/contract")
public class ContractsController {

    @Autowired
    private ContractsService contractsService;

    @Autowired
    private ApplicationDAO applicationDAO;
    
    @Autowired
    private JournalService journalService;

    /**
     * Get contract for logged user by application id
     * 
     * @param id
     * @return byte[]
     */
    @Secured({ "ROLE_USER" })
    @GetMapping("/user/{id}")
    @ApiOperation(value = "Get contract by application id and username")
    public ResponseEntity<byte[]> getUserContract(
	    @ApiParam(value = "Application id", required = true) @PathVariable Long id) {
	
	if (id == null) {
	    
	    journalService.newJournalEntry(OperationType.ERROR, id,
		    ObjectType.CONTRACT, "Nepavyko parsisiųsti sutarties");
	    
		return new ResponseEntity<byte[]>(new byte[0], HttpStatus.BAD_REQUEST);
	}

	String currentUsername = SecurityContextHolder.getContext()
						      .getAuthentication()
						      .getName();
	String applicationUsername = "";
	Optional<Application> optionalApplication = applicationDAO.findById(id);

	if (optionalApplication.isPresent()) {
	    applicationUsername = optionalApplication.get()
						     .getMainGuardian()
						     .getUsername();
	}
	if (currentUsername.equals(applicationUsername)) {
	    
	    journalService.newJournalEntry(OperationType.CONTRACT_DOWNLOADED, id,
		    ObjectType.CONTRACT, "Parsisiųsta sutartis");
	    
	    return contractsService.generateContractPDF(id);
	} else {
	    journalService.newJournalEntry(OperationType.ERROR, id,
		    ObjectType.CONTRACT, "Nepavyko parsisiųsti sutarties");
	    
	    return new ResponseEntity<byte[]>(new byte[0], HttpStatus.FORBIDDEN);
	}
    }

    /**
     * Get contract for logged manager by application id
     * 
     * @param id
     * @return byte[]
     */
    @Secured({ "ROLE_MANAGER" })
    @GetMapping("/manager/{id}")
    @ApiOperation(value = "Get contract by application id")
    public ResponseEntity<byte[]> getManagerContract(
	    @ApiParam(value = "Application id", required = true) @PathVariable Long id) {
	if (id == null) {
	    
	    journalService.newJournalEntry(OperationType.ERROR, id,
		    ObjectType.CONTRACT, "Nepavyko parsisiųsti sutarties");
	    
	    return new ResponseEntity<byte[]>(new byte[0], HttpStatus.BAD_REQUEST);
	}
	journalService.newJournalEntry(OperationType.CONTRACT_DOWNLOADED, id,
		ObjectType.CONTRACT, "Parsisiųsta sutartis");
	
	return contractsService.generateContractPDF(id);
    }

}
