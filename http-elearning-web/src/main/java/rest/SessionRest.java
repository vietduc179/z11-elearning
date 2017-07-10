/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import config.AbstractFacade;
import entity.User;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import manager.SessionManager;

/**
 *
 * @author vietduc
 */
@Stateless
@Path("sessions")
public class SessionRest {
    
    @PersistenceContext(unitName = "z11-elearning-pu")
    private EntityManager em;

    @EJB SessionManager sessionManager;
    
    public SessionRest() {
    }
    
    @POST
    @Path("mapping")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})
    public Response postLogin(
            @FormParam("appsession") @NotNull String appsession,
            @FormParam("authsession") @NotNull String authsession,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response) {
        
        sessionManager.addSession(appsession, authsession);
        
        return Response.status(Response.Status.CREATED).entity("CREATED").build();
    }
    
}
