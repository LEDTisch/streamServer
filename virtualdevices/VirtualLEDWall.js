"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualLEDWall = void 0;
var VirtualLEDWall = /** @class */ (function () {
    function VirtualLEDWall(width, height, rotation) {
        this.width = width;
        this.height = height;
        this.rotation = rotation;
    }
    VirtualLEDWall.prototype.init = function (strip) {
        this.strip = strip;
        strip.begin();
    };
    VirtualLEDWall.prototype.setColor = function (r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
    };
    VirtualLEDWall.prototype.clear = function () {
        this.strip.clear();
    };
    VirtualLEDWall.prototype.show = function (ws) {
        this.strip.show(ws);
    };
    VirtualLEDWall.prototype.drawPixel = function (x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.strip.setPixelColor(this.calculateStripPixel(x, y), this.red, this.green, this.blue);
        }
    };
    VirtualLEDWall.prototype.calculateStripPixel = function (x, y) {
        var PO = -1;
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            var led = 0;
            //y=9-y+1;
            //x = 0;
            //y = 5;
            // PO = ((height-1)-y) + 15 * ((width-1)-x);
            if (this.rotation == 0) {
                PO = x + this.height * (this.width - y - 1);
            }
            if (this.rotation == 1) {
                PO = ((this.height - 1) - y) + this.height * ((this.width - 1) - x);
            }
            led = PO;
            if (led >= this.height && led < this.height * 2) {
                led = (this.height * 2 + 1) - (led - this.height);
                led = led - 2;
            }
            if (led >= this.height * 3 && led < this.height * 4) {
                led = (this.height * 6 + 1 - (led - this.height));
                led = led - 2;
            }
            if (led >= this.height * 5 && led < this.height * 6) {
                led = (this.height * 10 + 1 - (led - this.height));
                led = led - 2;
            }
            if (led >= this.height * 7 && led < this.height * 8) {
                led = (this.height * 14 + 1 - (led - this.height));
                led = led - 2;
            }
            if (led >= this.height * 9 && led < this.height * 10) {
                led = (this.height * 18 + 1 - (led - this.height));
                led = led - 2;
            }
            PO = led;
        }
        return PO;
    };
    VirtualLEDWall.prototype.fillRect = function (x, y, w, h) {
        for (var xx = x; xx < x + w; xx++) {
            for (var yy = y; yy < y + h; yy++) {
                this.drawPixel(xx, yy);
            }
        }
    };
    VirtualLEDWall.prototype.copyFrameToPixelBuffer = function (frame, skipOff) {
        var i = 0;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (skipOff)
                    if (frame[i] == 0) {
                        i++;
                        continue;
                    }
                ;
                this.strip.setRGBPixelColor(this.calculateStripPixel(x, y), frame[i]);
                i++;
            }
        }
    };
    ////////////////////////////SETTER///GETTER//////////
    VirtualLEDWall.prototype.setRotation = function (rotation) {
        this.rotation = rotation;
    };
    VirtualLEDWall.prototype.getHeight = function () {
        return this.height;
    };
    VirtualLEDWall.prototype.getWidth = function () {
        return this.width;
    };
    VirtualLEDWall.prototype.getBlue = function () {
        return this.blue;
    };
    VirtualLEDWall.prototype.getGreen = function () {
        return this.green;
    };
    VirtualLEDWall.prototype.getRed = function () {
        return this.red;
    };
    VirtualLEDWall.prototype.getRotation = function () {
        return this.rotation;
    };
    VirtualLEDWall.prototype.getStrip = function () {
        return this.strip;
    };
    VirtualLEDWall.prototype.setWidth = function (width) {
        this.width = width;
    };
    VirtualLEDWall.prototype.setHeight = function (height) {
        this.height = height;
    };
    VirtualLEDWall.prototype.setBlue = function (blue) {
        this.blue = blue;
    };
    VirtualLEDWall.prototype.setGreen = function (green) {
        this.green = green;
    };
    VirtualLEDWall.prototype.setRed = function (red) {
        this.red = red;
    };
    VirtualLEDWall.prototype.setStrip = function (strip) {
        this.strip = strip;
    };
    return VirtualLEDWall;
}());
exports.VirtualLEDWall = VirtualLEDWall;
//# sourceMappingURL=VirtualLEDWall.js.map