/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package config;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author vietduc
 */
@javax.ws.rs.ApplicationPath("api")
public class ApplicationApiConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        
        resources.add(config.CORSFilter.class);
        resources.add(rest.UserRest.class);
        resources.add(rest.SessionRest.class);
        
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        
    }
    
}