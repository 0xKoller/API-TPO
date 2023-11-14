package api.curso.segunda_entrega_tpo_apis.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.curso.segunda_entrega_tpo_apis.app.model.dao.IReclamoDAO;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Reclamo;

@Service
public class ReclamoServiceImpl implements IReclamoService {

	@Autowired
	private IReclamoDAO reclamosDAO;
	
	@Override
	public List<Reclamo> findAll() {
		List<Reclamo> reclamos = reclamosDAO.findAll();
		return reclamos;
		
	}

	@Override
	public Reclamo findById(int id) {
		Reclamo reclamo = reclamosDAO.findById(id);
		return reclamo;
	}

	@Override
	public void save(Reclamo reclamo) {
		reclamosDAO.save(reclamo);
	}

	@Override
	public void update(int reclamoId, Reclamo reclamo) {
		Reclamo reclamoExistente = reclamosDAO.findById(reclamoId);
		if(reclamoExistente != null) {
			reclamoExistente.setUsuario(reclamo.getUsuario());
			reclamoExistente.setUnidad(reclamo.getUnidad());
			reclamoExistente.setAreaComun(reclamo.getAreaComun());
			reclamoExistente.setDescripcion(reclamo.getDescripcion());
			reclamoExistente.setEdificio(reclamo.getEdificio());
			reclamoExistente.setEstado(reclamo.getEstado());
			reclamoExistente.setFechaCreacion(reclamo.getFechaCreacion());
			reclamoExistente.setFechaModificacion(reclamo.getFechaModificacion());
			reclamosDAO.save(reclamoExistente);
		}
	}

	@Override
	public void deleteById(int id) {
		reclamosDAO.deleteById(id);
	}


}
