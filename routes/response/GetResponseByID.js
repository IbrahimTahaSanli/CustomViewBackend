var url = require("url");

var responses = require("../../data/responses/responses");

module.exports = {
    url: /^\/response\/[0-9a-fA-F]+/,
    method: "GET",
    route: [
        GetResponseByID,
    ]
}

async function GetResponseByID(req, res, route){

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

    responseData = responses.GetResponseByID(id);

    if(responseData === undefined){
        res.writeHead(404, {"Content-Type":"text/html"});
        res.write("Response Not Found");
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