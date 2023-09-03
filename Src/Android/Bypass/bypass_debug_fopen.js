// Time    : 2023-03-03 23:24
// Author  : KKings
// File    : bypass_debug_fopen.js
// Software: WebStorm

import {FSLog} from "../../FSLogger";

export const bypass_debug_fopen = () => {
    Interceptor.attach(Module.findExportByName("libc.so", "fopen"), {
        onEnter: function (args) {
            const pathReal = Memory.readCString(args[0]);
            let path;
            FSLog.d('bypass_debug_fopen', 'path->' + pathReal);
            if (isStrongerPlus && pathReal.indexOf('proc/') > -1) {//if you can't pass anti can try this code
                path = pathReal.replaceAll(/\/(\d*|self)\//g, "/1/");
                sendlog("Bypass native fopen->proc->" + pathReal + "->" + path + "-> ptr ->" + args[0]);
                Memory.writeUtf8String(args[0], path);
                // args[0] = Memory.allocUtf8String(path);
            }
            path = pathReal.split("/");
            const executable = path[path.length - 1];
            const shouldFakeReturn = (RootBinaries.indexOf(executable) > -1);
            if (shouldFakeReturn || (isStronger && pathReal.includes('proc')) && pathReal.indexOf('/data') === 0) {//  && pathReal.indexOf('//product') == 0 add some white string
                FSLog.d('bypass_debug_fopen', "Bypass native fopen->" + pathReal + "-> ptr ->" + args[0]);
                // Memory.writeUtf8String(args[0], "/notexists");
                args[0] = Memory.allocUtf8String("/notexists");
            }
        },
        onLeave: function (retval) {
        }
    });
}