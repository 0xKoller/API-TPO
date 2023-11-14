package api.curso.segunda_entrega_tpo_apis.app.service;

import java.util.List;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Usuario;

public interface IUsuarioService {
	public List<Usuario> findAll();
	public Usuario findById(int id);
	public Usuario findUser(String nombreUsuario, String contrasenia);
	public void save(Usuario usuario);
	public void update(int usuarioId, Usuario usuario);
	public void deleteById(int id);
}
