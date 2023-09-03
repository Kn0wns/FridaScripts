// @Time    : 2022-05-20 23:43
// @Author  : KKings
// @File    : 10 Call_JNI.js
// @Software: PyCharm

// 1. 使用frida封装的函数来调用jni
function Call_JNI() {
    const env = Java.vm.tryGetEnv()
    const jstr = env.newStringUtf("J_String");  //主动调用jni函数 cstr转jstr
    const cstr = env.getStringUtfChars(jstr);   //主动调用jni函数 jstr转cstr
    console.log(cstr.readCString());
}


// 2. NativeFunction方式主动调用:手动计算方式
function Call_JNI_2() {
    const symbols = Process.getModuleByName("libart.so").enumerateSymbols();
    let newStringUtf = null;
    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        if (symbol.name.indexOf("CheckJNI") === -1 && symbol.name.indexOf("NewStringUTF") !== -1) {
            console.log(symbol.name, symbol.address);
            newStringUtf = symbol.address;
        }
    }
    const newStringUtf_func = new NativeFunction(newStringUtf, 'pointer', ['pointer', 'pointer']); // 得到函数指针

    // Java.vm.tryGetEnv().handle 获取源JNIEnv
    // Memory.allocUtf8String("kk") 申请内存并写入字符串返回地址
    const jstring = newStringUtf_func(Java.vm.tryGetEnv().handle, Memory.allocUtf8String("KK")); // 调用函数
    console.log(jstring);

    // 等同于  Java.vm.tryGetEnv().getStringUtfChars(retval).readCString() 这种方式是FRIDA封装好可以直接调用的
    const envAddr = Java.vm.tryGetEnv().handle.readPointer();
    const GetStringUTFChars = envAddr.add(0x548).readPointer(); // Jni GetStringUTFChars 地址
    const GetStringUTFChars_func = new NativeFunction(GetStringUTFChars, 'pointer', ['pointer', 'pointer', 'pointer']);  // 得到函数指针
    const cstr = GetStringUTFChars_func(Java.vm.tryGetEnv().handle, jstring, ptr(0)); // 调用函数
    console.log(cstr.readCString());
}
