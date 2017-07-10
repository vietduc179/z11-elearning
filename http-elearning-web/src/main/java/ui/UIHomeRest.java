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
import z11.rs.exception.UnauthorizedException;

/**
 *
 * @author vietduc
 */
@Stateless
@Path("home")
public class UIHomeRest {
    @PersistenceContext(unitName = Config.PERSISTENCE_UNIT_NAME)
    private EntityManager em;
    
    @EJB SessionManager sessionManager;
    
    @GET
    public void showHomePage(
            @Context HttpServletRequest request,
            @Context HttpServletResponse response) throws Exception {
        String userStr = null;
        try {
            userStr = sessionManager.getSessionUser(request);
        } catch (UnauthorizedException unauthorizedException) {
            userStr = "Error";
        }
        request.setAttribute("userStr", userStr);
        request.getRequestDispatcher("/home.jsp")
                .forward(request, response);
    }
    
}
