package it.akademija.journal;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.user.User;
import it.akademija.user.UserDAO;

@Service
public class JournalService {
    
    private ZoneId ltTimezone = ZoneId.of("Europe/Vilnius");

    @Autowired
    private JournalEntryDAO journalEntryDAO;

    @Autowired
    private UserDAO userDAO;

    @Transactional(readOnly = true)
    public Page<JournalEntry> getAllJournalEntries(Pageable pageable, JournalRequestDTO request) {
	
	if (request.getUsername().equals("") && request.getStartTime() == null && request.getEndTime() == null ) {
	    return journalEntryDAO.getAllJournalEntries(pageable);
	    
	} else {
	    
	    String username = request.getUsername().trim();
	    LocalDateTime startTime = request.getStartTime();
	    LocalDateTime endTime = request.getEndTime();
	    
	    if (startTime == null) {
		startTime = LocalDateTime.parse("2000-01-01T00:00:00.00");
	    } 
		
	    if (endTime == null) {
		endTime = LocalDateTime.parse("3000-01-01T00:00:00.00");
	    } 
	    
	    if (username.equals("")) {
		return journalEntryDAO.getJournalEntriesByTime(pageable, startTime, endTime);
	    }
	    
	    if (username.equals("NULL")) {
		return journalEntryDAO.getNullJournalEntriesByTime(pageable, startTime, endTime);
	    }

	    return journalEntryDAO.getJournalEntriesByUsernameAndTime(pageable, username, startTime, endTime);
	}
	   
    }

	/**
	 * Metodas visiems atvejams, kai pasiekiamas user iš SecurityContext
	 */

	@Transactional
	public void newJournalEntry(OperationType operationType, Long objectID, ObjectType objectType,
			String entryMessage) {

		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		User currentUser = userDAO.findByUsername(currentUsername);
		Long currentUserID = 0L;
				
		if(currentUser!=null) {
			currentUserID = currentUser.getUserId();
		} 
		
		JournalEntry entry = new JournalEntry(currentUserID, currentUsername, LocalDateTime.now(ltTimezone), operationType,
				objectID, objectType, entryMessage);

		journalEntryDAO.saveAndFlush(entry);
	}

	/**
	 * GDPR related method to remove username from system logs after User asks to
	 * delete their data.
	 * 
	 * @param username
	 */
	public void depersonalizeUserLogs(String username) {
		List<JournalEntry> userJournalEntries = journalEntryDAO.findByUserName(username);

		for (JournalEntry entry : userJournalEntries) {
			entry.setUserName("pašalinta pagal BDAR");
		}

		journalEntryDAO.saveAll(userJournalEntries);

	}

	/**
	 * Metodas sėkmingo prisijungimo atvejui, kad nereikėtų ieškoti userID
	 * duombazėje
	 */

	@Transactional
	public void newJournalEntry(OperationType operationType, ObjectType objectType, String entryMessage) {

		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User currentUser = userDAO.findByUsername(currentUsername);
		Long currentUserID = 0L;
		
		if(currentUser!=null) {
			currentUserID = currentUser.getUserId();
		} 
		
		JournalEntry entry = new JournalEntry(currentUserID, currentUsername, LocalDateTime.now(ltTimezone), operationType,
				currentUserID, objectType, entryMessage);

		journalEntryDAO.saveAndFlush(entry);
	}

	/**
	 * Metodas atvejams, kai SecurityContext'e nelieka/nėra userio - logout ir
	 * unsuccessful login atvejais. Nesėkmingo prisijungimo atveju currentUserID,
	 * objectID reikšmes paduoti null
	 */

	@Transactional
	public void newJournalEntry(Long currentUserID, String currentUsername, OperationType operationType, Long objectID,
			ObjectType objectType, String entryMessage) {

		JournalEntry entry = new JournalEntry(currentUserID, currentUsername, LocalDateTime.now(ltTimezone), operationType,
				objectID, objectType, entryMessage);

		journalEntryDAO.saveAndFlush(entry);
	}
}
