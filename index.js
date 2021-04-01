"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StreamTest_1 = require("./apps/StreamTest");
var express = require('express');
var app = express();
var port = 3000;
var expressWs = require('express-ws')(app);
var axios = require('axios');
var backend = "https://api.arnold-tim.de";
var map = new Map();
function init() {
    map.set("0186cdd1-92f3-11eb-ad01-0242ac110002", new StreamTest_1.default());
    map.get("0186cdd1-92f3-11eb-ad01-0242ac110002").onDraw();
}
init();
app.get('/', function (req, res) {
    res.send('LEDWall Stream Server V1.0');
});
app.ws('/startLiveApp', function (ws, req) {
    if (req.query.session && req.query.appuuid) {
        axios.get(backend + "/auth/validateSession" + "?session=" + req.query.session).then(function (result) {
            if (result.data.success) {
                if (req.query.appuuid === "0186cdd1-92f3-11eb-ad01-0242ac110002") {
                    map.get(req.query.appuuid).onCreate();
                }
                else {
                    ws.send("Invalid App");
                    ws.close();
                }
                ws.send("THat geklappt");
            }
            else {
                ws.send("Invalid Session");
                ws.close();
            }
        });
    }
    else {
        ws.close();
    }
});
app.listen(port, function () {
    console.log("Stream App listening at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map