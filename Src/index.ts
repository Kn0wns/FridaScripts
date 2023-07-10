import {FSLog} from "./FSLogger";
import * as exports_Android from "./Android/__exports";
import * as exports_IOS from "./IOS/__exports";

(() => {
    Java.available && setImmediate(android)
    ObjC.available && setImmediate(ios)
})()

function android() {
    FSLog.bDebug = false  // 关闭 debug 级别的信息输出
    FSLog.android()
    const {Android} = exports_Android

    // -------------------------------------------------------------------

    // hook
    // Hook.jhook(`com.qq.lib.EncryptUtil`, `encrypt`,false) // 第三参数是否打印堆栈
    // Hook.jhook(`inject.HttpUtils`, [`send`, `send2`], true) // 批量hook同一个类下的多个方法
    // Hook.jhook(`com.sswl.sdk.h.o`, [`b`], true) // 批量hook同一个类下的多个方法

}


function ios() {
    // FSLog.ios()
    const {IOS, CCCrypto} = exports_IOS
    IOS.dump_ui()
    CCCrypto()  // 自吐
}