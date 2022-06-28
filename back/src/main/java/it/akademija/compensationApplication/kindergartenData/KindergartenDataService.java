package it.akademija.compensationApplication.kindergartenData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KindergartenDataService {
	
	@Autowired
	private KindergartenDataDAO kindergartenDataDAO;

	public KindergartenData creteNewKindergartenData(KindergartenDataDTO kindergartenDataDTO) {
		
		KindergartenData kindergartenData = new KindergartenData(
				kindergartenDataDTO.getEntityName(),
				kindergartenDataDTO.getCode(),
				kindergartenDataDTO.getPhone(),
				kindergartenDataDTO.getEmail(),
				kindergartenDataDTO.getAddress(),
				kindergartenDataDTO.getAccount(),
				kindergartenDataDTO.getBankCode(),
				kindergartenDataDTO.getBankName());
				
		kindergartenDataDAO.save(kindergartenData);
		
		return kindergartenData;
	}

	public void deleteKindergartenData(Long id) {
		kindergartenDataDAO.deleteById(id);
	}

	public KindergartenDataInfo getKindergartenDataByCompensationApplicationId(Long id) {
		return kindergartenDataDAO.getByCompensationApplication(id);
	}

	public KindergartenData updateKindergartenData(KindergartenDataDTO kindergartenDataDTO, Long id) {
		
		KindergartenData kindergartenData = kindergartenDataDAO.getById(id);
		
		kindergartenData.setEntityName(kindergartenDataDTO.getEntityName());
		kindergartenData.setAddress(kindergartenDataDTO.getAddress());
		kindergartenData.setEmail(kindergartenDataDTO.getEmail());
		kindergartenData.setPhone(kindergartenDataDTO.getPhone());
		kindergartenData.setBankName(kindergartenDataDTO.getBankName());
		kindergartenData.setBankCode(kindergartenDataDTO.getBankCode());
		kindergartenData.setAccount(kindergartenDataDTO.getAccount());
		kindergartenData.setCode(kindergartenDataDTO.getCode());
		
		return kindergartenDataDAO.save(kindergartenData);
	}

}
