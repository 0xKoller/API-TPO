package api.curso.segunda_entrega_tpo_apis.app.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Imagen;

public interface ImagenRepository extends JpaRepository<Imagen, Long> {

}
