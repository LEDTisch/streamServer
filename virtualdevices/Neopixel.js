var Neopixel = /** @class */ (function () {
    function Neopixel() {
        this.numpixels = 0;
    }
    Neopixel.prototype.show = function () {
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
        this.pixels[n * 3] = r.toByte();
        this.pixels[n * 3 + 1] = g.toByte();
        this.pixels[n * 3 + 2] = b.toByte();
    };
    Neopixel.prototype.setBrightness = function (brightness) { };
    Neopixel.prototype.clear = function () {
        for (var i = 0; i < this.numpixels; i++) {
            this.setPixelColor(i, 0, 0, 0);
        }
    };
    return Neopixel;
}());
//# sourceMappingURL=Neopixel.js.map