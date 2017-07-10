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

    /**
     * @return the sessionValue
     */
    public String getSessionValue() {
        return sessionValue;
    }

    /**
     * @param sessionValue the sessionValue to set
     */
    public void setSessionValue(String sessionValue) {
        this.sessionValue = sessionValue;
    }

    private final HashMap<String, String> sessionMapping;
    
    private String sessionValue;
    
    public SessionManager() {
        sessionMapping = new HashMap<>();
    }
    
    
    
    public boolean checkSession(String session) {
        return sessionMapping.containsKey(session);
    }
    
//    public int getUserFromSession(String session) {
//        return sessionMapping.get(session).getUserid();
//    }
    
    public boolean addSession(String appsession, String authsession) {
        try {
            sessionMapping.put(appsession, authsession);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public void removeSession(String session) {
        sessionMapping.remove(session);
    }
    
//    public int getSessionUserId(HttpServletRequest request) throws UnauthorizedException {
//        try {
//            String sessionId = z11.rs.auth.AuthUtil.checkAuthorization(request);
//            int userId = getUserFromSession(sessionId);
//            return userId;
//        } catch (Exception e) {
//            throw new UnauthorizedException("Unauthorized:" + e.getMessage());
//        }
//        
//    }
    
//    public Collection<SessionInfo> getAllSessions() {
//        return sessionMapping.values();
//    }
    
}
