import {Application} from "../application";

export default class StreamTest implements Application {


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

    }

    onDataReceive(data: String, playerID: number) {

    }

    onDraw() {
        console.log("Das ist ein Test");
    }

    onRun() {

    }

    onStop() {

    }

}