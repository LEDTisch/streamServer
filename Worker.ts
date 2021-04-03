import {expose} from "threads/worker";

expose(async function test(text) {


    console.log("Do someging async");

    return  text;

})
