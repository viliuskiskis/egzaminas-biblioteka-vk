package it.akademija.kindergarten;

public class KindergartenDTO {

    private String id;
    private String name;
    private String address;
    private String elderate;
    private String managerName;
    private String managerSurname;
    private int capacityAgeGroup2to3;
    private int capacityAgeGroup3to6;
    private Double latitude;
    private Double longitude;

    public KindergartenDTO() {

    }

    public KindergartenDTO(String id, String name, String address, String elderate, int capacityAgeGroup2to3,
	    int capacityAgeGroup3to6) {
	super();
	this.id = id;
	this.name = name;
	this.address = address;
	this.elderate = elderate;
	this.capacityAgeGroup2to3 = capacityAgeGroup2to3;
	this.capacityAgeGroup3to6 = capacityAgeGroup3to6;
    }

    public KindergartenDTO(String id, String name, String address, String elderate, String managerName,
	    String managerSurname, int capacityAgeGroup2to3, int capacityAgeGroup3to6) {
	super();
	this.id = id;
	this.name = name;
	this.address = address;
	this.elderate = elderate;
	this.managerName = managerName;
	this.managerSurname = managerSurname;
	this.capacityAgeGroup2to3 = capacityAgeGroup2to3;
	this.capacityAgeGroup3to6 = capacityAgeGroup3to6;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getAddress() {
	return address;
    }

    public void setAddress(String address) {
	this.address = address;
    }

    public String getElderate() {
	return elderate;
    }

    public void setElderate(String elderate) {
	this.elderate = elderate;
    }

    public int getCapacityAgeGroup2to3() {
	return capacityAgeGroup2to3;
    }

    public void setCapacityAgeGroup2to3(int capacityAgeGroup2to3) {
	this.capacityAgeGroup2to3 = capacityAgeGroup2to3;
    }

    public int getCapacityAgeGroup3to6() {
	return capacityAgeGroup3to6;
    }

    public void setCapacityAgeGroup3to6(int capacityAgeGroup3to6) {
	this.capacityAgeGroup3to6 = capacityAgeGroup3to6;
    }

    public String getManagerName() {
	return managerName;
    }

    public void setManagerName(String managerName) {
	this.managerName = managerName;
    }

    public String getManagerSurname() {
	return managerSurname;
    }

    public void setManagerSurname(String managerSurname) {
	this.managerSurname = managerSurname;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

}
