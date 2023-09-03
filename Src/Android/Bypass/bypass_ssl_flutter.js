// @Time    : 2023-09-03 17:24
// @Author  : KKings
// @File    : SSL_Flutter.js
// @Software: PyCharm
// @Desc    : IDA 打开 flutter.so 定位字符串 ssl_client 得到该字符串引用地址, 替换偏移即可 var address = Module.findBaseAddress('libflutter.so').add(0x3E0F74)

function disablePinning() {
    let pattern, armVersion
    if (Process.arch === 'arm' || Process.arch === 'x86') {
        pattern = "2d e9 f0 4f a3 b0 81 46 50 20 10 70"
        armVersion = 7
    } else if (Process.arch === 'arm64' || Process.arch === 'x86_64') {
        pattern = "ff 03 05 d1 fd 7b 0f a9 bc de 05 94 08 0a 80 52 48"
        armVersion = 8
    } else {
        console.log('无法确定应用的位数');
    }

    Process.enumerateModules().forEach(v => {
        if (v['name'].includes("libflutter.so")) {
            console.log("Base: ", v['base'], "| Size: ", v['size'], "\n")
            Memory.scanSync(v['base'], v['size'], pattern).forEach(mem => {
                let offset = mem['address']
                if (armVersion === 7) {
                    // armv7 add 1
                    offset = offset.add(1)
                }
                console.log("Address:", offset, "::", mem['size'])
                Interceptor.attach(offset, {
                    onLeave: function (retval) {
                        console.log(`ReturnValue ${offset} altered from ${retval} to 1`)
                        retval.replace(ptr(0x1));
                    }
                })
            })
        }
    });
}

function hook_dlopen(addr, soName, callback) {
    Interceptor.attach(addr, {
        onEnter: function (args) {
            const name = args[0].readCString();  // 输出so路径
            if (name.indexOf(soName) !== -1) this.hook = true;
        }, onLeave: function (retval) {
            if (this.hook) callback();
        }
    })
}

export function Bypass_ssl_flutter() {
    const dlopen = Module.findExportByName(null, "dlopen");
    const android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");
    hook_dlopen(dlopen, 'flutter.so', disablePinning);
    hook_dlopen(android_dlopen_ext, 'flutter.so', disablePinning);

    // frida -UFl hook.js
    // frida --no-pause -Ul hook.js -f com.package
}

