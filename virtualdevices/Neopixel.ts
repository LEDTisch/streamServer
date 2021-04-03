const WebSocket = require('ws');

export class Neopixel {
    numpixels = 150;
    pixels: Array<number>;


    constructor() {

    }
    show(ws) {

        const obj = {
            buffer: this.pixels
        }

        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(obj));
        }

    }
    begin() {
        this.pixels = new Array<number>();
        for(var i=0; i<this.numpixels; i++) {
            this.pixels.push(0);
        }
    }

    setPixelColor(n, r:number, g:number, b:number) {
        if (n > this.numpixels) return
        if (r > 255 || r < 0) return
        if (g > 255 || g < 0) return
        if (b > 255 || b < 0) return
        this.pixels[n] =
            ((r & 0xFF) << 16) |
            ((g & 0xFF) << 8)  |
            ((b & 0xFF) << 0);

    }

    setRGBPixelColor(n, rgb) {
        if (n > this.numpixels) return
        this.pixels[n * 3] = rgb&0xFF
        this.pixels[n * 3 + 1] = (rgb>>1)&0xFF
        this.pixels[n * 3 + 2] = (rgb>>2)&0xFF
    }


    setBrightness(brightness) {}

    clear() {
        for (let i=0;i<this.numpixels;i++) {
            this.setPixelColor(i, 0, 0, 0)
        }
    }

}
