<%-- 
    Document   : auth
    Created on : Jul 10, 2017, 11:44:05 AM
    Author     : vietduc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Authentication</title>
    </head>
    
    <body>
        <h2>Redirect login to Z11 Authorize center</h2>
        
        <script>
            window.location.href = 'http://localhost:7001/http-z11-auth-api2/api/login/app/elearning/${sessionvalue}';
        </script>
        
    </body>
</html>
