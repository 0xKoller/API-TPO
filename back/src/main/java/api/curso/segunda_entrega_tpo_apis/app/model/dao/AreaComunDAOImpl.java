package api.curso.segunda_entrega_tpo_apis.app.model.dao;

import java.util.List;


import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import api.curso.segunda_entrega_tpo_apis.app.model.entity.AreaComun;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;


@Repository
public class AreaComunDAOImpl implements IAreaComunDAO {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	@Transactional(readOnly = true)
	public List<AreaComun> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);
		
		Query<AreaComun> getQuery = currentSession.createQuery("from AreaComun", AreaComun.class);
		List<AreaComun> areasComuness = getQuery.getResultList();
		
		return areasComuness;
	}

	@Override
	@Transactional(readOnly = true)
	public AreaComun findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		
		AreaComun areasComunes = currentSession.get(AreaComun.class, id);
		
		return areasComunes;
	}

	@Override
	@Transactional
	public void save(AreaComun areasComunes) {
		Session currentSession = entityManager.unwrap(Session.class);
		
		currentSession.persist(areasComunes);
	}

	@Override
	@Transactional
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query theQuery = currentSession.createQuery("delete from AreaComun where id=:idAreaComun");
		theQuery.setParameter("idAreaComun", id);
		theQuery.executeUpdate();
	}

}
