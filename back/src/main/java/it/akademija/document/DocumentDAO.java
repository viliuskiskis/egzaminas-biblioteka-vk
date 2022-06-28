package it.akademija.document;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DocumentDAO extends JpaRepository<DocumentEntity, Long> {

    DocumentEntity getDocumentById(long id);

    void deleteByUploaderId(long uploaderId);

    @Query("SELECT new it.akademija.document.DocumentViewmodel("
	    + "de.id, "
	    + "de.name, "
	    + "de.uploadDate, "
	    + "u.name, "
	    + "u.surname, "
	    + "pd.personalCode, "
	    + "u.userId) "
	    + "FROM DocumentEntity de "
	    + "JOIN User u "
	    + "ON de.uploaderId=u.userId "
	    + "JOIN ParentDetails pd "
	    + "ON u.userId=pd.user.id "
	    + "WHERE UPPER(CONCAT(u.name, ' ', u.surname)) "
	    + "LIKE(UPPER(CONCAT('%', ?1, '%')))")
    Page<DocumentViewmodel> findAllDocumentViewModel(String filter, Pageable pageable);
	
}
