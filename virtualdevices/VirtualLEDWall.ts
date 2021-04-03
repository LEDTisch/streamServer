import {Neopixel} from "./Neopixel";

export class VirtualLEDWall {
      width:number;
      height:number;
      rotation:number;
      red:number;
      green:number;
      blue:number;

     strip:Neopixel;

    constructor(width:number, height:number, rotation:number){
    this.width=width;
    this.height=height;
    this.rotation=rotation;

}

 init(strip){
    this.strip=strip;
    strip.begin();
}
setColor( r, g, b){
    this.red=r;
    this.green=g;
    this.blue=b;
}
 clear(){
    this.strip.clear();
}
 show(ws){
    this.strip.show(ws);
}
 drawPixel( x, y){
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        this.strip.setPixelColor(this.calculateStripPixel(x, y), this.red, this.green, this.blue);
    }
}
 calculateStripPixel(x, y):number{
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
}

 fillRect( x,  y,  w,  h){
    for(var xx=x;xx<x+w;xx++){
        for(var yy=y;yy<y+h;yy++){
            this.drawPixel(xx,yy);
        }
    }
}


 copyFrameToPixelBuffer( frame:number[], skipOff:boolean) {

    var i=0;
    for(var y=0;y<this.height;y++) {
        for(var x=0;x<this.width;x++) {



            if(skipOff) if(frame[i]==0) {i++;continue;};
            this.strip.setRGBPixelColor(this.calculateStripPixel(x,y),frame[i]);

            i++;
        }

    }


}









////////////////////////////SETTER///GETTER//////////
 setRotation(rotation:number) {
    this.rotation = rotation;
}

getHeight():number {
    return this.height;
}

getWidth():number {
    return this.width;
}

 getBlue():number {
    return this.blue;
}

 getGreen():number {
    return this.green;
}

 getRed():number {
    return this.red;
}

 getRotation():number {
    return this.rotation;
}

 getStrip():Neopixel {
    return this.strip;
}

 setWidth( width:number) {
    this.width = width;
}

 setHeight( height:number) {
    this.height = height;
}

 setBlue( blue:number) {
    this.blue = blue;
}

 setGreen( green:number) {
    this.green = green;
}

 setRed( red:number) {
    this.red = red;
}

setStrip( strip:Neopixel) {
    this.strip = strip;
}
}
