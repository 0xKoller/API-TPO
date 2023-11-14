package api.curso.segunda_entrega_tpo_apis.app.service;

import java.util.List;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.AreaComun;

public interface IAreaComunService {
	public List<AreaComun> findAll();
	public AreaComun findById(int id);
	public void save(AreaComun areaComun);
	public void update(int areaComunId, AreaComun areaComun);
	public void deleteById(int id);
}
