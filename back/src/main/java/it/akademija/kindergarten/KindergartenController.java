package it.akademija.kindergarten;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;

@RestController
@Api(value = "kindergarten")
@RequestMapping(path = "/api/darzeliai")
public class KindergartenController {

    private static final Logger LOG = LoggerFactory.getLogger(KindergartenController.class);

    @Autowired
    private KindergartenService kindergartenService;

    @Autowired
    private JournalService journalService;

    /**
     * Get list of all Kindergarten names and addresses with capacity of more than zero
     * 
     * @return list of kindergarten
     */
    @Secured({ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER" })
    @GetMapping
    @ApiOperation(value = "Get all kindergarten names and addresses with available places > 0")
    public List<KindergartenInfo> getAllWithNonZeroCapacity() {

	return kindergartenService.getAllWithNonZeroCapacity();
    }

    /**
     * Get list of all elderates
     * 
     * @return list of kindergarten
     */
    @Secured({ "ROLE_MANAGER" })
    @GetMapping("/manager/elderates")
    @ApiOperation(value = "Get all elderates")
    public Set<String> getAllElderates() {

	return kindergartenService.getAllElderates();
    }

    /**
     * Get specified Kindergarten information page, filtered by part of kindergarten name
     * 
     * @param page - page number
     * @param size - number of entries in a page
     * @param filter - part of kindergarten name
     * @return page of kindergarten information
     */
    @Secured({ "ROLE_MANAGER" })
    @GetMapping("/manager/page")
    @ApiOperation(value = "Get kindergarten information pages")
    public ResponseEntity<Page<Kindergarten>> getKindergartenPage(
	    @RequestParam(value = "page", required = false, defaultValue = "0") int page,
	    @RequestParam(value = "size", required = false, defaultValue = "10") int size,
	    @RequestParam(value = "filter", required = false, defaultValue = "") String filter) {

	Sort.Order order = new Sort.Order(Sort.Direction.ASC, "name").ignoreCase();

	Pageable pageable = PageRequest.of(page, size, Sort.by(order));

	return new ResponseEntity<Page<Kindergarten>>(
		kindergartenService.getKindergartenPage(pageable, filter.trim()), HttpStatus.OK);
    }

    /**
     * Create new kindergarten entity
     * 
     * @param kindergarten data
     * @return message
     */
    @Secured({ "ROLE_MANAGER" })
    @PostMapping("/manager/createKindergarten")
    @ApiOperation(value = "Create new kindergarten")
    public ResponseEntity<String> createNewKindergarten(
	    @ApiParam(value = "Kindergarten", required = true)
	    @Valid
	    @RequestBody KindergartenDTO kindergarten) {

	String id = kindergarten.getId();

	if (kindergartenService.findById(id) != null) {
	    
	    journalService.newJournalEntry(OperationType.ERROR, Long.parseLong(id), 
		    ObjectType.KINDERGARTEN, "Kuriamas darželis su jau egzistuojančiu įstaigos kodu");

	    LOG.warn("** Kuriamas darželis su jau egzistuojančiu įstaigos kodu [{}] **", id);

	    return new ResponseEntity<String>("Darželis su tokiu įstaigos kodu jau yra",
		    HttpStatus.CONFLICT);

	} else if (kindergartenService.nameAlreadyExists(kindergarten.getName().trim(), id)) {
	    
	    journalService.newJournalEntry(OperationType.ERROR, Long.parseLong(id),
		    ObjectType.KINDERGARTEN, "Kuriamas darželis su jau egzistuojančiu pavadinimu");

	    LOG.warn("** Kuriamas darželis su jau egzistuojančiu pavadinimu [{}] **",
		    kindergarten.getName().trim());

	    return new ResponseEntity<String>("Darželis su tokiu įstaigos pavadinimu jau yra",
		    HttpStatus.CONFLICT);

	} else {

	    kindergartenService.createNewKindergarten(kindergarten);
	    
	    journalService.newJournalEntry(OperationType.KINDERGARTEN_CREATED, Long.parseLong(id),
		    ObjectType.KINDERGARTEN, "Sukurtas naujas darželis");

	    LOG.info("** KindergartenController: kuriamas darzelis pavadinimu [{}] **",
		    kindergarten.getName());

	    return new ResponseEntity<String>("Darželis sukurtas sėkmingai", HttpStatus.OK);
	}
    }

    /**
     * Delete kindergarten entity with specified id
     * 
     * @param id - kindergarten id
     * @return message
     */
    @Secured({ "ROLE_MANAGER" })
    @DeleteMapping("/manager/delete/{id}")
    @ApiOperation(value = "Delete kindergarten by ID")
    public ResponseEntity<String> deleteKindergarten(
	    @ApiParam(value = "Kindergarten id", required = true)
	    @PathVariable String id) {

	journalService.newJournalEntry(OperationType.KINDERGARTEN_DELETED, Long.parseLong(id),
		ObjectType.KINDERGARTEN, "Darželis ištrintas");
	
	LOG.info("** KindergartenController: ištrintas darzelis, kurio id: [{}] **", id);

	return kindergartenService.deleteKindergarten(id);
    }

    /**
     * Update kindergarten by id
     * 
     * @param updated
     * @param id
     * @return
     */
    @Secured({ "ROLE_MANAGER" })
    @PutMapping("/manager/update/{id}")
    @ApiOperation(value = "Update kindergarten by ID")
    public ResponseEntity<String> updateKindergarten(
	    @ApiParam(value = "Kindergarten data", required = true)
	    @Valid
	    @RequestBody KindergartenDTO updated,
	    @ApiParam(value = "Kindergarten id", required = true)
	    @PathVariable String id) {

	if (kindergartenService.findById(id) == null) {
	    
	    journalService.newJournalEntry(OperationType.ERROR, Long.parseLong(id),
		    ObjectType.KINDERGARTEN, "Bandyta keisti neegzistuojantį darželį");

	    LOG.warn("** KindergartenController: Darželio įstaigos kodu [{}] nėra **", id);

	    return new ResponseEntity<String>("Darželis su tokiu įstaigos kodu nerastas",
		    HttpStatus.NOT_FOUND);

	} else if (kindergartenService.nameAlreadyExists(updated.getName().trim(), id)) {
	    
	    journalService.newJournalEntry(OperationType.ERROR, Long.parseLong(id),
		    ObjectType.KINDERGARTEN, "Bandyta pakeisti į egzistuojantį darželį");

	    LOG.warn("** Darželis pavadinimu [{}] jau egzituoja **", updated.getName().trim());

	    return new ResponseEntity<String>("Darželis su tokiu įstaigos pavadinimu jau yra",
		    HttpStatus.CONFLICT);

	} else {

	    kindergartenService.updateKindergarten(id, updated);
	    
	    journalService.newJournalEntry(OperationType.KINDERGARTEN_UPDATED, Long.parseLong(id),
		    ObjectType.KINDERGARTEN, "Darželio duomenys atnaujinti");

	    LOG.info("** KindergartenController: atnaujinamas darželis ID [{}] **", id);

	    return new ResponseEntity<String>("Darželio duomenys atnaujinti sėkmingai", HttpStatus.OK);
	}
    }

    /**
     * Get page of Kindergarten statistics sorted by name
     * 
     * @param page - page number
     * @param size - number of entries in a page
     * @return page of kindergarten statistics
     */
    @Secured({ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER" })
    @GetMapping("/statistics")
    @ApiOperation(value = "Get page of kindergarten statistics sorted by name")
    public Page<KindergartenStatistics> getKindergartenStatistics(
	    @RequestParam(value = "page", required = false, defaultValue = "0") int page,
	    @RequestParam(value = "size", required = false, defaultValue = "10") int size) {

	Sort.Order order = new Sort.Order(Sort.Direction.ASC, "name").ignoreCase();

	Pageable pageable = PageRequest.of(page, size, Sort.by(order));

	return kindergartenService.getKindergartenStatistics(pageable);
    }

    public KindergartenService getGartenService() {
	return kindergartenService;
    }

    public void setGartenService(KindergartenService gartenService) {
	this.kindergartenService = gartenService;
    }

}
