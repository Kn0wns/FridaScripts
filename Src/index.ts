import {FSLog} from "./FSLogger";
import * as exports_Android from "./Android/__exports";
import * as exports_IOS from "./IOS/__exports";

(() => {
    Java.available && setImmediate(android)
    ObjC.available && setImmediate(ios)
})()

function android() {
    FSLog.bDebug = false  // 关闭 debug 级别的信息输出
    // FSLog.android()
    const {Android, Bypass, autoEncrypt, View} = exports_Android

    // -------------------------------------------------------------------

    // hook
    // Android.jhook(`com.qq.lib.EncryptUtil`, `encrypt`,false) // 第三参数是否打印堆栈
    // Android.jhook(`inject.HttpUtils`, [`send`, `send2`], true) // 批量hook同一个类下的多个方法
    // Android.jhook(`com.sswl.sdk.h.o`, [`b`], true) // 批量hook同一个类下的多个方法

    // 对抗
    // Bypass.anti_debug()  // 批量一些反调
    // Bypass.bypass_frida_libc();
    // Bypass.bypass_frida_strcmp();
    // Bypass.bypass_root();
    // Bypass.bypass_debug_ptrace_android();
    // Bypass.bypass_debug_fork();
    // Bypass.bypass_debug_fgets();
    // Bypass.bypass_debug_exit();
    // Bypass.bypass_debug_kill();
    // SSL
    // Bypass.bypass_ssl_multi_unpinning()
    // Bypass.bypass_ssl_UnpinningPlus();
    // Bypass.bypass_ssl_flutter()

    // autoEncrypt()  // Android Java 加密自吐

    // View.OnClickListener() // 监听点击事件
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
    Crypto.All()  // hook 所有的加密方法
    // Crypto.base64()
    // Crypto.MD5()
    // Crypto.SHA1()
    // Crypto.RSA()
    // Crypto.CCCrypto()  // AES.DES.3DES.CAST.RC4.RC2.Blowfish

    // 快速定位
    // frida-trace -UFm "*[UIAlertView *]"  通过弹窗+堆栈打印定位

    // Network.bypass_VPN()  // 绕过 VPN 检测
    // Jailbreak.try_bypass()  // 尝试绕过越狱检测
    // Jailbreak.bypassAll()  // 绕过所有越狱检测

    // 环境检测
    // Env.bypassAll()  // 绕过所有环境检测
    // Env.hook_ptrace()  // hook ptrace
}
