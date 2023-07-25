function logtrace(ctx) {
    let content = Thread.backtrace(ctx.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n';
    if (content.indexOf('SubstrateLoader') == -1 && content.indexOf('JavaScriptCore') == -1 &&
        content.indexOf('FLEXing.dylib') == -1 && content.indexOf('NSResolveSymlinksInPathUsingCache') == -1 &&
        content.indexOf('MediaServices') == -1 && content.indexOf('bundleWithPath') == -1 &&
        content.indexOf('CoreMotion') == -1 && content.indexOf('infoDictionary') == -1 &&
        content.indexOf('objectForInfoDictionaryKey') == -1) {
        console.log(content);
        return true;
    }
    return false;
}

function iswhite(path) {
    if (path == null) return true;
    if (path.startsWith('/let/mobile/Containers')) return true;
    if (path.startsWith('/let/containers')) return true;
    if (path.startsWith('/let/mobile/Library')) return true;
    if (path.startsWith('/let/db')) return true;
    if (path.startsWith('/private/let/mobile')) return true;
    if (path.startsWith('/private/let/containers')) return true;
    if (path.startsWith('/private/let/mobile/Library')) return true;
    if (path.startsWith('/private/let/db')) return true;
    if (path.startsWith('/System')) return true;
    if (path.startsWith('/Library/Preferences')) return true;
    if (path.startsWith('/Library/Managed')) return true;
    if (path.startsWith('/usr')) return true;
    if (path.startsWith('/dev')) return true;
    if (path == '/AppleInternal') return true;
    if (path == '/etc/hosts') return true;
    if (path == '/Library') return true;
    if (path == '/let') return true;
    if (path == '/private/let') return true;
    if (path == '/private') return true;
    if (path == '/') return true;
    if (path == '/let/mobile') return true;
    return path.includes('/containers/Bundle/Application')

}

Interceptor.attach(Module.findExportByName(null, "access"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        console.log("access " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "chdir"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (!iswhite(path)) console.log("chdir " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "chflags"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (!iswhite(path)) console.log("chflags " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "connect"), {
    onEnter: function (args) {
        let port = Memory.readUShort(args[1].add(2));
        port = ((port & 0xFF) << 8) | ((port & 0xFF00) >> 8);
        if (port == 22 || port == 27042) {
            console.log("connect " + port);
        }
    }
})

Interceptor.attach(Module.findExportByName(null, "creat"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("creat " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "dlopen"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (!iswhite(path)) console.log("dlopen " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "dlopen_preflight"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (!iswhite(path)) console.log("dlopen_preflight " + path);
    }
})

let dyld_get_image_name_show = false;
Interceptor.attach(Module.findExportByName(null, "_dyld_get_image_name"), {
    onEnter: function (args) {
        if (!dyld_get_image_name_show) {
            if (logtrace(this)) {
                console.log("dyld_get_image_name");
                dyld_get_image_name_show = true;
            }
        }
    }
})


Interceptor.attach(Module.findExportByName(null, "execve"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        console.log("execve " + Memory.readUtf8String(args[0]));
    }
})

Interceptor.attach(Module.findExportByName(null, "fork"), {
    onEnter: function (args) {
        console.log("fork");
    }
})

Interceptor.attach(Module.findExportByName(null, "getenv"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let envname = Memory.readUtf8String(args[0]);
        if (envname == 'DYLD_INSERT_LIBRARIES' || envname == 'MSSafeMode') {
            if (logtrace(this)) console.log(content);
        }
    }
})

Interceptor.attach(Module.findExportByName(null, "getxattr"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("getxattr " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "link"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("link " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "listxattr"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("listxattr " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "lstat"), {
    block: false,
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("lstat " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "open"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = Memory.readUtf8String(args[0]);
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("open " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "opendir"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("opendir " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "__opendir2"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("opendir2 " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "popen"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (!iswhite(path)) console.log("popen " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "ptrace"), {
    onEnter: function (args) {
        console.log("ptrace");
    }
})

Interceptor.attach(Module.findExportByName(null, "readlink"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("readlink " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "realpath"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("realpath " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "realpath$DARWIN_EXTSN"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("realpath$DARWIN_EXTSN " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "stat"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("stat " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "statfs"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("statfs " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "symlink"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("symlink " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "syscall"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        let callnum = args[0].toInt32();
        if (callnum == 180) return;
        console.log("syscall " + args[0].toInt32());
        if (callnum == 5) {
            console.log('syscall open ' + args[8].readUtf8String());
        }
    }
})

Interceptor.attach(Module.findExportByName(null, "system"), {
    onEnter: function (args) {
        if (args[0].isNull()) return;
        console.log("system " + Memory.readUtf8String(args[0]));
    }
})

Interceptor.attach(Module.findExportByName(null, "task_for_pid"), {
    onEnter: function (args) {
        console.log("task_for_pid");
    }
})

let LSCanOpenURLManager = ObjC.classes._LSCanOpenURLManager;
let NSFileManager = ObjC.classes.NSFileManager;
let UIApplication = ObjC.classes.UIApplication;

Interceptor.attach(LSCanOpenURLManager["- canOpenURL:publicSchemes:privateSchemes:XPCConnection:error:"].implementation, {
    onEnter: function (args) {
        let path = ObjC.Object(args[2]).toString();
        if (path.startsWith('cydia') || path.startsWith('Cydia'))
            console.log("LSCanOpenURLManager canOpenURL:publicSchemes:privateSchemes:XPCConnection:error: " + path);
    }
})

Interceptor.attach(UIApplication["- canOpenURL:"].implementation, {
    onEnter: function (args) {
        let path = ObjC.Object(args[2]).toString();
        if (path.startsWith('cydia') || path.startsWith('Cydia'))
            console.log("UIApplication canOpenURL: " + path);
    }
})

Interceptor.attach(UIApplication["- openURL:"].implementation, {
    onEnter: function (args) {
        console.log("UIApplication openURL: " + ObjC.Object(args[2]).toString());
    }
})

// Interceptor.attach(Module.findExportByName(null, "__libc_do_syscall") || null, {
//     onEnter: function (args) {
//         console.log(1)
//         let callnum = args[0].toInt32() - 233;
//         if (false) {
//         } else if (callnum == 3) {
//             // read
//         } else if (callnum == 5) {
//             console.log('open ' + args[8].readUtf8String());
//         } else if (callnum == 6) {
//             // close
//         } else if (callnum == 20) {
//             // getpid
//         } else if (callnum == 39) {
//             // getppid
//         } else if (callnum == 202) {
//             // sysctl
//         } else if (callnum == 294) {
//             // shared_region_check_np
//         } else if (callnum == 340) {
//             console.log('stat64 ' + args[8].readUtf8String());
//         } else if (callnum == 344) {
//             // getdirentries64
//         } else {
//             console.log('__libc_do_syscall() ' + callnum);
//         }
//     }
// });
