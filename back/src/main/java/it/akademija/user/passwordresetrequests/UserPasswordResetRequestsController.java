package it.akademija.user.passwordresetrequests;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;
import it.akademija.user.UserDAO;
import it.akademija.user.UserService;

@RestController
@Api(value = "Password Reset Requests")
@RequestMapping(path = "/passwordresetrequests")
public class UserPasswordResetRequestsController {

    @Autowired
    UserPasswordResetRequestsService userPasswordResetRequestsService;

    @Autowired
    UserService userService;
    
    @Autowired
    UserDAO userDAO;
    
    @Autowired
    JournalService journalService;

    private static final Logger LOG = LoggerFactory.getLogger(UserPasswordResetRequestsController.class);

    /**
     * Get all password reset requests
     * 
     * @return list of password reset requests
     */
    @Secured({ "ROLE_ADMIN" })
    @GetMapping(path = "/getAllRequests")
    @ApiOperation(value = "Returns a list of userId that want their password reset.")
    public List<UserPasswordResetRequestsEntity> getAllPasswordResetRequests() {

	return userPasswordResetRequestsService.getAllRequests();
    }

    /**
     * Request password reset
     * 
     * @param username
     * @return message
     */
    @PostMapping(path = "/request/{username}")
    @ApiOperation(value = "Request password reset")
    public ResponseEntity<String> requestPasswordReset(
	    @ApiParam(value = "username", required = true)
	    @PathVariable(value = "username") final String username) {
	
	Long id = userDAO.findByUsername(username).getUserId();
	journalService.newJournalEntry(null, null, OperationType.PASSWORD_REQUEST_SENT, id,
		ObjectType.USER, "Prašymas atstatyti slaptažodį išsiųstas");

	LOG.info("** " + this.getClass().getName()
		+ ": Naujas prašymas atstatyti slaptažodį naudotojo: " + username + " **");

	userPasswordResetRequestsService.requestPasswordReset(username);

	return new ResponseEntity<String>(
		"Pranešimas administratoriui sėkmingai išsiųstas", HttpStatus.OK);
    }

    /**
     * Delete password reset request
     * 
     * @param username
     * @return message
     */
    @Secured({ "ROLE_ADMIN" })
    @DeleteMapping(path = "/delete/{username}")
    @ApiOperation(value = "Delete password request")
    public ResponseEntity<String> deletePasswordResetRequest(
	    @ApiParam(value = "username", required = true)
	    @PathVariable(value = "username") final String username) {
	
	Long id = userDAO.findByUsername(username).getUserId();
	journalService.newJournalEntry(OperationType.PASSWORD_REQUEST_DELETED, id,
		ObjectType.USER, "Prašymas atstatyti slaptažodį ištrintas");

	LOG.info("** " + this.getClass().getName()
		+ ": Trinamas naudotojo: " + username + " slaptažodžio atstatymo prašymas **");
	
	userPasswordResetRequestsService.deletePasswordRequest(username);

	return new ResponseEntity<String>("Prašymas ištrintas sėkmingai", HttpStatus.OK);
    }

}
