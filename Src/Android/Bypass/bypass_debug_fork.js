// Time    : 2023-03-03 23:12
// Author  : KKings
// File    : bypass_debug_fork.js
// Software: WebStorm

import {FSLog} from "../../FSLogger";

export const bypass_debug_fork = () => {
    const tag = bypass_debug_fork.name
    Interceptor.replace(Module.findExportByName("libc.so", "fork"), new NativeCallback(function () {
        FSLog.d(tag, 'fork_addr => entry');
        return -1;
    }, 'int', []));
}