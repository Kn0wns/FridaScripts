// @Time    : 2022-05-22 19:49
// @Author  : KKings
// @File    : 18 hook_JNIOnload.js
// @Software: PyCharm

function main(soName) {
    function hook_dlopen(addr, callback) {
        // dlopen地址  监控So加载名 Hook方法
        Interceptor.attach(addr, {
            onEnter: function (args) {
                var name = args[0].readCString(); // 输出so路径
                if (name.indexOf(soName) !== -1) callback();  // 调用方法
            }
        })
    }

    function hook_JNIOnload() {
        var baseAddr = Module.findBaseAddress(soName);  // 得到so基址
        var funcAddr = baseAddr.add(0x1CCC);  // 得到 pthrea_create(...) 地址
        Interceptor.replace(funcAddr, new NativeCallback(function () {  // 替换函数
            console.log("this func is replaced !");
        }, 'void', []));
    }

    // moduleName = null 会自己去寻找函数
    const dlopen = Module.findExportByName("libdl.so", "dlopen");// Android 低版本API
    const android_dlopen_ext = Module.findExportByName("libdl.so", "android_dlopen_ext");// Android 高版本API
    hook_dlopen(dlopen, hook_JNIOnload);
    hook_dlopen(android_dlopen_ext, hook_JNIOnload);
}

const soName = "libKKNatriv.so"
main(soName)

/*
* hook JNIOnload 时机分析:在 do_dlopen onEnter 内监控 So 是否已加载,如果加载则 hook JNIOnload
*
*    do_dlopen(name, flags, extinfo, caller_addr) {
*        soinfo * si = find_library(ns, translated_name, flags, extinfo, caller); 完成对 so 的加载,得到 soinfo 结构体
*
*        call_constructors() { // 如果要 hook init & init_array 这里将是最佳 hook 点*
*                init()
*                init_array()
*        }
*    }
*
*    JNI_OnLoad()
*
* */