package it.akademija.compensationApplication.childData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.akademija.compensationApplication.CompensationApplicationDTO;

@Service
public class ChildDataService {
	
	@Autowired
	private ChildDataDAO childDataDAO;

	public ChildData createNewChildData(CompensationApplicationDTO compensationApplicationDTO) {
		
		ChildData childData = new ChildData();
		
		childData.setBirthdate(compensationApplicationDTO.getBirthdate());
		childData.setChildName(compensationApplicationDTO.getChildName());
		childData.setChildSurname(compensationApplicationDTO.getChildSurname());
		childData.setChildPersonalCode(compensationApplicationDTO.getChildPersonalCode());
		
		childDataDAO.save(childData);
		
		return childData;
	}

	public boolean childExistsByPersonalCode(String childPersonalCode) {
		return childDataDAO.existsChildDataByChildPersonalCode(childPersonalCode);
	}

	public void deleteChildData(Long id) {
		childDataDAO.deleteById(id);
	}

	public ChildDataInfo getChildDataInfoByCompensationApplicationId(Long id) {
		return childDataDAO.getChildDataInfoByCompensationApplicationId(id);
	}

	public void updateChildData(CompensationApplicationDTO compensationApplicationdDTO, Long id) {
		
		ChildData childData = childDataDAO.getChildDataByCompensationApplicationId(id);
		
		childData.setBirthdate(compensationApplicationdDTO.getBirthdate());
		childData.setChildName(compensationApplicationdDTO.getChildName());
		childData.setChildSurname(compensationApplicationdDTO.getChildSurname());
		childData.setChildPersonalCode(compensationApplicationdDTO.getChildPersonalCode());
		
		childDataDAO.save(childData);
		
	}
	
}
