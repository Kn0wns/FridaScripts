// Time    : 2023-03-04 16:37
// Author  : KKings
// File    : bypass_pthread_create.js
// Software: WebStorm

import {FSLog} from "../../FSLogger";

function replace_empty(tag, adder) {
    // 传入待替换函数地址  方法体 + 返回值类型(retType) + 参数类型(argTypes)
    Interceptor.replace(adder, new NativeCallback(function () {
        FSLog.w(tag, `[*] ${adder} replaced!`);
    }, 'void', []));
}

function hook_pthread_create() {
    let tag = hook_pthread_create.name
    const pthread_create_addr = Module.findExportByName("libc.so", "pthread_create"); // 系统函数 所以无需 hook dlopen
    console.log("pthread_create_addr: ", pthread_create_addr);
    pthread_create_addr && Interceptor.attach(pthread_create_addr, {
        onEnter: function (args) {
            // pthread_create(&thread,nullptr,myThread,nullptr)
            // pthread_create(&线程id, 线程属性, 函数指针, 函数参数)
            // console.log(args[0], args[1], args[2], args[3]);

            // let debug = DebugSymbol.fromAddress(args[2])  // 这个API容易崩溃
            let debug = Process.findModuleByAddress(args[2])
            if (debug) {
                FSLog.w(tag, `DebugSymbol :=> ${args[2]} - ${debug.name}`);

                if (debug.name.includes("libmsaoaidsec") ||
                    debug.name.includes("libnesec")) {
                    replace_empty(tag, args2)
                }
            }
        }
    })
}

