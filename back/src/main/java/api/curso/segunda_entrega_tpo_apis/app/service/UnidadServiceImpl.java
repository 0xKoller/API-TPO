package api.curso.segunda_entrega_tpo_apis.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.curso.segunda_entrega_tpo_apis.app.model.dao.IUnidadDAO;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Unidad;

@Service
public class UnidadServiceImpl implements IUnidadService {
	@Autowired
	private IUnidadDAO unidadesDAO;
	
	@Override
	public List<Unidad> findAll() {
		List<Unidad> unidades = unidadesDAO.findAll();
		return unidades;
		
	}

	@Override
	public Unidad findById(int id) {
		Unidad unidad = unidadesDAO.findById(id);
		return unidad;
	}

	@Override
	public void save(Unidad unidad) {
		unidadesDAO.save(unidad);
	}

	@Override
	public void update(int unidadId, Unidad unidad) {
		Unidad unidadExistente = unidadesDAO.findById(unidadId);
		if(unidadExistente != null) {
			unidadExistente.setPiso(unidad.getPiso());
			unidadExistente.setNroUnidad(unidad.getNroUnidad());
			unidadExistente.setEstado(unidad.getEstado());
			unidadExistente.setDuenio(unidad.getDuenio());
			unidadExistente.setInquilino(unidad.getInquilino());
			unidadExistente.setEdificio(unidad.getEdificio());
			unidadesDAO.save(unidadExistente);
		}
	}

	@Override
	public void deleteById(int id) {
		unidadesDAO.deleteById(id);
	}

}
