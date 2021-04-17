"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamTest = void 0;
var index_1 = require("../index");
var StreamTest = /** @class */ (function () {
    function StreamTest() {
        this.fasttickdelay = 100; //75
        this.ison = []; //size 15
        this.fasttickercounter = 0;
        this.gameend = 0;
        this.referenzpoint = 4; //Point where the left roadside is
        this.carposx = this.referenzpoint + 1;
        this.carposy = 5;
        this.roadpieces = [[], [], [], [], [], [], [], [], [], []]; //array 10 x 16
        this.lasttick = 0;
        this.lastfasttick = 0;
        this.firstone = true;
        this.keepstate = 2; //Keep State meens a natural street
        this.reset();
    }
    StreamTest.prototype.reset = function () {
        for (var i = 0; i < 15; i++) {
            this.ison[i] = false;
        }
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 6; y++) {
                this.roadpieces[x][y] = false;
            }
        }
        //SystemInterface.table.clear()
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 15; y++) {
                this.roadpieces[x][y] = false;
            }
        }
        this.firstone = true;
        this.carposy = 5;
        this.carposx = 5;
        this.keepstate = 2;
        this.gameend = 0;
        this.fasttickdelay = 100;
        this.fasttickercounter = 1;
    };
    StreamTest.prototype.tick = function () {
        if (this.keepstate == 0) {
            if (Math.random() * 2147483647 % 10 > 7) {
                if (Math.random() * 2147483647 % 10 > 4) {
                    this.keepstate++;
                    if (this.referenzpoint != 0) {
                        this.referenzpoint--;
                    }
                }
                else {
                    this.keepstate++;
                    if (this.referenzpoint < 5) {
                        this.referenzpoint++;
                    }
                }
            }
        }
        else {
            this.keepstate++;
            if (this.keepstate >= 2) {
                this.keepstate = 0;
            }
        }
        if (this.firstone) { //Init row
            this.firstone = false;
            for (var i = 0; i < this.referenzpoint + 1; i++) {
                this.roadpieces[i][15] = true;
            }
            for (var i = this.referenzpoint + 4; i < 10; i++) {
                this.roadpieces[i][15] = true;
            }
        }
        for (var y = 0; y < 15; y++) {
            for (var x = 0; x < 10; x++) {
                this.roadpieces[x][y] = this.roadpieces[x][y + 1];
            }
        }
        for (var i = 0; i < 10; i++) {
            this.roadpieces[i][15] = false;
        }
        this.roadpieces[this.referenzpoint][15] = true;
        this.roadpieces[this.referenzpoint + 4][15] = true;
    };
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
        this.lasttick = Date.now();
        this.lastfasttick = Date.now();
        this.reset();
    };
    StreamTest.prototype.onDataReceive = function (data, playerID) {
    };
    StreamTest.prototype.onDraw = function () {
        var counter = 0;
        for (var y = 0; y < 15; y++) {
            counter++;
            for (var x = 0; x < 10; x++) {
                if (this.roadpieces[x][y]) {
                    if (this.ison[y]) {
                        index_1.ledtisch.setColor(0, 160, 0);
                        index_1.ledtisch.drawPixel(x, y);
                    }
                    else {
                        index_1.ledtisch.setColor(100, 100, 100);
                        index_1.ledtisch.drawPixel(x, y);
                    }
                }
                else {
                    index_1.ledtisch.setColor(0, 0, 0);
                    index_1.ledtisch.drawPixel(x, y);
                }
            }
            if (counter > 2) {
                counter = 0;
            }
        }
        index_1.ledtisch.setColor(100, 0, 0);
        index_1.ledtisch.drawPixel(this.carposx, this.carposy);
        index_1.ledtisch.drawPixel(this.carposx, this.carposy + 1);
        if (this.gameend == 0) {
            if (this.roadpieces[this.carposx][this.carposy] || this.roadpieces[this.carposx][this.carposy + 1]) {
                this.gameend = 1;
            }
        }
        else {
            //for (x in 0..9) {
            //for (y in 0..14) {
            //SystemInterface.table.setColor(100,0,0)
            // SystemInterface.table.drawPixel(x,y)
            // }
            // }
            this.reset();
            this.gameend = 0;
        }
    };
    StreamTest.prototype.catch = function (e) {
        this.gameend = 1;
    };
    StreamTest.prototype.onRun = function () {
        console.log("Punkte: " + (100 - this.fasttickdelay));
        if (this.gameend == 0) {
            if (Date.now() - this.lastfasttick >= this.fasttickdelay) {
                this.fasttickdelay -= 0.13;
                this.tick();
                if (this.fasttickercounter == 3) {
                    this.fasttickercounter = 0;
                }
                for (var i = 0; i < 14; i++) {
                    this.ison[i] = false;
                    if ((i + this.fasttickercounter) % 3 == 0) {
                        this.ison[i] = true;
                    }
                    /*
    if(i==12+fasttickercounter) {
        ison[i] = true
    }
*/
                }
                this.fasttickercounter++;
                this.lastfasttick = Date.now();
            }
        }
    };
    StreamTest.prototype.onStop = function () {
    };
    return StreamTest;
}());
exports.StreamTest = StreamTest;
//# sourceMappingURL=StreamTest.js.map