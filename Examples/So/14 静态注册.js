// @Time    : 2022-05-21 21:20
// @Author  : KKings
// @File    : 14 静态注册.js
// @Software: PyCharm

function hook_dlsym() {
    const dlsymAddr = Module.findExportByName("libdl.so", "dlsym");
    // console.log(JSON.stringify(Process.findModuleByAddress(dlsymAddr))) // {"name":"libdl.so","base":"0x7832bd0000","size":135168,"path":"/system/lib64/libdl.so"}
    dlsymAddr && Interceptor.attach(dlsymAddr, {
        onEnter: function (args) {
            this.arg1 = args[1]
        },
        onLeave: function (retval) {
            const module = Process.findModuleByAddress(retval);
            module && console.log(`[+]\t${this.arg1.readCString()}!${module.name}!${retval}!${retval.sub(module.base)}`) // 触发事件输出且只输出一次
            // 函数名 模块名 模块地址 相对模块地址偏移
            console.log('-------------------------------------------------------')
        }
    })
}

// 方法1
hook_dlsym()

// 方法2
// frida-trace -UF -i "Java_com*"





