module.exports = {
    url: /^\//,
    method: "GET",
    route: [
        GetRoot,
    ]
}

let buildConfig = {
    AppName: "CustomViewBackend",
    Version: "0.1",
    Author: "IbrahimTahaSANLI",
    ForContact: "ibrahimtahasanli@gmail.com"
}

async function GetRoot(req, res, route){
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write(JSON.stringify(buildConfig));
    res.end();

    route.next();
}