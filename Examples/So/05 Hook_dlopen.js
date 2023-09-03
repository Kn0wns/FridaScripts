// @Time    : 2022-05-18 22:10
// @Author  : KKings
// @File    : 05 Hook_dlopen.js
// @Software: PyCharm

// dlopen地址  监控So加载名 Hook方法
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

// 第一参数为null的话会自己去寻找函数
const dlopen = Module.findExportByName(null, "dlopen");  // Android 低版本API
// console.log(JSON.stringify(Process.getModuleByAddress(dlopen)))  // 从地址得到所在so
const android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");  // Android 高版本API
hook_dlopen(dlopen, "libc.so", hook_func);             // 传入hook方法 So名 So加载就Hook
hook_dlopen(android_dlopen_ext, "libc.so", hook_func); // 传入hook方法 So名 SO加载就Hook

// 监控So是否加载,如果加载了则进行hook