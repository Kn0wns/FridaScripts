// Time    : 2023-03-03 23:13
// Author  : KKings
// File    : anti_ptrace.js
// Software: WebStorm

import {FSLog as log} from "../../FSLogger";

export const bypass_debug_ptrace_android = () => {
    const tag = bypass_debug_ptrace_android.name
    const ptrace = Module.findExportByName(null, "ptrace");
    if (null != ptrace) {
        log.d(tag, "ptrace_addr: " + ptrace);
        // Interceptor.attach(ptrace, {
        //     onEnter: function (args) {
        //         DMLog.i('anti_ptrace', 'entry');
        //     }
        // });
        Interceptor.replace(ptrace, new NativeCallback(() => {
            log.d(tag, 'entry');
            return 1;
        }, 'long', ['int', "int", 'pointer', 'pointer']));
    }
}