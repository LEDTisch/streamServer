"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StreamTest = /** @class */ (function () {
    function StreamTest() {
    }
    StreamTest.prototype.getName = function () {
        return "StreamTest";
    };
    StreamTest.prototype.getUUID = function () {
        return "0186cdd1-92f3-11eb-ad01-0242ac110002";
    };
    StreamTest.prototype.getVersion = function () {
        return "1.0";
    };
    StreamTest.prototype.onCreate = function () {
        console.log("App is runninf");
    };
    StreamTest.prototype.onDataReceive = function (data, playerID) {
    };
    StreamTest.prototype.onDraw = function () {
        console.log("Das ist ein Test");
    };
    StreamTest.prototype.onRun = function () {
    };
    StreamTest.prototype.onStop = function () {
    };
    return StreamTest;
}());
exports.default = StreamTest;
//# sourceMappingURL=StreamTest.js.map