var responses = require("../../data/responses/responses");

module.exports = {
    url: /^\/response/,
    method: "GET",
    route: [
        GetResponses,
    ]
}

async function GetResponses(req, res, route){
    responseData = responses.GetResponses();

    if(typeof responseData.length == undefined || typeof responseData.length == null){
        res.writeHead(500, {"Content-Type":"text/html"});
        res.write("Internal server error");
        res.end();
        return route.failRoute();
    }

    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write(JSON.stringify(responseData));
    res.end();

    route.next();
}