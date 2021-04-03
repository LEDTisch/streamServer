import {Application} from "../application";
import {ledtisch} from "../index";

export class StreamTest implements Application {


    fasttickdelay: number = 100 //75
    ison: boolean[] = [] //size 15
    fasttickercounter: number = 0
    gameend: number = 0
    referenzpoint: number = 4 //Point where the left roadside is
    carposx: number = this.referenzpoint + 1
    carposy: number = 5
    roadpieces: boolean[][] = [[],[],[],[],[],[],[],[],[],[]] //array 10 x 16
    lasttick: number = 0
    lastfasttick: number = 0
    firstone: boolean = true
    keepstate: number = 2 //Keep State meens a natural street

    constructor() {
        this.reset()
    }

    reset() {

        for (let i = 0; i > 15; i++) {
            this.ison[i] = false
        }

        for (let x = 0; x > 10; x++) {
            this.roadpieces[x] = [];
        }

        for (let x = 0; x > 10; x++) {
            for (let y = 0; y < 6; y++) {
                this.roadpieces[x][y] = false
            }
        }
        //SystemInterface.table.clear()

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 15; y++) {
                this.roadpieces[x][y] = false
            }

        }

        this.firstone = true

        this.carposy = 5
        this.carposx = 5
        this.keepstate = 2
        this.gameend = 0
        this.fasttickdelay = 100
        this.fasttickercounter = 1
    }
    tick() {
        if (this.keepstate == 0) {
            if (Math.random() * 2147483647 % 10 > 7) {
                if (Math.random() * 2147483647 % 10 > 4) {
                    this.keepstate++
                    if (this.referenzpoint != 0) {
                        this.referenzpoint--
                    }
                } else {
                    this.keepstate++
                    if (this.referenzpoint < 5) {
                        this.referenzpoint++
                    }
                }
            }
        } else {
            this.keepstate++
            if (this.keepstate >= 2) {
                this.keepstate = 0
            }
        }


        if (this.firstone) {
            this.firstone = false
            for (let i = 0; i < this.referenzpoint + 1; i++) {
                this.roadpieces[i][15] = true
            }
            for (let i = this.referenzpoint + 4; i < 10; i++) {
                this.roadpieces[i][15] = true
            }
        }
        for (let y = 0; y < 14; y++) {
            for (let x = 0; x < 9; x++) {
                this.roadpieces[x][y] = this.roadpieces[x][y + 1]
            }
        }
        for (let i = 0; i < 9; i++) {
            this.roadpieces[i][15] = false
        }
        this.roadpieces[this.referenzpoint][15] = true
        this.roadpieces[this.referenzpoint + 4][15] = true
    }

    getName(): String {
        return "StreamTest";
    }

    getUUID(): String {
        return "0186cdd1-92f3-11eb-ad01-0242ac110002";
    }

    getVersion(): String {
        return "1.0";
    }

    onCreate() {
        this.lasttick = Date.now();
        this.lastfasttick = Date.now()
        this.reset();
    }

    onDataReceive(data: String, playerID: number) {

    }

    onDraw() {
        let counter = 0
        for (let y = 0; y < 14; y++) {
            counter++
            for (let x = 0; x < 9; x++) {
                if (this.roadpieces[x][y]) {
                    if (this.ison[y]) {

                        ledtisch.setColor(0, 160, 0)
                        ledtisch.drawPixel(x, y)
                    } else {
                        ledtisch.setColor(100, 100, 100)
                        ledtisch.drawPixel(x, y)
                    }
                } else {
                    ledtisch.setColor(0, 0, 0)
                    ledtisch.drawPixel(x, y)
                }
            }
            if (counter > 2) {
                counter = 0
            }
        }
        ledtisch.setColor(100, 0, 0)
        ledtisch.drawPixel(this.carposx, this.carposy)
        ledtisch.drawPixel(this.carposx, this.carposy + 1)


        if (this.gameend == 0) {
            if (this.roadpieces[this.carposx][this.carposy] || this.roadpieces[this.carposx][this.carposy + 1]) {


                this.gameend = 1
            }
        } else {
            //for (x in 0..9) {
            //for (y in 0..14) {
            //SystemInterface.table.setColor(100,0,0)
            // SystemInterface.table.drawPixel(x,y)
            // }
            // }

            this.reset()
            this.gameend = 0
        }
    }

    catch(e) {

        this.gameend = 1
    }

    onRun() {

        if (this.gameend == 0) {
            if (Date.now() - this.lastfasttick >= this.fasttickdelay) {
                this.fasttickdelay -= 0.13
                this.tick()
                if (this.fasttickercounter == 3) {
                    this.fasttickercounter = 0
                }
                for (var i =0;i<14;i++) {
                    this.ison[i] = false
                    if ((i + this.fasttickercounter) % 3 == 0) {
                        this.ison[i] = true
                    }
                    /*
    if(i==12+fasttickercounter) {
        ison[i] = true
    }
*/
                }
                this.fasttickercounter++
                this.lastfasttick = Date.now()
            }
        }

    }

    onStop() {

    }




}