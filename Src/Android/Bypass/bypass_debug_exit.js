// Time    : 2023-03-03 23:14
// Author  : KKings
// File    : bypass_debug_exit.js
// Software: WebStorm

import {FSLog as log} from "../../FSLogger";
import {FSTools} from "../../FSTools";
import {Utils} from "../Utils/Utils";

const tag = "bypass_debug_exit";

export function bypass_debug_exit() {
    Exit();
    JavaExit();
}


function JavaExit() {
    Java.perform(function () {
        Java.use("android.app.Activity").finish.overload().implementation = function () {
            log.e(tag, `called android.app.Activity.finish ${this}`);
            FSTools.showStacks();
        }

        // android.app.Activity => public void finishAffinity()
        Java.perform(() => {
            Java.use("android.app.Activity").finishAffinity.implementation = function () {
                log.e(tag, `called finishAffinity ${this}`);
                FSTools.showStacks();
            }
        })

        Java.use("java.lang.System").exit.implementation = function (code) {
            log.e(tag, `called java.lang.System.exit(${code})`);
            FSTools.showStacks();
        }
    })
}

function Exit(tag) {
    log.e(tag, `CURRENT PID : ${Process.id}`)


    const exit_ptr = Module.findExportByName(null, 'exit');
    if (null == exit_ptr) return;
    Interceptor.replace(exit_ptr, new NativeCallback(function (code) {
        if (this == null) return 0;
        let lr = FSTools.getLR(this.context);
        log.e(tag, 'entry, lr: ' + lr);
        return 0;
    }, 'int', ['int', 'int']));

    // [*] function -> address: 0x7de78d6460 ( 0x7b460 )  quick_exit
    //     quick_exit
    //     [-] MD_Base: 0x7de785b000 | size: 0x61e000         <-  module:  libc.so
    //     [-] RG_Base: 0x7de78ba000 | size: 0x3d000          <-  range:   r-x
    try {
        Interceptor.replace(Module.findExportByName("libc.so", "quick_exit"),
            new NativeCallback(function (status) {
                log.e(tag, `called libc.so::quick_exit(${status})`);
                return 0
            }, 'int', ['int']))
        log.w(tag, `Hook libc.so::quick_exit @ ${Module.findExportByName("libc.so", "quick_exit")}`)
    } catch (error) {
        log.e(tag, `ERROR Hook libc.so::quick_exit @ ${Module.findExportByName("libc.so", "quick_exit")}`)
    }

    // [*] function -> address: 0x7de78f94d0 ( 0x9e4d0 )  _exit
    //                                                _exit
    //     [-] MD_Base: 0x7de785b000 | size: 0x61e000         <-  module:  libc.so
    //     [-] RG_Base: 0x7de78f7000 | size: 0x3000           <-  range:   rwx
    try {
        Interceptor.replace(Module.findExportByName("libc.so", "_exit"),
            new NativeCallback(function (status) {
                log.e(tag, `called libc.so::_exit(${status})`);
                return 0;
            }, 'int', ['int']))
        log.w(tag, `Hook libc.so::_exit @ ${Module.findExportByName("libc.so", "_exit")}`)
    } catch (error) {
        log.e(tag, `ERROR Hook libc.so::_exit @ ${Module.findExportByName("libc.so", "_exit")}`)
    }

    // System.exit(0)
    try {
        Interceptor.replace(Module.findExportByName("libopenjdk.so", "Runtime_nativeExit"),
            new NativeCallback(function (lenv, lcls, status) {
                log.e(tag, `called libopenjdk.so::_exit(${lenv}, ${lcls}, ${status})`)
                Java.perform(() => {
                    let env = Java.vm.tryGetEnv()
                    let cls = Java.cast(lcls, Java.use("java.lang.Class"))
                    log.d(tag, `env => ${JSON.stringify(env)} | ${cls}`)
                })
                log.w(tag, `env => ${lenv} | ${lcls} |status => ${status}`)
                return 0
            }, 'int', ['pointer', 'pointer', 'pointer']))
        log.w(tag, `Hook libopenjdk.so::_exit @ ${Module.findExportByName("libopenjdk.so", "Runtime_nativeExit")}`)
    } catch (error) {
        log.e(tag, `ERROR Hook libopenjdk.so::_exit @ ${Module.findExportByName("libopenjdk.so", "Runtime_nativeExit")}`)
    }

    // android.os.Process.killProcess(android.os.Process.myPid())
    // void android_os_Process_sendSignal(JNIEnv* env, jobject clazz, jint pid, jint sig)
    try {
        let android_os_Process_sendSignal_addr = Module.findExportByName("libandroid_runtime.so", "_Z29android_os_Process_sendSignalP7_JNIEnvP8_jobjectii")
        Interceptor.replace(android_os_Process_sendSignal_addr, new NativeCallback(function (lenv, lcls, pid, sig) {
            log.w(tag, `called android.os.Process.sendSignal(${pid}, ${sig})`)

            Java.perform(() => {
                let env = Java.vm.tryGetEnv()
                let cls = Java.cast(lcls, Java.use("java.lang.Object"))
                log.e(tag, `env => ${JSON.stringify(env)} | ${cls}`)
            })
            log.w(tag, `env => ${lenv} | ${lcls} | pid => ${pid} | sig => ${sig}`)
        }, 'void', ['pointer', 'pointer', 'pointer', 'pointer']))
        log.w(tag, `Hook libandroid_runtime.so::Process_sendSignal @ ${Module.findExportByName("libandroid_runtime.so", "_Z29android_os_Process_sendSignalP7_JNIEnvP8_jobjectii")}`)
    } catch (error) {
        log.e(tag, `ERROR Hook libandroid_runtime.so::Process_sendSignal @ ${Module.findExportByName("libandroid_runtime.so", "_Z29android_os_Process_sendSignalP7_JNIEnvP8_jobjectii")}`)
    }

    // void kill(pid_t pid, int sig)
    try {
        const kill_addr = Module.findExportByName("libc.so", "kill")
        Interceptor.replace(kill_addr, new NativeCallback(function (pid, sig) {
            log.e(tag, `called libc.so::kill(${pid}, ${sig})`)
            try {
                log.d(tag, `\t[ ${Utils.getThreadName(pid)} ]`)
            } catch (error) {
                // ...
            }
            return 0
        }, 'int', ['int', 'int']))
        log.w(tag, `Hook libc.so::kill @ ${Module.findExportByName("libc.so", "kill")}`)
    } catch (error) {
        log.e(tag, `ERROR Hook libc.so::kill @ ${Module.findExportByName("libc.so", "kill")}`)
    }

    // abort
    try {
        const abort_addr = Module.findExportByName("libc.so", "abort")
        Interceptor.replace(abort_addr, new NativeCallback(function () {
            log.d(tag, `called libc.so::abort()`);
            return 0
        }, 'void', []))
        log.w(tag, `Hook libc.so::abort @ ${Module.findExportByName("libc.so", "abort")}`)
    } catch {
        log.e(tag, `ERROR Hook libc.so::abort @ ${Module.findExportByName("libc.so", "abort")}`)
    }
}