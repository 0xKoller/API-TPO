package api.curso.segunda_entrega_tpo_apis.app.model.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.Usuario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class UsuarioDAOImpl implements IUsuarioDAO {


	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	@Transactional(readOnly = true)
	public List<Usuario> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);
		
		Query<Usuario> getQuery = currentSession.createQuery("from Usuario", Usuario.class);
		List<Usuario> usuarios = getQuery.getResultList();
		
		return usuarios;
	}

	@Override
	@Transactional(readOnly = true)
	public Usuario findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		
		Usuario usuario = currentSession.get(Usuario.class, id);
		
		return usuario;
	}
	
	@Override
	@Transactional(readOnly = true)
	public Usuario findUser(String nombreUsuario, String contrasenia) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Usuario> theQuery = currentSession.createQuery("FROM Usuario WHERE nombreUsuario=:nombreUsuario", Usuario.class);
		theQuery.setParameter("nombreUsuario", nombreUsuario);

		Usuario usuario = theQuery.uniqueResult();

		if(usuario != null && checkContrasenia(contrasenia, usuario.getContrasenia())) {
			return usuario;
		} else {
			return null;
		}
	}
	
	private boolean checkContrasenia(String contrasenia, String contraseniaDB) {
		BCryptPasswordEncoder contraseniaEncoder = new BCryptPasswordEncoder();
		System.out.println("Contrasenia: " + contrasenia);
		System.out.println("contraseniaDB: " + contraseniaDB);
		boolean isContraseniaMatch = contraseniaEncoder.matches(contrasenia, contraseniaDB);
		
		return isContraseniaMatch;
	}


	@Override
	@Transactional
	public void save(Usuario usuario) {
		Session currentSession = entityManager.unwrap(Session.class);
		
		currentSession.persist(usuario);
	}

	@Override
	@Transactional
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query theQuery = currentSession.createQuery("delete from Usuario where id=:idUsuario");
		theQuery.setParameter("idUsuario", id);
		theQuery.executeUpdate();
	}
}
