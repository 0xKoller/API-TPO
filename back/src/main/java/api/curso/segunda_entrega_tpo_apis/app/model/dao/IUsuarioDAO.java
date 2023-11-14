package api.curso.segunda_entrega_tpo_apis.app.model.dao;

import java.util.List;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Usuario;


public interface IUsuarioDAO {
	public List<Usuario> findAll();
	public Usuario findById(int id);
	public Usuario findUser(String nombreUsuario, String contrasenia);
	public void save(Usuario usuario);
	public void deleteById(int id);
}
