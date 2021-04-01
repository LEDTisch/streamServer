export  interface Application {


    onCreate();
     onDraw()
     onRun()
     onDataReceive(data:String,playerID:number)
     getName():String
     onStop()
     getVersion():String
     getUUID():String

}