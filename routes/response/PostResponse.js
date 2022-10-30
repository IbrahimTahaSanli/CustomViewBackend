var responses = require("../../data/responses/responses");

module.exports = {
    url: /^\/response/,
    method: "POST",
    route: [
        PostResponse,
    ]
};

function isJsonString(str){
    try {
        valid = JSON.parse(str);
        return valid;
    } catch (e) {
        return false;
    }
}

async function PostResponse(req, res, route){
    await route.getBody()

    body = isJsonString(req.body);

    if(body == false)
    {
        res.writeHead( 400, {"Content-Type":"text/html"} );
        res.write("Json is not valid");
        res.end()
        return route.failRoute();
    }

    data = responses.AddResponse(body);

    if(!data){
        res.writeHead( 400, {"Content-Type":"text/html"} );
        res.write("Bad Request");
        res.end()
        return route.failRoute();
    }

    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write("DataAdded");
    res.end();

    route.next();
}