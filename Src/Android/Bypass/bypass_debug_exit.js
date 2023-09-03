// Time    : 2023-03-03 23:14
// Author  : KKings
// File    : bypass_debug_exit.js
// Software: WebStorm

import {FSLog as log} from "../../FSLogger";
import {FSCommon} from "../../FSCommon";

export function bypass_debug_exit() {
    const tag = bypass_debug_exit.name
    const exit_ptr = Module.findExportByName(null, 'exit');
    log.d(tag, "exit_ptr : " + exit_ptr);
    if (null == exit_ptr) {
        return;
    }
    Interceptor.replace(exit_ptr, new NativeCallback(function (code) {
        if (null == this) {
            return 0;
        }
        var lr = FSCommon.getLR(this.context);
        log.w(tag, 'entry, lr: ' + lr);
        return 0;
    }, 'int', ['int', 'int']));
}