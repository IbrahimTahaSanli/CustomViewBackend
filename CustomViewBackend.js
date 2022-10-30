const Nhttp = require("./Nhttp");

const GetView = require("./routes/view/GetView");
const GetViewByID = require("./routes/view/GetViewByID");
const PostView = require("./routes/view/PostView");

const GetResponses = require("./routes/response/GetResponse");
const GetResponseByID = require("./routes/response/GetResponseByID");
const PostResponse = require("./routes/response/PostResponse");

const Root = require("./routes/root");

let route = [
    GetViewByID,
    GetView,

    PostView,

    GetResponseByID,
    GetResponses,

    PostResponse,

    Root
]

const SERVERTIMEOUT = 4000;
const SERVERPOT = 1324;
const SERVERDOMAINNAME = "localhost";

nHttp = new Nhttp(
    route,
    SERVERPOT,
    SERVERTIMEOUT,
    opts = {
        DomainName: SERVERDOMAINNAME,
        PreSetHeaders:{
            "Access-Control-Allow-Origin": "http://localhost:1324",
            'Access-Control-Allow-Credentials': "true",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
        }
    }
).startServer();
