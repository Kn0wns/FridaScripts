// @Time    : 2022-05-21 22:10
// @Author  : KKings
// @File    : 15 动态注册_RegisterNatives.js
// @Software: PyCharm

function hook_RegisterNatives() {
    const symbols = Process.findModuleByName("libart.so").enumerateSymbols();  // 枚举art符号表
    for (const symbol of symbols) {
        if (symbol.name.indexOf('CheckJNI') === -1 && symbol.name.indexOf('RegisterNatives') !== -1) var RegisterNatives_addr = symbol.address;
    }
    /* RegisterNatives JNI(env,注册类,注册方法结构体([Java层方法名,签名,对应so函数地址],...),注册数量))
    jint RegisterNatives(jclass clazz, const JNINativeMethod* methods,jint nMethods)
    { return functions->RegisterNatives(this, clazz, methods, nMethods); }*/

    Interceptor.attach(RegisterNatives_addr, {
        onEnter: function (args) {
            const env = args[0];
            const class_name = Java.vm.tryGetEnv().getClassName(args[1]);
            const methods_ptr = ptr(args[2]);  // 得到结构体地址 结构体有三个指针：name，signature，fnPtr 指针变量
            const methods = args[3].toInt32(); // 注册方法数量
            console.log("RegisterNatives method counts: ", methods);
            for (let i = 0; i < methods; i++) {
                // Process.pointerSize:取指针长度 32位系统里值为4 | 64位系统里值为8
                const name = methods_ptr.add(Process.pointerSize * i * 3).readPointer().readCString();  // 结构体第一个指针变量name：结构体指针加上偏移指针长度
                const sig = methods_ptr.add(Process.pointerSize * i * 3 + Process.pointerSize).readPointer().readCString();  // 结构体第二个指针变量signature：结构体指针加上偏移指针长度
                const fnPtr_ptr = methods_ptr.add(Process.pointerSize * i * 3 + Process.pointerSize * 2).readPointer();  // 动态注册函数地址 结构体第三个指针变量fnPtr ：结构体指针加上偏移指针长度
                const module = Process.findModuleByAddress(fnPtr_ptr);  // 得到函数模块信息
                console.log(`RegisterNatives java_class: ${class_name} | name:${name} | sig:${sig} | fnPtr:${fnPtr_ptr} | module_name:${module.name} | module_base:${module.base} | offset:${ptr(fnPtr_ptr).sub(module.base)}`)
            }
            console.log(`\n---------------------------------------------------------------------\n`)
        }
    });
}

hook_RegisterNatives()