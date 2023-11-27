package api.curso.segunda_entrega_tpo_apis.app.model.dao;

import java.util.List;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.AreaComun;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Edificio;

public interface IAreaComunDAO {
	public List<AreaComun> findAll();
	public AreaComun findById(int id);
	public List<AreaComun> findByIds(List<Integer> ids);
	public void save(AreaComun areaComun);
	public void deleteById(int id);
	
}
