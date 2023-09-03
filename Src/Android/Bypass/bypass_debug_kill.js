// Time    : 2023-03-03 23:14
// Author  : KKings
// File    : bypass_debug_kill.js
// Software: WebStorm

import {FSLog} from "../../FSLogger";


export function bypass_debug_kill() {
    const tag = bypass_debug_kill.name
    Interceptor.replace(new NativeFunction(Module.findExportByName(null, "kill"), 'void', ['int', 'int']), new NativeCallback(function (pid, SIGKILL) {
        FSLog.d(tag,"Bypass native kill")
        return 0
    }, 'int', ['int', 'int']));
    Interceptor.replace(new NativeFunction(Module.findExportByName(null, "_exit"), 'void', ['int']), new NativeCallback(function (status) {
        FSLog.d(tag,"Bypass native _exit")
        return 0;
    }, "void", ["int"]));
    Interceptor.replace(new NativeFunction(Module.findExportByName(null, "exit"), 'void', ['int']), new NativeCallback(function (status) {
        FSLog.d(tag,"Bypass native exit")
        return 0;
    }, "void", ["int"]));
    Java.perform(function () {
        Java.use("java.lang.System").exit.implementation = function () {
            FSLog.d(tag, "Bypass java kill");
        }
    });
}