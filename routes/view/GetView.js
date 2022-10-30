var views = require("../../data/view/views");

module.exports = {
    url: /^\/view/,
    method: "GET",
    route: [
        GetViews,
    ]
}

async function GetViews(req, res, route){
    responseData = views.GetViews();

    if(typeof responseData.length == undefined || typeof responseData.length == null){
        res.writeHead(500, {"Content-Type":"text/html"});
        res.write("Internal server error");
        res.end();
        return route.failRoute();
    }

    responseData = JSON.parse(JSON.stringify(responseData));
    responseData.forEach(elem => {
        delete elem.View;
    });


    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
    });
    res.write(JSON.stringify(responseData));
    res.end();

    route.next();
}