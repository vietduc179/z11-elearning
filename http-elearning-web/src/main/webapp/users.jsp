<%-- 
    Document   : users
    Created on : Jul 7, 2017, 2:07:16 PM
    Author     : vietduc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
   <head>
      <title>get and set properties Example</title>
   </head>
   
   <body>
      <jsp:useBean id = "students" class = "rest.UserRest"> 
         <jsp:setProperty name = "students" property = "firstName" value = "Zara"/>
         <jsp:setProperty name = "students" property = "lastName" value = "Ali"/>
         <jsp:setProperty name = "students" property = "age" value = "10"/>
      </jsp:useBean>

      <p>Student First Name: 
         <jsp:getProperty name = "students" property = "firstName"/>
      </p>
      
      <p>Student Last Name: 
         <jsp:getProperty name = "students" property = "lastName"/>
      </p>
      
      <p>Student Age: 
         <jsp:getProperty name = "students" property = "age"/>
      </p>

   </body>
</html>