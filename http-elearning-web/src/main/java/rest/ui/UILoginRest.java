/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest.ui;

import common.Util;
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
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import manager.CommonBusiness;
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
    @EJB CommonBusiness commonBusiness;
    
    @GET
    public void showLoginPage(
            @Context HttpServletRequest request,
            @Context HttpServletResponse response) throws Exception {
        String appsessionvalue = z11.rs.auth.AuthUtil.getAuthorization(request, response);
        request.setAttribute("sessionvalue", appsessionvalue);
        request.getRequestDispatcher("/auth.jsp")
                .forward(request, response);
    }
    
    
    
    @GET
    @Path("remote")
    public void getLoginRemote(
            @Context HttpServletRequest request,
            @Context HttpServletResponse response) throws Exception {
        
        if (sessionManager.checkSession(request)) {
            Util.redirectToUri(request, response, "ui/home");
                        
        } else {
            request.getRequestDispatcher("/login.jsp").forward(request, response);
        }
    }
    
    @POST
    @Path("remote")
    public void postLoginRemote(
            @FormParam("login_id") @NotNull String login_id,
            @FormParam("password") @NotNull String password,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response) throws Exception {
        String appsessionvalue = z11.rs.auth.AuthUtil.getAuthorization(request, response);
        Client client = ClientBuilder.newClient();
        WebTarget target = client.target("http://localhost:7001/http-z11-auth-api2/api/login");

        MultivaluedMap<String, String> formData = new MultivaluedHashMap<>();
        formData.add("login_id", login_id);
        formData.add("password", password);

        Response result = target.request().post(Entity.form(formData));

        if (result.getStatus() == Response.Status.ACCEPTED.getStatusCode()) {
            sessionManager.addSession(appsessionvalue, result.getHeaderString(HttpHeaders.AUTHORIZATION));
            Util.redirectToUri(request, response, "ui/home");
        } else {
            request.setAttribute("login_result", "Username or password not correct!");
            request.getRequestDispatcher("/login.jsp")
                    .forward(request, response);
        }
    }
}
