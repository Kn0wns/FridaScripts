(() => {
    Java.available && setImmediate(android)
    ObjC.available && setImmediate(ios)
})()

function android() {
    console.log('android 注入');
}

function ios() {
    console.log('ios 注入');
}