package api.curso.segunda_entrega_tpo_apis.app.model.dao;

import java.util.List;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Edificio;

public interface IEdificioDAO{
	public List<Edificio> findAll();
	public List<Edificio> findByIds(List<Integer> ids);
	public Edificio findById(int id);
	public void save(Edificio edificio);
	public void deleteById(int id);
	
}
