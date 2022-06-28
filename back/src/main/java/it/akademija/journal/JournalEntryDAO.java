package it.akademija.journal;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JournalEntryDAO extends JpaRepository<JournalEntry, Long>{
	
	@Query("SELECT j FROM JournalEntry j")
	Page<JournalEntry> getAllJournalEntries(Pageable pageable);
	
	@Query("SELECT j FROM JournalEntry j WHERE j.userName LIKE(CONCAT('%', ?1, '%')) AND j.eventTime BETWEEN ?2 and ?3")
	Page<JournalEntry> getJournalEntriesByUsernameAndTime(Pageable pageable, String username, LocalDateTime startTime, LocalDateTime endTime);
	
	@Query("SELECT j FROM JournalEntry j WHERE j.eventTime BETWEEN ?1 and ?2")
	Page<JournalEntry> getJournalEntriesByTime(Pageable pageable, LocalDateTime startTime, LocalDateTime endTime);
	
	@Query("SELECT j FROM JournalEntry j WHERE j.userName IS NULL AND j.eventTime BETWEEN ?1 and ?2")
	Page<JournalEntry> getNullJournalEntriesByTime(Pageable pageable, LocalDateTime startTime, LocalDateTime endTime);
	
	List<JournalEntry> findByUserName(String username);
}
