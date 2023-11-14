package api.curso.segunda_entrega_tpo_apis.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.curso.segunda_entrega_tpo_apis.app.model.dao.IUsuarioDAO;
import api.curso.segunda_entrega_tpo_apis.app.model.entity.Usuario;

@Service
public class UsuarioServiceImpl implements IUsuarioService{


	@Autowired
	private IUsuarioDAO usuariosDAO;
	
	@Override
	public List<Usuario> findAll() {
		List<Usuario> usuarios = usuariosDAO.findAll();
		return usuarios;
		
	}

	@Override
	public Usuario findById(int id) {
		Usuario usuario = usuariosDAO.findById(id);
		return usuario;
	}

	@Override
	public void save(Usuario usuario) {
		usuariosDAO.save(usuario);
	}

	@Override
	public void update(int usuarioId, Usuario usuario) {
		Usuario usuarioExistente = usuariosDAO.findById(usuarioId);
		if(usuarioExistente != null) {
			usuarioExistente.setNombre(usuario.getNombre());
			usuarioExistente.setNombreUsuario(usuario.getNombreUsuario());
			usuarioExistente.setContrasenia(usuario.getContrasenia());
			usuarioExistente.setDni(usuario.getDni());
			usuarioExistente.setEmail(usuario.getEmail());
			usuarioExistente.setRolUsuario(usuario.getRolUsuario());
			usuariosDAO.save(usuarioExistente);
		}
	}

	@Override
	public void deleteById(int id) {
		usuariosDAO.deleteById(id);
	}

	@Override
	public Usuario findUser(String nombreUsuario, String contrasenia) {
		Usuario usuario = usuariosDAO.findUser(nombreUsuario, contrasenia);
		return usuario;
	}

	

}
