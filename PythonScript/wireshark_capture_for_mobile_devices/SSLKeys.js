// @Time    : 2023-07-29 23:06
// @Author  : KKings
// @File    : SSL_Keys.js
// @Software: PyCharm
// @Refs    : https://codeshare.frida.re/@fanglian/tls-key-logger/

const keylog_callback = new NativeCallback((ssl, line) => {
    send(line.readCString());
}, 'void', ['pointer', 'pointer']);


if (ObjC.available) {
    Module.load("libboringssl.dylib")  // 手动加载环境
    const iOSVersion = ObjC.classes.UIDevice.currentDevice().systemVersion().floatValue() ^ 0
    // SSL 结构体中 keylog_callback 指针偏移量: 根据 iOS 中的 ssl_lib.c (libboringssl.dylib) 中对 ssl_log_secret 的反汇编而来
    const CALLBACK_OFFSET = {12: 0x2A8, 13: 0x2C0, 14: 0x2B8, 15: 0x2F8}[iOSVersion]
    if (!CALLBACK_OFFSET) {
        throw new Error(`iOS ${deviceSystemVersion} isn't supported yet.`)
    } else {
        console.log(`iOS Version: ${iOSVersion} is supported.`)
    }
    let SSL_CTX_set_info_callback = Module.findExportByName("libboringssl.dylib", "SSL_CTX_set_info_callback");
    Interceptor.attach(SSL_CTX_set_info_callback, {
        onEnter(args) {
            ptr(args[0]).add(CALLBACK_OFFSET).writePointer(keylog_callback)
        }
    })
} else if (Java.available) {
    Module.load("libssl.so")  // 手动加载环境
    let SSL_CTX_set_keylog_callback_address = Module.findExportByName('libssl.so', 'SSL_CTX_set_keylog_callback')
    let set_keylog_callback = new NativeFunction(SSL_CTX_set_keylog_callback_address, 'void', ['pointer', 'pointer']);
    let SSL_CTX_new = Module.findExportByName('libssl.so', 'SSL_CTX_new')
    Interceptor.attach(SSL_CTX_new, {
        onLeave(retval) {
            set_keylog_callback(retval, keylog_callback)
        }
    })
}
