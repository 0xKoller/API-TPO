package api.curso.segunda_entrega_tpo_apis.app.model.dao;

import java.util.List;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Unidad;

public interface IUnidadDAO {
	public List<Unidad> findAll();
	public Unidad findById(int id);
	public void save(Unidad unidad);
	public void deleteById(int id);
	
}
