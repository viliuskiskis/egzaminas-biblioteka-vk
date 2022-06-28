package it.akademija.document;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DocumentService {

	@Autowired
	DocumentDAO documentDao;

	@Transactional
	public DocumentEntity getDocumentById(long id) {

		DocumentEntity doc = documentDao.getDocumentById(id);

		if (doc != null) {

			return doc;
		} else {

			return null;
		}
	}
	

	@Transactional
	public List<DocumentEntity> getDocumentsByUploaderId(long id) {

		return documentDao.findAll().stream()
				.filter(x -> x.getUploaderId() == id)
				.collect(Collectors.toList());
	}

	@Transactional
	public Long uploadDocument(MultipartFile file, String name, long uploaderId) {

	    if (file.getSize() <= 1024000 && 
		    file.getContentType().equals("application/pdf")) {
		
		DocumentEntity documentEntity = new DocumentEntity();

		try {
		    documentEntity.setName(name);
		    documentEntity.setType(file.getContentType());
		    documentEntity.setData(file.getBytes());
		    documentEntity.setSize(file.getSize());
		    documentEntity.setUploaderId(uploaderId);
		    documentEntity.setUploadDate(LocalDate.now());

		    documentDao.save(documentEntity);
		} catch (Exception e) {
		    e.printStackTrace();
		}

		return documentEntity.getId();

	    } else {
		return 0L;
	    }
	}

	@Transactional
	public void deleteDocument(long id) {
		documentDao.delete(getDocumentById(id));
	}

	@Transactional
	public boolean isUserIdMatchDocument(Long userId, Long documentId) {
		DocumentEntity documentEntity = documentDao.getById(documentId);
		
		if(documentEntity.getUploaderId() == userId) {
			return true;
		}
		
		return false;
	}


	public Page<DocumentViewmodel> getPageDocuments(Pageable pageable, String filter) {
		return documentDao.findAllDocumentViewModel(filter, pageable);
	}

}
