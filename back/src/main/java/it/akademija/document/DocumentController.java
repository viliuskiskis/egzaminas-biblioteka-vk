package it.akademija.document;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.application.ApplicationController;
import it.akademija.journal.JournalService;
import it.akademija.journal.ObjectType;
import it.akademija.journal.OperationType;
import it.akademija.user.UserService;

@RestController
@Api(value = "Documents")
@RequestMapping(path = "/api/documents")
public class DocumentController {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);

    @Autowired
    DocumentService documentService;

    @Autowired
    UserService userService;

    @Autowired
    private JournalService journalService;

    /**
     * Download document for user
     * 
     * @param id - document id
     * @return document byte array
     */
    @Secured("ROLE_USER")
    @GetMapping(path = "/get/{id}")
    public byte[] getDocumentFileById(
	    @ApiParam(value = "id", required = true)
	    @PathVariable Long id) {

	journalService.newJournalEntry(OperationType.CERTIFICATE_DOWNLOADED, id,
		ObjectType.CERTIFICATE, "Atsisiųsta pažyma");
	
	LOG.info("** DocumentController: pažyma [{}] parsiųsta**", id);

	return documentService.getDocumentById(id).getData();
    }

    /**
     * Upload document
     * 
     * @param file - multipart file
     * @param fileName
     * @return message
     */
    @Secured("ROLE_USER")
    @PostMapping(path = "/upload")
    public ResponseEntity<String> UploadDocument(
	    @RequestParam(value = "file", required = true) MultipartFile file,
	    @RequestParam(value = "name", required = true) String fileName) {

	Long userId = userService.findByUsername(
		SecurityContextHolder.getContext().getAuthentication().getName()).getUserId();

	long documentId = documentService.uploadDocument(file, fileName, userId);
	
	if (documentId != 0) {

	    journalService.newJournalEntry(OperationType.CERTIFICATE_SUBMITED, documentId,
		    ObjectType.CERTIFICATE, "Įkelta pažyma");
	    
	    LOG.info("** DocumentController: pažyma [{}] įkelta**", documentId);

	    return new ResponseEntity<String>("Dokumentas buvo įkeltas sėkmingai", HttpStatus.CREATED);

	} else {
	    journalService.newJournalEntry(OperationType.ERROR, null,
		    ObjectType.CERTIFICATE, "Nepavyko įkelti pažymos");

	    LOG.warn("** Įvyko klaida įkeliant dokumentą: [{}]**", fileName);
	    
	    return new ResponseEntity<String>("Įvyko klaida", HttpStatus.BAD_REQUEST);
	}
    }

    /**
     * Delete document by id
     * 
     * @param id - document id
     * @return message
     */
    @Secured("ROLE_USER")
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteDocument(
	    @ApiParam(value = "id", required = true)
	    @PathVariable final long id) {

	documentService.deleteDocument(id);
	
	journalService.newJournalEntry(OperationType.CERTIFICATE_DELETED, id,
		ObjectType.CERTIFICATE, "Ištrinta pažyma");
	
	LOG.info("** DocumentController: pažyma [{}] ištrinta**", id);

	return new ResponseEntity<String>("Dokumentas su tokiu id buvo ištrintas.", HttpStatus.OK);
    }

    /**
     * Get list of logged user documents
     * 
     * @return list of document info
     */
    @Secured("ROLE_USER")
    @GetMapping(path = "/documents")
    public List<DocumentViewmodel> getLoggedUserDocuments() {

	List<DocumentEntity> docEntityList =
		documentService.getDocumentsByUploaderId(
					userService.findByUsername(
						SecurityContextHolder.getContext()
								     .getAuthentication()
								     .getName())
							.getUserId());

	List<DocumentViewmodel> docViewmodelList = new ArrayList<>();

	for (DocumentEntity doc : docEntityList) {
	    docViewmodelList.add(new DocumentViewmodel(
		    			doc.getId(),
		    			doc.getName(),
		    			doc.getUploadDate()));
	}
	return docViewmodelList;
    }

    /**
     * Download document for Manager
     * 
     * @param id - document id
     * @return document byte array
     */
    @Secured("ROLE_MANAGER")
    @GetMapping(path = "manager/get/{id}")
    @ApiOperation(value = "Get document by id")
    public byte[] getForManagerDocumentFileById(
	    @ApiParam(value = "id", required = true)
	    @PathVariable Long id) {

	journalService.newJournalEntry(OperationType.CERTIFICATE_DOWNLOADED, id, ObjectType.CERTIFICATE,
		"Atsisiųsta pažyma");

	return documentService.getDocumentById(id).getData();
    }
	
    /**
     * Get page from documents list view filtered by part of user name and surname
     * 
     * @param pageNumber
     * @param pageSize
     * @param sortBy
     * @param filter
     * @return page from document list view
     */
    @Secured("ROLE_MANAGER")
    @GetMapping(path = "manager/get")
    @ApiOperation(value = "Get page from documents list with specified user name and surname")
    public Page<DocumentViewmodel> getDocumentsPage(
	    @RequestParam(value = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
	    @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
	    @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
	    @RequestParam(value = "filter", required = false, defaultValue = "") String filter) {

	Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));

	return documentService.getPageDocuments(pageable, filter.trim());
    }
	
}
