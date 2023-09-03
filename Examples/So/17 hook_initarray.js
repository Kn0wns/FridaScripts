// @Time    : 2022-05-22 18:32
// @Author  : KKings
// @File    : 17 hook_initarray.js
// @Software: PyCharm

function main(soName) {
    // 1. dlopen地址 :监控So加载名 Hook方法
    function hook_dlopen(addr, soName, callback) {
        Interceptor.attach(addr, {
            onEnter: function (args) {
                const SoName = args[0].readCString(); // 输出so路径 /data/app/com.demo.kcase-jIMTpAbzgADqv-I3EjhT4g==/lib/arm64/libKKNatriv.so
                if (SoName.indexOf(soName) !== -1) callback();  // 调用 hook_call_constructors()
            }
        })
    }

    function hook_call_constructors() {
        const symbols = Process.getModuleByName("linker64").enumerateSymbols(); // 枚举linker64符号表
        for (const symbol of symbols) if (symbol.name.indexOf("__dl__ZN6soinfo17call_constructorsEv") !== -1) var call_constructors_addr = symbol.address // 得到符号地址

        console.log("[*]\tcall_constructors_addr", call_constructors_addr) // 运行到这时 我们的So已经被加载完毕 就可以得到So基址
        Interceptor.attach(call_constructors_addr, {    // 在init、initarray 调用前进行hook
            onEnter: function (args) {
                if (!isHook_flag) hook_initarray();
            }
        });
    }

    function hook_initarray() {
        const soAddr = Module.findBaseAddress(soName);
        const func1_addr = soAddr.add(0x1C54); // 得到 init、init_array 偏移
        const func2_addr = soAddr.add(0x1C7C);
        const func3_addr = soAddr.add(0x1C2C);

        Interceptor.replace(func1_addr, new NativeCallback(function () {
            console.log("func1 is replaced!!!");
        }, 'void', []));

        Interceptor.replace(func2_addr, new NativeCallback(function () {
            console.log("func2 is replaced!!!");
        }, 'void', []));

        Interceptor.replace(func3_addr, new NativeCallback(function () {
            console.log("func3 is replaced!!!");
        }, 'void', []));
        isHook_flag = true
    }

    // moduleName = null 会自己去寻找函数
    // hook dlopen 判断需要监控的 So 是否加载
    const dlopen = Module.findExportByName("libdl.so", "dlopen");// Android 低版本API
    const android_dlopen_ext = Module.findExportByName("libdl.so", "android_dlopen_ext");// Android 高版本API
    var isHook_flag = false; // 设置标志 只需 hook 一次
    hook_dlopen(dlopen, soName, hook_call_constructors);
    hook_dlopen(android_dlopen_ext, soName, hook_call_constructors);
}

const soName = "libKKNatriv.so"
main(soName)
/*
* 需求: hook init_array
* 1. init_array 在 call_constructors 内调用
* 2. call_constructors 在 dlopen 内部调用
* 3. 在 dlopen 进入 & 离开 都无法对 init_array 进行hook
*           进入(onEnter):进入时对 init_array 无法进行 hook,无法得到 So 基址,So 还未加载
*           退出(onLeave):退出时对 init_array 可以进行 hook,但没有任何意义,init_array 已经执行过了(call_constructors 执行完毕)
* 4. 正确的 hook 思路:hook dlopen,在进入方法(onEnter)时,判断是否加载目标So,如果加载了目标 So 则 hook call_constructors
*           So 加载完毕调用 call_constructors 则可以找到目标 So 基址,计算偏移 hook init_array
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