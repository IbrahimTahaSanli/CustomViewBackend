var views = require("../../data/view/views");

module.exports = {
    url: /^\/view/,
    method: "POST",
    route: [
        PostView,
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

async function PostView(req, res, route){
    await route.getBody()

    body = isJsonString(req.body);

    if(body === false)
    {
        res.writeHead( 400, {"Content-Type":"text/html"} );
        res.write("Json is not valid");
        res.end()
        return route.failRoute();
    }

    data = views.AddView(body);

    if(data === false){
        res.writeHead( 400, {"Content-Type":"text/html"} );
        res.write("Bad Request");
        res.end()
        return route.failRoute();
    }

    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write(data.Name === undefined? "dataadded": data.Name);
    res.end();

    route.next();
}