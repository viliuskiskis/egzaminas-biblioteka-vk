package it.akademija.kindergartenchoise;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.akademija.application.Application;
import it.akademija.kindergarten.Kindergarten;
import it.akademija.kindergarten.KindergartenService;

@Service
public class KindergartenChoiseService {
	
	@Autowired
	KindergartenChoiseDAO kindergartenChoiseDAO;
	
	@Autowired
	KindergartenService kindergartenService;

	public KindergartenChoise saveKindergartenChoise(KindergartenChoise kindergartenChoise) {
		return kindergartenChoiseDAO.save(kindergartenChoise);
	}

	public void updateKindergartenChoises(
			KindergartenChoiseDTO kindergartenChoiseDTO, 
			Application application) {		
		
		List<Long> kindergartenChoisesIds = application
				.getKindergartenChoises()
				.stream().map(x -> x.getId())
				.collect(Collectors.toList());
			
		for(int i=0; i < kindergartenChoisesIds.size(); i++) {
			KindergartenChoise kindergartenChoise = kindergartenChoiseDAO
				.getById(kindergartenChoisesIds.get(i));
			
			int priority = kindergartenChoise
					.getKindergartenChoisePriority();
			
			for(int j=1; j<=5; j++) {
				if(priority == j) {
					Kindergarten kindergarten = kindergartenService
							.findById(kindergartenChoiseDTO
									.getKindergartenId(j));
					kindergartenChoise.setKindergarten(kindergarten);
					kindergartenChoise.setApplication(application);
					
					kindergartenChoiseDAO.save(kindergartenChoise);
				}
			}
		}
		
		
	}
	
	
}
