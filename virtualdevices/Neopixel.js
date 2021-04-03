"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neopixel = void 0;
var WebSocket = require('ws');
var Neopixel = /** @class */ (function () {
    function Neopixel() {
        this.numpixels = 150;
    }
    Neopixel.prototype.show = function (ws) {
        var obj = {
            buffer: this.pixels
        };
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(obj));
        }
    };
    Neopixel.prototype.begin = function () {
        this.pixels = new Array();
        for (var i = 0; i < this.numpixels; i++) {
            this.pixels.push(0);
        }
    };
    Neopixel.prototype.setPixelColor = function (n, r, g, b) {
        if (n > this.numpixels)
            return;
        if (r > 255 || r < 0)
            return;
        if (g > 255 || g < 0)
            return;
        if (b > 255 || b < 0)
            return;
        this.pixels[n] =
            ((r & 0xFF) << 16) |
                ((g & 0xFF) << 8) |
                ((b & 0xFF) << 0);
    };
    Neopixel.prototype.setRGBPixelColor = function (n, rgb) {
        if (n > this.numpixels)
            return;
        this.pixels[n * 3] = rgb & 0xFF;
        this.pixels[n * 3 + 1] = (rgb >> 1) & 0xFF;
        this.pixels[n * 3 + 2] = (rgb >> 2) & 0xFF;
    };
    Neopixel.prototype.setBrightness = function (brightness) { };
    Neopixel.prototype.clear = function () {
        for (var i = 0; i < this.numpixels; i++) {
            this.setPixelColor(i, 0, 0, 0);
        }
    };
    return Neopixel;
}());
exports.Neopixel = Neopixel;
//# sourceMappingURL=Neopixel.js.map