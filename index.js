"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToSocket = exports.ledtisch = void 0;
var Worker_1 = require("./Worker");
var VirtualLEDWall_1 = require("./virtualdevices/VirtualLEDWall");
var express = require('express');
var app = express();
var port = 3000;
var expressWs = require('express-ws')(app);
var axios = require('axios');
var connections = [];
var Neopixel_1 = require("./virtualdevices/Neopixel");
var backend = "https://api.arnold-tim.de";
function init() {
    exports.ledtisch = new VirtualLEDWall_1.VirtualLEDWall(10, 15, 1);
    exports.ledtisch.init(new Neopixel_1.Neopixel());
}
init();
app.get('/', function (req, res) {
    res.send('LEDWall Stream Server V1.0');
});
app.ws('/startLiveApp', function (ws, req) {
    if (req.query.session && req.query.appuuid) {
        axios.get(backend + "/auth/validateSession" + "?session=" + req.query.session).then(function (result) {
            if (result.data.success) {
                Worker_1.startApp(req.query.appuuid, ws, req.query.session);
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
function writeToSocket(socketid, message) {
    connections[socketid].send(message);
}
exports.writeToSocket = writeToSocket;
app.listen(port, function () {
    console.log("Stream App listening at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map