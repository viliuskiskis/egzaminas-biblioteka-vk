package it.akademija.compensationApplication;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.application.ApplicationStatus;
import it.akademija.compensationApplication.childData.ChildData;
import it.akademija.compensationApplication.childData.ChildDataInfo;
import it.akademija.compensationApplication.childData.ChildDataService;
import it.akademija.compensationApplication.kindergartenData.KindergartenData;
import it.akademija.compensationApplication.kindergartenData.KindergartenDataInfo;
import it.akademija.compensationApplication.kindergartenData.KindergartenDataService;
import it.akademija.user.User;
import it.akademija.user.UserInfo;
import it.akademija.user.UserService;

@Service
public class CompensationApplicationService {
	
	@Autowired
	private CompensationApplicationDAO compensationApplicationDAO;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private KindergartenDataService kindergartenDataService;
	
	@Autowired
	private ChildDataService childDataService;

	/**
	 * Create an compensation application for logged in user's child with specified child data.
	 * Receives and updates user data. Sets received
	 * main guardian, child data to kindergarten data to application.
	 * 
	 * @param currentUsername
	 * @param data
	 */
	@Transactional
	public CompensationApplication createNewCompensationApplication(CompensationApplicationDTO compensationApplicationDTO) {
		
		CompensationApplication compensationApplication = new CompensationApplication();
		
		compensationApplication.setSubmitedAt(LocalDate.now());
		compensationApplication.setApplicationStatus(ApplicationStatus.Pateiktas);
		
		User user = userService
				.getUserByUsername(compensationApplicationDTO.getMainGuardian().getUsername());
		
		compensationApplication.setMainGuardian(user);
		
		KindergartenData kindergartenData = kindergartenDataService
				.creteNewKindergartenData(compensationApplicationDTO.getKindergartenData());
		
		compensationApplication.setKindergartenData(kindergartenData);
		
		ChildData childData = childDataService
				.createNewChildData(compensationApplicationDTO);
		
		compensationApplication.setChildData(childData);

		compensationApplicationDAO.save(compensationApplication);
		
		childData.setCompensationApplication(compensationApplication);
		kindergartenData.setCompensationApplication(compensationApplication);
		
		return compensationApplication;
	}
	
	/**
	 * 
	 * Get information about submitted compensation applications for logged in user
	 * 
	 * @param currentUsername
	 * @return set of user compensation applications
	 */
	@Transactional(readOnly = true)
	public Set<CompensationApplicationInfoUser> getAllUserCompensationApplicationsInfoUser(String currentUsername) {
		return compensationApplicationDAO.findAllUserCompensationApplications(currentUsername);
	}
	
	/**
	 * 
	 * Get information about submitted compensation application for logged in user
	 * 
	 * @param currentUsername, id
	 * @return user compensation application
	 */
	@Transactional(readOnly = true)
	public CompensationApplicationInfo getUserCompensationApplicationInfo(String currentUsername, Long id) {
		
		CompensationApplicationInfo compensationApplicationInfo = 
				compensationApplicationDAO.findUserCompensationApplication(currentUsername, id);
		
		KindergartenDataInfo kindergartenDataInfo = 
				kindergartenDataService.getKindergartenDataByCompensationApplicationId(id);
		compensationApplicationInfo.setKindergartenDataInfo(kindergartenDataInfo);
		
		UserInfo userInfo = userService.getUserInfoByUsername(currentUsername);
		compensationApplicationInfo.setMainGuardianInfo(userInfo);
		
		ChildDataInfo childDataInfo = 
				childDataService.getChildDataInfoByCompensationApplicationId(id);
		compensationApplicationInfo.setChildDataInfo(childDataInfo);
		return compensationApplicationInfo;
	}
	
	/**
	 * 
	 * Get information about submitted compensation application for manager
	 * 
	 * @param id
	 * @return compensation applications
	 */
	@Transactional(readOnly = true)
	public CompensationApplicationInfo getCompensationApplicationInfo(Long id) {
		
		CompensationApplicationInfo compensationApplicationInfo = 
				compensationApplicationDAO.findUserCompensationApplication(id);
		
		KindergartenDataInfo kindergartenDataInfo = 
				kindergartenDataService.getKindergartenDataByCompensationApplicationId(id);
		
		compensationApplicationInfo.setKindergartenDataInfo(kindergartenDataInfo);
		
		UserInfo userInfo = userService.getUserInfoById(id);
		
		compensationApplicationInfo.setMainGuardianInfo(userInfo);
		
		ChildDataInfo childDataInfo = 
				childDataService.getChildDataInfoByCompensationApplicationId(id);
		
		compensationApplicationInfo.setChildDataInfo(childDataInfo);
		
		return compensationApplicationInfo;
	}
	
	/**
	 * Delete user compensation application by id. Also deletes ChildData
	 * and KindergartenData connected to them. Accessible to User only.
	 *
	 * @param id
	 * 
	 */
	public void deleteCompensationApplicationById(Long id){
			
		compensationApplicationDAO.deleteById(id);
	}
	
	public boolean isCompensationApplicationPresentAndMatchesMainGuardian(Long id) {
		
		Optional<CompensationApplication> optionalCompensationApplication = 
				compensationApplicationDAO.findById(id);
		
		if (optionalCompensationApplication.isPresent()) {
			
			CompensationApplication compensationApplication = 
					optionalCompensationApplication.get();			
			
			User user = userService.findByUsername(SecurityContextHolder
					.getContext()
					.getAuthentication()
					.getName());
			
				if(compensationApplication.getMainGuardian().equals(user)) {
					return true;
				}	
		}
		return false;
	}
	
	/**
	 * 
	 * Check if compensation application for a child already exists
	 * 
	 * @param childPersonalCode
	 * @return true if exists
	 */
	public boolean childExistsByPersonalCode(String childPersonalCode) {
		return childDataService.childExistsByPersonalCode(childPersonalCode);
	}


	public boolean isCompensationApplicationExistsById(Long id) {
		return compensationApplicationDAO.existsById(id);
	}

	public void deactivateCompensationApplication(CompensationApplication compensationApplication) {
		compensationApplication.setApplicationStatus(ApplicationStatus.Neaktualus);
		compensationApplicationDAO.save(compensationApplication);
	}
	
	public void confirmCompensationApplication(CompensationApplication compensationApplication) {
		compensationApplication.setApplicationStatus(ApplicationStatus.Patvirtintas);
		compensationApplicationDAO.save(compensationApplication);
	}

	public CompensationApplication getCompensationApplicationById(Long id) {
		return compensationApplicationDAO.getById(id);
	}

	public Page<CompensationApplicationInfoUser> getPageFromCompensationApplications(Pageable pageable, String filter) {
	    
	    if (filter.equals("")) {
		return compensationApplicationDAO.findAllCompensationApplicationInfoUser(pageable);
	    }

	    	return compensationApplicationDAO.findAllCompensationsByChildPersonalCode(filter, pageable);
	}

}
