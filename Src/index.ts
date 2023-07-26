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
    const {IOS, Crypto, Network, Jailbreak, Env} = exports_IOS

    // -------------------------------------------------------------------
    // IOS.dump_ui()  // 查看界面UI

    // -------------------------------------------------------------------
    // 定位加密建议先用 frida-trace 来定位
    // frida-trace -UFI "libcommonCrypto*"
    // frida-trace -UFi CCCrypt
    // frida-trace -UFi "CC_MD5" -i "CC_SHA1"
    // frida-trace -UFi SecKeyEncrypt -i SecKeyDecrypt  // RSA 加解密
    // Crypto.All()  // hook 所有的加密方法
    // Crypto.base64()
    // Crypto.MD5()
    // Crypto.SHA1()
    // Crypto.CCCrypto()  // AES.DES.3DES.CAST.RC4.RC2.Blowfish

    // 快速定位
    // frida-trace -UFm "*[UIAlertView *]"  通过弹窗+堆栈打印定位

    // Network.bypass_VPN()  // 绕过 VPN 检测
    // Jailbreak.try_bypass()  // 尝试绕过越狱检测
    Jailbreak.bypassAll()  // 绕过所有越狱检测

    // 环境检测
    // Env.bypassAll()  // 绕过所有环境检测
    // Env.hook_ptrace()  // hook ptrace
}