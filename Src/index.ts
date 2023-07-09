import {FSLog} from "./Tools/fSLogger";


(() => {
    Java.available && setImmediate(android)
    ObjC.available && setImmediate(ios)
})()

function android() {
    FSLog.android()
}



function ios() {
    FSLog.ios()
}