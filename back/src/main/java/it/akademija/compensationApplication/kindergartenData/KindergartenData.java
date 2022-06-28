package it.akademija.compensationApplication.kindergartenData;


import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import it.akademija.compensationApplication.CompensationApplication;


@Entity
public class KindergartenData {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "compensation_application_id")
	private CompensationApplication compensationApplication;
	
	@NotBlank(message = "Pavadinimas privalomas")
	@Pattern(regexp = "\\S[\\s\\S]{2,50}")
	private String entityName;
	
	@Pattern(regexp = "[0-9]{9}", 
			message = "Įstaigos kodas turi būti sudarytas iš 9 skaitmenų")
	private String code;
	
	@Pattern(regexp = "[+]?[0-9]{4,17}", 
			message = "Telefono numeris gali būti sudarytas iš 4-17 skaitmenų")
	private String phone;
	
	@Pattern(regexp = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$", 
			message = "Įstaigos elektroninis paštas privalomas")
	private String email;
	
	@NotBlank(message = "Adresas privalomas")
	private String address;

	@Pattern(regexp = "[A-Za-z]{2}[0-9]{2}[A-z0-9]{11,30}", 
			message = "Įstaigos banko sąskaita privaloma")
	private String account;
	
	@Pattern(regexp = "[A-Za-z]{6}[A-Za-z0-9]{2,5}", 
			message = "Įstaigos banko kodas privalomas")
	private String bankCode;
	
	@Pattern(regexp = "[A-Za-zĄ-Žą-ž0-9\\s\\-]{2,50}", 
			message = "Įstaigos banko pavadinimas privalomas")
	private String bankName;
	
	public KindergartenData() {
		super();
	}

	public KindergartenData(String entityName, String code,
			String phone, String email, String address, String account, String bankCode, String bankName) {
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public CompensationApplication getCompensationApplication() {
		return compensationApplication;
	}

	public void setCompensationApplication(CompensationApplication compensationApplication) {
		this.compensationApplication = compensationApplication;
	}

	@Override
	public int hashCode() {
		return Objects.hash(account, address, bankCode, bankName, code, compensationApplication, email, entityName, id,
				phone);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		KindergartenData other = (KindergartenData) obj;
		return Objects.equals(account, other.account) && Objects.equals(address, other.address)
				&& Objects.equals(bankCode, other.bankCode) && Objects.equals(bankName, other.bankName)
				&& Objects.equals(code, other.code)
				&& Objects.equals(compensationApplication, other.compensationApplication)
				&& Objects.equals(email, other.email) && Objects.equals(entityName, other.entityName)
				&& Objects.equals(id, other.id) && Objects.equals(phone, other.phone);
	}
}
