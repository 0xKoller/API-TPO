package api.curso.segunda_entrega_tpo_apis.app.service;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Imagen;

public interface IImagenService {
	public Imagen findById(Long id);

	public void save(Imagen cliente);
}
