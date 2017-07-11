<%-- 
    Document   : login
    Created on : Jul 10, 2017, 8:34:40 AM
    Author     : vietduc
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <link rel="stylesheet" href='<%=request.getContextPath()%>/css/bootstrap.min.css'>
        <link rel="stylesheet" href='<%=request.getContextPath()%>/css/bootstrap-theme.min.css'>
        
        <title>Home Page</title>
    </head>
    <body>
        <div class="col-sm-8">

            <div class="page-header"><h3>Hello ${userStr}</h3></div>
            
        </div>
    </body>
</html>
