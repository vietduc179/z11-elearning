/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ui;

import config.Config;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import manager.SessionManager;

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
@Stateless
@Path("login")
public class UILoginRest {
    @PersistenceContext(unitName = Config.PERSISTENCE_UNIT_NAME)
    private EntityManager em;
    
    @EJB SessionManager sessionManager;
    
    @GET
    public void showLoginPage(
            @Context HttpServletRequest request,
            @Context HttpServletResponse response) throws Exception {
        String appsessionvalue = z11.rs.auth.AuthUtil.getAuthorization(request, response);
        request.setAttribute("sessionvalue", appsessionvalue);
        request.getRequestDispatcher("/auth.jsp")
                .forward(request, response);
    }
    
    
}
