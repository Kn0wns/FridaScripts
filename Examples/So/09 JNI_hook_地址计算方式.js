// @Time    : 2022-05-20 22:48
// @Author  : KKings
// @File    : 09 JNI_hook.js
// @Software: PyCharm

Java.perform(function () {
    console.log("Process.arch: ", Process.arch);

    // Java.vm.tryGetEnv 得到 JNINativeInterface* C_JNIEnv 指针
    // 在读取指针才得到 JNINativeInterface 结构体
    const envAddr = ptr(Java.vm.tryGetEnv().handle).readPointer();

    const newStringUtfAddr = envAddr.add(0x538).readPointer();
    console.log("newStringUtfAddr", newStringUtfAddr);
    if (newStringUtfAddr != null) {
        Interceptor.attach(newStringUtfAddr, {
            onEnter: function (args) {
                console.log(args[1].readCString());
            },
            onLeave: function (retval) {
            }
        });
    }
});

