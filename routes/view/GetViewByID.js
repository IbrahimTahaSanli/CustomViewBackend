var url = require("url");

var views = require("../../data/view/views");

module.exports = {
    url: /^\/view\/[0-9a-fA-F]+/,
    method: "GET",
    route: [
        GetViewByID,
    ]
}

async function GetViewByID(req, res, route){

    pathParam = route.getPathAsArray();
    if(pathParam.length != 2){
        res.writeHead( 400, {"Content-Type":"text/html"} );
        res.write("Bad Request");
        res.end()
        return route.failRoute();
    }

    id = pathParam[1]
    if( id === null || id === undefined  ){
        res.writeHead( 400, {"Content-Type":"text/html"} );
        res.write("Bad Request");
        res.end()
        return route.failRoute();
    }

    responseData = views.GetViewByID(id);

    if(responseData === undefined){
        res.writeHead(404, {"Content-Type":"text/html"});
        res.write("View Not Found");
        res.end();
        return route.failRoute();
    }

    if(typeof responseData.length == null){
        res.writeHead(500, {"Content-Type":"text/html"});
        res.write("Internal server error");
        res.end();
        return route.failRoute();
    }


    

    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
    });
    res.write(JSON.stringify(responseData));
    res.end();

    route.next();
}