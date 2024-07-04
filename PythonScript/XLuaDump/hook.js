// 解密lua脚本
// https://www.bookstack.cn/read/lua-5.3/spilt.33.spilt.1.5.md

// int luaL_loadbuffer (lua_State *L, const char *buff, size_t sz, const char *name);
// 等价于 luaL_loadbufferx，其 mode 参数等于 NULL

// int luaL_loadbufferx (lua_State *L, const char *buff, size_t sz, const char *name, const char *mode);
// 把一段缓存加载为一个 Lua 代码块。这个函数使用 lua_load 来加载 buff 指向的长度为 sz 的内存区
// 这个函数和 lua_load 返回值相同。name 作为代码块的名字，用于调试信息和错误消息。mode 字符串的作用同函数 lua_load


function hook_loadbuffer(so) {
    let loadbuffer = Module.findExportByName(so, "luaL_loadbufferx");
    console.log(JSON.stringify(Process.getModuleByAddress(loadbuffer)))  // 从地址得到所在so
    Interceptor.attach(loadbuffer, {
        onEnter: function (args) {
            let size = args[2].toInt32();
            let buff = args[1].readCString(size);
            let name = args[3].readCString();
            // console.log(`[ * ] ${size} ${name} ${buff.slice(0, 30)}`)  // debug
            send({"name": name, "size": size, "buff": buff})
        }
    })
}

function monitingLoadSo(soList, hook_func) {
    // dlopen地址  监控So加载名 Hook方法
    function hook_dlopen(addr) {
        Interceptor.attach(addr, {
            onEnter: function (args) {
                this.soName = args[0].readCString();  // 输出so路径
            }, onLeave: function (retval) {
                if (this.soName) {
                    for (const soListElement of soList) {
                        if (this.soName.includes(soListElement)) {
                            hook_func(soListElement);
                            console.log(`[!] ${this.soName} load success!`);
                            break;
                        }
                    }
                }
            }
        })
    }

    // const dlopen = Module.findExportByName("libdl.so", "dlopen");
    // console.log(JSON.stringify(Process.getModuleByAddress(dlopen)))  // 从地址得到所在so
    // hook_dlopen(dlopen);  // Android14 hook 有时候会导致手机软重启
    const android_dlopen_ext = Module.findExportByName("libdl.so", "android_dlopen_ext");  // Android 高版本API
    hook_dlopen(android_dlopen_ext);
}

monitingLoadSo(['libgame.so', 'libxlua.so'], hook_loadbuffer)

// frida -Ul hook.js -f com.bf.sgs.hdexp
// frida -Ul hook.js -f com.cwqmx.lylxsxb37
// frida -Ul hook.js -f com.tencent.sqsd
// frida --no-pause -Ul hook.js -f com.cwqmx.lylxsxb37