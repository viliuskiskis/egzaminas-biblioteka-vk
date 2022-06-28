package it.akademija.journal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
public class JournalController {

    @Autowired
    private JournalService journalService;
   
    /**
     * Get page of journal entries filtered by part of username
     * 
     * @param page - page number
     * @param size - number of entries in a page
     * @param username - part of username
     * @return page of journal entries
     */
    @Secured({ "ROLE_ADMIN" })
    @PostMapping(path = "/admin/getjournal/page")
    @ApiOperation(value = "Show all journal entries",
    		notes = "Showing all journal entries filtered by part of username and date")
    public ResponseEntity<Page<JournalEntry>> getJournalEntriesPage(@RequestBody JournalRequestDTO request) {

	Sort.Order order = new Sort.Order(Sort.Direction.DESC, "eventTime");

	Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), Sort.by(order));

	return new ResponseEntity<>(journalService.getAllJournalEntries(pageable, request), HttpStatus.OK);
    }

    public JournalService getJournalService() {
	return journalService;
    }

    public void setJournalService(JournalService journalService) {
	this.journalService = journalService;
    }

}
