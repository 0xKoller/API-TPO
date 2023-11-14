package api.curso.segunda_entrega_tpo_apis.app.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.curso.segunda_entrega_tpo_apis.app.model.dao.IEdificioDAO;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Edificio;


@Service
public class EdificioServiceImpl implements IEdificioService {

	@Autowired
	private IEdificioDAO edificiosDAO;
	
	@Override
	public List<Edificio> findAll() {
		List<Edificio> edificios = edificiosDAO.findAll();
		return edificios;
		
	}

	@Override
	public Edificio findById(int id) {
		Edificio edificio = edificiosDAO.findById(id);
		return edificio;
	}

	@Override
	public void save(Edificio edificio) {
		edificio.setCreateAt(new Date());
		edificiosDAO.save(edificio);
	}

	@Override
	public void update(int edificioId, Edificio edificio) {
		Edificio edificioExistente = edificiosDAO.findById(edificioId);
		if(edificioExistente != null) {
			edificioExistente.setNombre(edificio.getNombre());
			edificioExistente.setDireccion(edificio.getDireccion());
			edificioExistente.setCreateAt(new Date());
			edificiosDAO.save(edificioExistente);
		}
	}

	@Override
	public void deleteById(int id) {
		edificiosDAO.deleteById(id);
	}

}
