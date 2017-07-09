/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package manager;


import config.Config;

import entity.User;
import entity.User_;

import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import z11.rs.exception.*;

/**
 *
 * @author vietduc
 */
@Singleton
public class CommonBusiness {
    @PersistenceContext(unitName = Config.PERSISTENCE_UNIT_NAME)
    private EntityManager em;
    
    @EJB
    SessionManager sessionManager;
    
    
    
    public boolean isUserIdExsist(String userId) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        javax.persistence.criteria.CriteriaQuery cq = cb.createQuery();
        Root<User> root = cq.from(User.class);
        cq.select(root);
        cq.where(cb.equal(root.get(User_.userid), userId));
        List<Object> objs = em.createQuery(cq).getResultList();
        return objs.size() > 0;
    }
    
    
    public List<User> getAllUser() {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        javax.persistence.criteria.CriteriaQuery cq = cb.createQuery();
        Root<User> root = cq.from(User.class);
        cq.select(root);
        
        return em.createQuery(cq).getResultList();
    }
    
    public User getUser(String loginid) throws NotFoundException {
        int id = z11.S_tring.parseInt(loginid, 0);

        CriteriaBuilder cb = em.getCriteriaBuilder();
        javax.persistence.criteria.CriteriaQuery cq = cb.createQuery();
        Root<User> root = cq.from(User.class);
        cq.select(root);
        cq.where(cb.or(
                cb.equal(root.get(User_.email), loginid),
                cb.equal(root.get(User_.userid), loginid),
                cb.equal(root.get(User_.id), id)
            )
        );
        List<User> listUser = em.createQuery(cq).getResultList();
        if (listUser.size() > 0) {
            return listUser.get(0);
        }
        throw new NotFoundException("Not found loginid:" + loginid);
    }
    
    public User getUserById(int userid) throws NotFoundException {
        User user = em.find(User.class, userid);
        if (user == null) {
            throw new NotFoundException("Not found userid:" + userid);
        }
        return user;
    }
    
    public void validToken(String token1, String token2) throws NoPermissionException {
        if (!token1.equals(token2)) {
            throw new NoPermissionException("Valid token fail!");
        }
    }
}
