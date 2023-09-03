// Time    : 2023-03-03 23:10
// Author  : KKings
// File    : bypass_frida_libc.js.js
// Software: WebStorm
import {FSLog, FSLog as log} from "../../FSLogger";

// native大部分都是靠以下API实现的检测:fget,open家族,fork,exit,kill,memcmp,time,str家族,getpid
const checkStr = [`gum-js-loop`, `gmain`, `linjector`, `frida-agent`, `re.frida.server`, `/data/local/tmp`, `frida`]

export const bypass_frida_libc = () => {
    bypass_frida_strcmp();
    bypass_frida_strstr();
    bypass_frida_readlink();
    bypass_frida_open();
    bypass_frida_openat();
}

/**
 * equals string such as test-keys...
 * // C 库函数 int strcmp(const char *str1, const char *str2) 把 str1 所指向的字符串和 str2 所指向的字符串进行比较
 */
export const bypass_frida_strcmp = () => {
    Interceptor.attach(Module.findExportByName("libc.so", "strcmp"), {
        onEnter: function (args) {
            const str0 = Memory.readCString(args[0]);
            const str1 = Memory.readCString(args[1]);
            FSLog.d(`bypass_strcmp`, "strcmp->" + str0 + "--" + str1);
            if (str1.includes('interceptor') || str1.includes('debuggable')) {
                this.found = true;
            }
        },
        onLeave: function (retval) {
            if (this.found) {
                retval.replace(ptr("0xfffffffe"));
                FSLog.d(`bypass_strcmp`, "Bypass strcmp");
            }
        }
    });
}

/** hook libc函数的strstr判断frida特征进行修改
 * Bypass App:雷速体育、直播吧、玩吧
 * */
export const bypass_frida_strstr = () => {
    const tag = bypass_frida_strstr.name
    let strstr_adder = Module.findExportByName("libc.so", "strstr")
    if (!strstr_adder) {
        log.e(tag, `libc strstr address is ${strstr_adder}`)
        return;
    }

    Interceptor.attach(strstr_adder, {
        onEnter(args) {
            this.frida = Boolean(0);
            this.rawStr = args[0].readCString()?.replaceAll("\n", "")
            this.targetStr = args[1].readCString()

            // if (this.targetStr && checkStr.includes(this.targetStr)) {
            //     log.d(tag, `strstr(${this.rawStr}, ${this.targetStr})`)
            //     this.frida = true;
            // }

            if (this.targetStr) {
                checkStr.forEach(v => {
                    if (this.rawStr.includes(v)) {
                        this.frida = true
                        log.d(tag, `strstr(${this.rawStr}, ${this.targetStr})`)
                    }
                })
            }
        }, onLeave(retval) {
            if (this.frida) {
                try {
                    retval.replace(ptr(0));
                } catch (error) {
                }
            }
        }
    });
}

export const bypass_frida_readlink = () => {
    let tag = bypass_frida_readlink.name
    f("readlink");
    f("readlinkat");

    function f(fnName) {
        Interceptor.attach(Module.findExportByName("libc.so", fnName), {
                onEnter: function (args) {
                    this.pathname = args[0];
                    this.buf = args[1];
                    this.bufsize = args[2];
                }, onLeave: function (retval) {
                    const s2str = this.buf.readCString();
                    // if (s2str.includes("/data/local/tmp/re.frida.server/linjector")) {
                    if (s2str.includes("frida") || s2str.includes(`linjector`)) {
                        this.buf.writeUtf8String("/system/framework/boot.art");
                        retval.replace(ptr(0x1A));
                        log.d(tag, `${fnName} (${s2str})`)
                    }
                }
            }
        );
    }
}
export const bypass_frida_open = () => {
    let tag = bypass_frida_open.name

    /*
        https://blog.csdn.net/a656343072/article/details/40539889
        函数原型：int open( const char * pathname, int oflags);
                int open( const char * pathname,int oflags, mode_t mode);

        mode仅当创建新文件时才使用，用于指定文件的访问权限。
        pathname 是待打开/创建文件的路径名；
        oflags用于指定文件的打开/创建模式，这个参数可由以下常量（定义于 fcntl.h）通过逻辑或构成。
        O_RDONLY       只读模式
        O_WRONLY      只写模式
        O_RDWR          读写模式
        以上三者是互斥的，即不可以同时使用。
    */

    const openPtr = Module.getExportByName('libc.so', 'open');
    const open = new NativeFunction(openPtr, 'int', ['pointer', 'int']);

    let fakePath = "/data/local/tmp/maps";
    Interceptor.replace(openPtr, new NativeCallback(function (pathnameptr, flag) {
        let pathname = Memory.readUtf8String(pathnameptr);
        if (pathname.indexOf("maps") >= 0 && pathname.indexOf("proc") >= 0) {
            log.d(tag, "replace maps " + pathname);
            let filename = Memory.allocUtf8String(fakePath);
            log.d(tag, "replace maps over");
            return open(filename, flag);
        }
        if (pathname.indexOf("/su") != -1) {
            log.d(tag, "replace su");
            let filename = Memory.allocUtf8String("/xxx/su");
            return open(filename, flag);
        }
        let fd = open(pathnameptr, flag);
        return fd;
    }, 'int', ['pointer', 'int']));
}

export const bypass_frida_openat = () => {
    let tag = bypass_frida_openat.name
    const openatPtr = Module.getExportByName('libc.so', 'openat');
    const openat = new NativeFunction(openatPtr, 'int', ['int', 'pointer', 'int', 'int']);
    Interceptor.replace(openatPtr, new NativeCallback(function (fd, pathnameptr, flag, mode) {
        let pathname = Memory.readUtf8String(pathnameptr);
        if (pathname.indexOf("maps") >= 0) {
            let filename = Memory.allocUtf8String(fakePath);
            log.d(tag, "replace maps");
            return openat(fd, filename, flag, mode);
        }
        if (pathname.indexOf("/su") != -1) {
            let filename = Memory.allocUtf8String("/xxx/su");
            return openat(fd, filename, flag, mode);
        }
        return openat(fd, pathnameptr, flag, mode);
    }, 'int', ['int', 'pointer', 'int', 'int']));
}

// FIXME 未做适配
function hook_scan() {
    /*
        C 库函数 int sscanf(const char *str, const char *format, ...) 从字符串读取格式化输入。
    */
    let sscanf_addr = Module.findExportByName("libc.so", "sscanf");
    let io_frida = Memory.allocUtf8String("lingzhiyi");
    Interceptor.attach(sscanf_addr, {
        onEnter: function (args) {
            console.log("enter sscanf args[0]=" + args[0].readCString())
            if (args[0].readCString().indexOf("frida") != -1) {
                args[0] = Memory.allocUtf8String(args[0].readCString().replaceAll("frida", "hello"))
                // ptr(args[0]).writePointer(Memory.allocUtf8String(args[0].readCString().replaceAll("frida", "friad")))
                // console.log("attachhhhhhhhhhhhhh="+args[0].readCString())
            }
            this.str = args[0]
            this.format = args[1]
            this.arg2 = args[2]
            console.log("sscanf str=" + this.str.readCString() + "---format=" + this.format.readCString() + "---this.arg2=" + this.arg2)
        },
        onLeave: function (retval) {
        }
    })
}

// export const bypass_frida_ = () => {
//
// }