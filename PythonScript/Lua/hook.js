// 解密lua脚本
// https://www.bookstack.cn/read/lua-5.3/spilt.33.spilt.1.5.md

// int luaL_loadbuffer (lua_State *L, const char *buff, size_t sz, const char *name);
// 等价于 luaL_loadbufferx，其 mode 参数等于 NULL

// int luaL_loadbufferx (lua_State *L, const char *buff, size_t sz, const char *name, const char *mode);
// 把一段缓存加载为一个 Lua 代码块。这个函数使用 lua_load 来加载 buff 指向的长度为 sz 的内存区
// 这个函数和 lua_load 返回值相同。name 作为代码块的名字，用于调试信息和错误消息。mode 字符串的作用同函数 lua_load

let isHook = false;
const DEBUG = false;

function hook_loadbuffer(so) {
    if (isHook) return;  // 避免重复 hook
    let loadbuffer = Module.findExportByName(so, "luaL_loadbufferx");
    console.log(JSON.stringify(Process.getModuleByAddress(loadbuffer)))  // 从地址得到所在so
    Interceptor.attach(loadbuffer, {
        onEnter: function (args) {
            let size = args[2].toInt32();
            let buff = args[1].readCString(size);
            let name = args[3].readCString();
            DEBUG ? send({"name": name, "size": size, "buff": buff}) : console.log(`[ * ] ${size} ${name} ${buff.slice(0, 30)}`)
        }
    })
}

function hook_dlopen(addr, targetSo, callback) {
    Interceptor.attach(addr, {
        onEnter: function (args) {
            const name = args[0].readCString();  // 输出so路径
            DEBUG && console.log(`[ * ] loadSo :=> ${name}`)
            this.hook = name && name.includes(targetSo);
        },
        onLeave: function () {
            this.hook && callback(targetSo);
            isHook = this.hook;
        }
    })
}

// 第一参数为null的话会自己去寻找函数
const dlopen = Module.findExportByName(null, "dlopen");  // Android 低版本API
// console.log(JSON.stringify(Process.getModuleByAddress(dlopen)))  // 从地址得到所在so
const android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");  // Android 高版本API
// hook_dlopen(dlopen, "libsgs.so", hook_loadbuffer);             // 传入hook方法 So名 So加载就Hook
// hook_dlopen(android_dlopen_ext, "libsgs.so", hook_loadbuffer); // 传入hook方法 So名 SO加载就Hook
hook_dlopen(dlopen, "libxlua.so", hook_loadbuffer);             // 传入hook方法 So名 So加载就Hook
hook_dlopen(android_dlopen_ext, "libxlua.so", hook_loadbuffer); // 传入hook方法 So名 SO加载就Hook

// com.bf.sgs.hdexp
// frida -Ul hook.js -f com.bf.sgs.hdexp
// frida -Ul hook.js -f com.cwqmx.lylxsxb37
// frida --no-pause -Ul hook.js -f com.cwqmx.lylxsxb37