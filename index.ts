import StreamTest from "./apps/StreamTest";

const express = require('express')
const app = express()
const port = 3000
var expressWs = require('express-ws')(app);
const axios = require('axios');


import { spawn, Thread, Worker } from "threads"

import { expose } from "threads/worker"


import {Application} from './application'


const backend = "https://api.arnold-tim.de";
let map = new Map<string,Application>();

function init() {
    map.set("0186cdd1-92f3-11eb-ad01-0242ac110002",new StreamTest());


    map.get("0186cdd1-92f3-11eb-ad01-0242ac110002").onDraw();



}

init();

app.get('/', (req, res) => {
    res.send('LEDWall Stream Server V1.0')
})

app.ws('/startLiveApp', (ws,req)=> {
    if(req.query.session&&req.query.appuuid) {

        axios.get(backend+"/auth/validateSession"+"?session="+req.query.session).then((result) => {
           if(result.data.success) {


               if(req.query.appuuid==="0186cdd1-92f3-11eb-ad01-0242ac110002") {
                   map.get(req.query.appuuid).onCreate();

                 spawn(new Worker("./Worker")).then(exposedFunction=> {
                     exposedFunction("andywer").then((resultFromFunction)=> {

                         Thread.terminate(exposedFunction)
                     })
                   })
                   ws.send("THat geklappt")





               }else{
                   ws.send("Invalid App")
                   ws.close();
               }







           }else{
               ws.send("Invalid Session")
               ws.close();
           }
        });



    }else{
        ws.close();
    }


})

app.listen(port, () => {
    console.log(`Stream App listening at http://localhost:${port}`)
})
