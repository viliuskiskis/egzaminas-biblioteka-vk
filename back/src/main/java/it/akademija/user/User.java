package it.akademija.user;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.akademija.application.Application;
import it.akademija.compensationApplication.CompensationApplication;
import it.akademija.role.Role;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userId;

	@Enumerated(EnumType.STRING)
	private Role role;

	@NotEmpty(message = "Vardas privalomas!")
	@Pattern(regexp = "^[A-zÀ-ž\\s-]{2,32}")
	@Column
	private String name;

	@NotEmpty(message = "Pavardė privaloma!")
	@Pattern(regexp = "^[A-zÀ-ž\\s-]{2,32}")
	@Column
	private String surname;

	@Email
	@NotEmpty(message = "El. paštas privalomas!")
	@Pattern(regexp = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$", 
	message = "Elektroninis paštas privalomas")
	@Column
	private String email;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "users_parentDetails", joinColumns = {
			@JoinColumn(name = "users_id", referencedColumnName = "userId") }, inverseJoinColumns = {
					@JoinColumn(name = "parentDetails_id", referencedColumnName = "parentDetailsId") })
	@JsonIgnore
	private ParentDetails parentDetails;

	@NotEmpty
	@Email
	@Column
	private String username;

	@NotEmpty
	@Column
	private String password;

	@JsonIgnore
	@OneToMany(mappedBy = "mainGuardian", cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
	private Set<Application> userApplications;
	
	@OneToMany(mappedBy = "mainGuardian", cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
	private Set<CompensationApplication> compensationApplications;

	public User() {
	}

	public Set<CompensationApplication> getCompensationApplications() {
		return compensationApplications;
	}

	public void setCompensationApplications(Set<CompensationApplication> compensationApplications) {
		this.compensationApplications = compensationApplications;
	}

	public User(Role role, String name, String surname, String email, String username, String password) {
		super();
		this.role = role;
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
	}

	public User(Role role, String name, String surname, String email, ParentDetails parentDetails, String username,
			String password) {
		super();
		this.role = role;
		this.name = name;
		this.surname = surname;
		this.parentDetails = parentDetails;
		this.email = email;
		this.username = username;
		this.password = password;
	}

	public User(Long userId, Role role, String username) {
		this.userId = userId;
		this.role = role;
		this.username = username;
	}
	
	public void setUserApplications(Set<Application> userApplications) {
		this.userApplications = userApplications;
	}

	public Set<Application> getUserApplications() {
		return userApplications;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public ParentDetails getParentDetails() {
		return parentDetails;
	}

	public void setParentDetails(ParentDetails parentDetails) {
		if (parentDetails != null) {
			parentDetails.setUser(this);
		}

		this.parentDetails = parentDetails;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (userId == null) {
			if (other.userId != null)
				return false;
		} else if (!userId.equals(other.userId))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

}