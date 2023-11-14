package api.curso.segunda_entrega_tpo_apis.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.curso.segunda_entrega_tpo_apis.app.model.dao.ImagenRepository;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Imagen;

@Service
public class ImagenServiceImpl implements IImagenService {

	@Autowired
	private ImagenRepository imagenRepository;

	@Override
	public Imagen findById(Long id) {
		Optional<Imagen> imagenOpt = imagenRepository.findById(id);
		return imagenOpt.orElse(null);
	}

	@Override
	public void save(Imagen imagen) {
		imagenRepository.save(imagen);
	}

}
