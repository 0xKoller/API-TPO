package api.curso.segunda_entrega_tpo_apis.app.service;

import java.util.List;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Unidad;

public interface IUnidadService {
	public List<Unidad> findAll();
	public Unidad findById(int id);
	public void save(Unidad unidad);
	public void update(int unidadId, Unidad unidad);
	public void deleteById(int id);
}
