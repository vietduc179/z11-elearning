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
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import z11.rs.exception.UnauthorizedException;

/*

 Client client = ClientBuilder.newClient();
 WebTarget target = client.target("http://localhost:7001/http-z11-auth-api2/api/me");
 Response result = target.request(MediaType.APPLICATION_JSON_TYPE).header(HttpHeaders.AUTHORIZATION, sessionValue).get();

 if (result.getStatus() == Response.Status.OK.getStatusCode()) {

*/

/**
 *
 * @author vietduc
 */

@Singleton
public class SessionManager {


    private final HashMap<String, String> sessionMapping;
    private Client restClient = ClientBuilder.newClient();
    
    public SessionManager() {
        sessionMapping = new HashMap<>();
    }

    public boolean checkSession(String session) {
        return sessionMapping.containsKey(session);
    }
    
    public int getUserIdFromSession(String appsession) throws Exception {
        WebTarget target = restClient.target("http://localhost:7001/http-z11-auth-api2/api/me");
        Response result = target.request(MediaType.APPLICATION_JSON_TYPE).header(HttpHeaders.AUTHORIZATION, sessionMapping.get(appsession)).get();

        if (result.getStatus() == Response.Status.OK.getStatusCode()) {
            String userIdStr = result.readEntity(String.class);
            return Integer.parseInt(userIdStr);
        }
        throw new Exception();
    }
    
    public String getUserFromSession(String appsession) throws Exception {
        WebTarget target = restClient.target("http://localhost:7001/http-z11-auth-api2/api/me/info");
        Response result = target.request(MediaType.APPLICATION_JSON_TYPE).header(HttpHeaders.AUTHORIZATION, sessionMapping.get(appsession)).get();

        if (result.getStatus() == Response.Status.OK.getStatusCode()) {
            String userIdStr = result.readEntity(String.class);
            return userIdStr;
        }
        throw new Exception();
    }
    
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
    
    public int getSessionUserId(HttpServletRequest request) throws UnauthorizedException {
        try {
            String appSessionId = z11.rs.auth.AuthUtil.checkAuthorization(request);
            int userId = getUserIdFromSession(appSessionId);
            return userId;
        } catch (Exception e) {
            throw new UnauthorizedException("Unauthorized:" + e.getMessage());
        }
        
    }
    
    public String getSessionUser(HttpServletRequest request) throws UnauthorizedException {
        try {
            String appSessionId = z11.rs.auth.AuthUtil.checkAuthorization(request);
            String userStr = getUserFromSession(appSessionId);
            return userStr;
        } catch (Exception e) {
            throw new UnauthorizedException("Unauthorized:" + e.getMessage());
        }

    }
    
//    public Collection<SessionInfo> getAllSessions() {
//        return sessionMapping.values();
//    }
    
}
