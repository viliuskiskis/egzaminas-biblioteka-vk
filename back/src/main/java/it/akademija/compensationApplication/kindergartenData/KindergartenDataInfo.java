package it.akademija.compensationApplication.kindergartenData;

public class KindergartenDataInfo {
	private String entityName;
	private String code;
	private String phone;
	private String email;
	private String address;
	private String account;
	private String bankCode;
	private String bankName;
	
	public KindergartenDataInfo(String entityName, String code, String phone, String email, String address,
			String account, String bankCode, String bankName) {
		super();
		this.entityName = entityName;
		this.code = code;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.account = account;
		this.bankCode = bankCode;
		this.bankName = bankName;
	}
	
	public String getEntityName() {
		return entityName;
	}
	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getBankCode() {
		return bankCode;
	}
	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	
	
}
