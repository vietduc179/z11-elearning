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
import javax.validation.constraints.NotNull;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import manager.SessionManager;

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
        String sessionvalue = z11.rs.auth.AuthUtil.getAuthorization(request, response);
        request.setAttribute("sessionvalue", sessionvalue);
        request.getRequestDispatcher("/auth.jsp")
                .forward(request, response);
    }
    
    @GET
    @Path("token/{sessionValue}")
    public void assignLogin(
            @PathParam("sessionValue") String sessionValue,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response) throws Exception {
        sessionManager.setSessionValue(sessionValue);

        Client client = ClientBuilder.newClient();
        WebTarget target = client.target("http://localhost:7001/http-z11-auth-api2/api/me");
        Response result = target.request(MediaType.APPLICATION_JSON_TYPE).header(HttpHeaders.AUTHORIZATION, sessionValue).get();

        if (result.getStatus() == Response.Status.OK.getStatusCode()) {
            String userId = result.getEntity().toString();
            request.setAttribute("username", userId);
            request.getRequestDispatcher("/auth.jsp")
                    .forward(request, response);
        } else {
            request.setAttribute("username", "Fail to login");
            request.getRequestDispatcher("/home.jsp")
                    .forward(request, response);
        }
    }
    
    @POST
    public void showPostResultLoginPage(
            @FormParam("login_id") @NotNull String login_id,
            @FormParam("password") @NotNull String password,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response) throws Exception {
        
        if (login_id.contains("duc")) {
            request.setAttribute("username", login_id);
            request.getRequestDispatcher("/home.jsp")
                    .forward(request, response);
        } else {
            request.setAttribute("login_result", "Không thành công!");
            request.getRequestDispatcher("/login.jsp")
                    .forward(request, response);
        }
        
        
    }
    
}
