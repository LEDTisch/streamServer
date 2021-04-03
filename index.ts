import { startApp } from "./Worker";
import {VirtualLEDWall} from "./virtualdevices/VirtualLEDWall";
const express = require('express')
const app = express()
const port = 3000
var expressWs = require('express-ws')(app);
const axios = require('axios');
 var connections = [];
import {Neopixel} from "./virtualdevices/Neopixel";

export var ledtisch;


const backend = "https://api.arnold-tim.de";

function init() {

    ledtisch = new VirtualLEDWall(10,15,1);
    ledtisch.init(new Neopixel());


}

init();

app.get('/', (req, res) => {
    res.send('LEDWall Stream Server V1.0')
})

app.ws('/startLiveApp', (ws,req)=> {
    if(req.query.session&&req.query.appuuid) {

        axios.get(backend+"/auth/validateSession"+"?session="+req.query.session).then((result) => {
           if(result.data.success) {

               startApp(req.query.appuuid,ws,req.query.session);

           }else{
               ws.send("Invalid Session")
               ws.close();
           }
        });



    }else{
        ws.close();
    }


})


export function writeToSocket(socketid:number,message:string) {
connections[socketid].send(message);
}

app.listen(port, () => {
    console.log(`Stream App listening at http://localhost:${port}`)
})
