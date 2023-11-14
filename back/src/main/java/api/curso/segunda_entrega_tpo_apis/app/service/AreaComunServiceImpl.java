package api.curso.segunda_entrega_tpo_apis.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.curso.segunda_entrega_tpo_apis.app.model.dao.IAreaComunDAO;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.AreaComun;


@Service
public class AreaComunServiceImpl implements IAreaComunService {

	@Autowired
	private IAreaComunDAO areasComunesDAO;
	
	@Override
	public List<AreaComun> findAll() {
		List<AreaComun> areasComunes = areasComunesDAO.findAll();
		return areasComunes;
		
	}

	@Override
	public AreaComun findById(int id) {
		AreaComun areaComun =areasComunesDAO.findById(id);
		return areaComun;
	}

	@Override
	public void save(AreaComun areaComun) {
		areasComunesDAO.save(areaComun);
	}

	@Override
	public void update(int areaComunId, AreaComun areaComun) {
		AreaComun areaComunExistente =areasComunesDAO.findById(areaComunId);
		if(areaComunExistente != null) {
			areaComunExistente.setPiso(areaComun.getPiso());
			areaComunExistente.setNombre(areaComun.getNombre());
			areasComunesDAO.save(areaComunExistente);
		}
	}

	@Override
	public void deleteById(int id) {
	areasComunesDAO.deleteById(id);
	}

}
