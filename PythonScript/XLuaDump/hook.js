// https://www.bookstack.cn/read/lua-5.3/spilt.33.spilt.1.5.md

// int luaL_loadbuffer (lua_State *L, const char *buff, size_t sz, const char *name);
// 等价于 luaL_loadbufferx，其 mode 参数等于 NULL

// int luaL_loadbufferx (lua_State *L, const char *buff, size_t sz, const char *name, const char *mode);
// 把一段缓存加载为一个 Lua 代码块。这个函数使用 lua_load 来加载 buff 指向的长度为 sz 的内存区
// 这个函数和 lua_load 返回值相同。name 作为代码块的名字，用于调试信息和错误消息。mode 字符串的作用同函数 lua_load

var g_appFilePath = ""  // `/data/data/包名/files/XLuaDump/`
var index = 0;

function getAppFilesPath() {
    var currentApplication = Java.use('android.app.ActivityThread').currentApplication();
    var context = currentApplication.getApplicationContext();
    g_appFilePath = context.getFilesDir().toString() + '/XLuaDump/';
    return context.getFilesDir().toString() + '/XLuaDump/';
}

function createDirIfNeeded(path) {
    var file = Java.use('java.io.File');
    var dir = file.$new(path);
    if (!dir.exists()) dir.mkdirs();     // 如果目录不存在，则创建目录
    return dir.toString();
}

function writeFile(filename, data) {
    filename = filename.replaceAll('@', '').replaceAll(/(\.)(?!lua)/gm, "/") + '.lua'

    if (g_appFilePath == "") getAppFilesPath();

    // 提取路径和文件名
    var file = Java.use('java.io.File');
    var filePath = file.$new(`${g_appFilePath}/${filename}`);
    var parentDir = filePath.getParent();
    var fileName = filePath.getName();

    // 创建必要的目录
    createDirIfNeeded(parentDir);

    // 完整文件路径
    var fullPath = filePath.toString();
    console.warn(`[*] 文件写入:${fullPath}`);

    // 写入文件
    let ios = new File(fullPath, "wb");
    ios.write(data);
    ios.flush();    // 刷新数据后才会存入数据
    ios.close();
}

function safeSelf() {
    let connect = Module.findExportByName("libc.so", "connect");
    if (connect != null) {
        Interceptor.attach(connect, {
            onEnter: function (args) {
                let arg = args[1];
                let port = arg.add(0x2).readUShort();
                if (port == 41577 || port == 35421) {
                    arg.add(0x2).writeUShort(26151);
                    console.warn(`[!] 端口号被修改为26151`)
                }
            }
        })
    } else console.error(`未找到connect函数`)
}

function hook_loadbuffer(so) {
    let loadbuffer = Module.findExportByName(so, "luaL_loadbufferx");
    // console.log(JSON.stringify(Process.getModuleByAddress(loadbuffer)))  // 从地址得到所在so
    Interceptor.attach(loadbuffer, {
        onEnter: function (args) {
            let size = args[2].toInt32();
            let buff_bytes = args[1].readByteArray(size);
            let buff_str = args[1].readCString(size);
            let filename = args[3].readCString();
            if (filename == buff_str) filename = `unknow_${++index}`;
            writeFile(filename, buff_bytes);
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
                // this.soName => /data/app/~~BTv61GMj2yXUWhUu27Q6JA==/com.tencent.sqsd-ayKe8c6Clx2_5sUzy_AO7Q==/lib/arm64/libxlua.so
                // soList => libgame.so,libxlua.so
                if (this.soName) {
                    // console.log(`[*] ${this.soName}`)
                    for (const soListElement of soList) {
                        if (this.soName.includes(soListElement)) {
                            console.log(`[!] ${this.soName} load success!`);
                            hook_func(soListElement);
                        }
                    }
                }
            }
        })
    }

    const android_dlopen_ext = Module.findExportByName("libdl.so", "android_dlopen_ext");  // Android 高版本API
    hook_dlopen(android_dlopen_ext);
}

safeSelf()
monitingLoadSo(['libgame.so', 'libxlua.so'], hook_loadbuffer)

// frida -Ul hook.js -f com.bf.sgs.hdexp
// frida -Ul hook.js -f com.tencent.sqsd