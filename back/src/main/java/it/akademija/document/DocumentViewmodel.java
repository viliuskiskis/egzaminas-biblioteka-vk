package it.akademija.document;

import java.time.LocalDate;

public class DocumentViewmodel {

	private long id;
	private String name;
	private LocalDate uploadDate;
	private String userFirstName;
	private String userLastName;
	private String userPersonalCode;
	private Long userId;
	
	

	public DocumentViewmodel() {
		super();
	}

	public DocumentViewmodel(Long id, 
			String name, 
			LocalDate uploadDate) {
		super();
		this.id = id;
		this.name = name;
		this.uploadDate = uploadDate;
	}
	
	
	
	public DocumentViewmodel(long id, 
			String name, 
			LocalDate uploadDate, 
			String userFirstName,
			String userLastName, 
			String userPersonalCode, 
			Long userId) {
		super();
		this.id = id;
		this.name = name;
		this.uploadDate = uploadDate;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userPersonalCode = userPersonalCode;
		this.userId = userId;
	}

	public long getId() {
	    return id;
	}

	public void setId(long id) {
	    this.id = id;
	}

	public String getName() {
	    return name;
	}

	public void setName(String name) {
	    this.name = name;
	}

	public LocalDate getUploadDate() {
	    return uploadDate;
	}

	public void setUploadDate(LocalDate uploadDate) {
	    this.uploadDate = uploadDate;
	}

	public String getUserFirstName() {
	    return userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
	    this.userFirstName = userFirstName;
	}

	public String getUserLastName() {
	    return userLastName;
	}

	public void setUserLastName(String userLastName) {
	    this.userLastName = userLastName;
	}

	public String getUserPersonalCode() {
	    return userPersonalCode;
	}

	public void setUserPersonalCode(String userPersonalCode) {
	    this.userPersonalCode = userPersonalCode;
	}

	public Long getUserId() {
	    return userId;
	}

	public void setUserId(Long userId) {
	    this.userId = userId;
	}

}
