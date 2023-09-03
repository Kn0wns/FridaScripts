// @Time    : 2022-05-18 21:59
// @Author  : KKings
// @File    : 04 replace_func.js
// @Software: PyCharm

// 修改函数参数及返回值
var helloAddr = Module.findExportByName("So名", "add");
console.log(helloAddr);
if (helloAddr != null) {
    Interceptor.attach(helloAddr, {
        onEnter: function (args) {
            args[2] = ptr(1000);	// ptr = new NativePointer()
            console.log(args[2].toInt32());
        },
        onLeave: function (retval) {
            retval.replace(20000);
            console.log("retval", retval.toInt32());
        }
    });
}
