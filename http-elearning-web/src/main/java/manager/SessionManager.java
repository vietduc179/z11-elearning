/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package manager;

import dataobject.SessionInfo;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import javax.ejb.Singleton;
import javax.servlet.http.HttpServletRequest;
import z11.rs.exception.UnauthorizedException;

/**
 *
 * @author vietduc
 */

@Singleton
public class SessionManager {

    
    public SessionManager() {
        sessions = new HashMap<>();
    }
    
    private final HashMap<String, SessionInfo> sessions;
    
    public boolean checkSession(String session) {
        return sessions.containsKey(session);
    }
    
    public int getUserFromSession(String session) {
        return sessions.get(session).getUserid();
    }
    
    public boolean addSession(String session, int userId) {
        if (sessions.containsKey(session)) {
            return false;
        } else {
            sessions.put(session, new SessionInfo(session, userId));
        }
        return true;
    }
    
    public void removeSession(String session) {
        sessions.remove(session);
    }
    
    public void removeAllSession(String session) {
        removeUser(sessions.get(session).getUserid());
    }
    
    public void removeUser(int userId) {
        Iterator<String> it = sessions.keySet().iterator();
        while (it.hasNext()) {
            String key = it.next();
            SessionInfo sessionInfo = sessions.get(key);
            if (sessionInfo.getUserid() == userId) {
                it.remove();
            }
        }
    }
    
    public void removeAllUser() {
        sessions.clear();
    }
    
    public int getSessionUserId(HttpServletRequest request) throws UnauthorizedException {
        try {
            String sessionId = z11.rs.auth.AuthUtil.checkAuthorization(request);
            int userId = getUserFromSession(sessionId);
            return userId;
        } catch (Exception e) {
            throw new UnauthorizedException("Unauthorized:" + e.getMessage());
        }
        
    }
    
    public Collection<SessionInfo> getAllSessions() {
        return sessions.values();
    }
    
    
    
    
}
