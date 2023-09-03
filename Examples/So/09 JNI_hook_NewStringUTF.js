// @Time    : 2022-05-20 22:48
// @Author  : KKings
// @File    : 09 JNI_hook.js
// @Software: PyCharm

// hook libart 来hook jni相关函数

// adb shell
// su
// cd system
// find -name libart.so

// Android_10 以前 libart路径: /system/lib64/
// Android_10 以后 libart路径: /system/lib64/apex/com.android.runtime.release/lib/libart.so
// Android_10 以后 libart路径: /system/lib64/apex/com.android.runtime.release/lib64/libart.so

// 获取libart地址1
// for (const enumerateModule of Process.enumerateModules()) {
//     if (enumerateModule.name === 'libart.so') {
//         console.log("[*]\t", JSON.stringify(enumerateModule), enumerateModule.base)
//     }
// }

// const artSym = Module.enumerateSymbols("libart.so"); // 原API
const artSyms = Process.getModuleByName('libart.so').enumerateSymbols(); // 枚举libart符号表 返回数组
// for (let i = 0; i < artSym.length; i++) console.log(`[*]\t arg[${i}] :=> ${JSON.stringify(artSym[i])}`)
for (const artSym of artSyms) if (artSym.name.indexOf("CheckJNI") === -1 && artSym.name.indexOf("NewStringUTF") !== -1) var NewStringUTFAddr = artSym.address;

NewStringUTFAddr && Interceptor.attach(NewStringUTFAddr, {
    onEnter: function (args) {
        console.log("NewStringUTFAddr:", args[1].readCString());
        console.log(Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
    },
    onLeave: function (retval) {
        // console.log("NewStringUTFAddr retval:", retval); // 每次都是new创建新的字符串 返回值就是java虚拟机的一个编号
    }
});

console.log('hook Done!')

