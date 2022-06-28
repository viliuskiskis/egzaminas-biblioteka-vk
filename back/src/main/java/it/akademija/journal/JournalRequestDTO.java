package it.akademija.journal;

import java.time.LocalDateTime;

public class JournalRequestDTO {

    private int page;
    private int size;
    private String username = "";
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public JournalRequestDTO() {
	super();
    }

    public JournalRequestDTO(int page, int size, String username, LocalDateTime startTime, LocalDateTime endTime) {
	super();
	this.page = page;
	this.size = size;
	this.username = username;
	this.startTime = startTime;
	this.endTime = endTime;
    }

    public int getPage() {
	return page;
    }

    public void setPage(int page) {
	this.page = page;
    }

    public int getSize() {
	return size;
    }

    public void setSize(int size) {
	this.size = size;
    }

    public String getUsername() {
	return username;
    }

    public void setUsername(String username) {
	this.username = username;
    }

    public LocalDateTime getStartTime() {
	return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
	this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
	return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
	this.endTime = endTime;
    }

}
