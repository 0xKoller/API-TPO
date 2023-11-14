package api.curso.segunda_entrega_tpo_apis.app.service;

import java.util.List;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Reclamo;

public interface IReclamoService {
	public List<Reclamo> findAll();
	public Reclamo findById(int id);
	public void save(Reclamo reclamo);
	public void update(int reclamoId, Reclamo reclamo);
	public void deleteById(int id);
}
