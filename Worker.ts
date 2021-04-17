import {Application} from "./application";
import {StreamTest} from "./apps/StreamTest";
import {ledtisch, writeToSocket} from "./index";
const WebSocket = require('ws');

const FPS = 15;

export async function startApp(appuuid: string, ws:any, session: string) {

   // const ws = expressWs.get(0);

   // const ws = expressWs.get(0);
    try {
        let startedApp: Application = null;
        console.log("Client start streaming")


        switch (appuuid) {

            case "0186cdd1-92f3-11eb-ad01-0242ac110002":
                startedApp = new StreamTest();
                break;
            default:
                ws.close();
                break;

        }

        startedApp.onCreate();



     var counter1 = 0;
     var counter2 = 0;
        while (true) {
            await new Promise(r => setTimeout(r, 1));
            counter1++;
            counter2++;
            if(counter1==7) {
                counter1 =0;
                startedApp.onRun()
            }

            if(counter2==90) {
                counter2 = 0;
                startedApp.onDraw();
                ledtisch.show(ws);
            }

            if (ws.readyState !== WebSocket.OPEN) {
                console.log("Client left")
                return;
            }




        }
    }catch (e) {

     console.log(e)
    }


}
