package api.curso.segunda_entrega_tpo_apis.app.model.dao;

import java.util.List;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Reclamo;

public interface IReclamoDAO {
	public List<Reclamo> findAll();
	public List<Reclamo> findByIds(List<Integer> ids);
	public Reclamo findById(int id);
	public void save(Reclamo reclamo);
	public void deleteById(int id);
	
}
