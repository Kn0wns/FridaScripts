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
    filename = filename.replaceAll('@', '') + '.lua'

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
    console.log(fullPath);

    // 写入文件
    let ios = new File(fullPath, "wb");
    ios.write(data);
    ios.flush();    // 刷新数据后才会存入数据
    ios.close();
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
            if (filename == buff_str) filename = `unknow_${++index}.lua`;
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
                if (soList.includes(this.soName)) {
                    console.log(`[!] ${this.soName} load success!`);
                    hook_func(soListElement);
                }
            }
        })
    }

    const dlopen = Module.findExportByName("libdl.so", "dlopen");
    // console.log(JSON.stringify(Process.getModuleByAddress(dlopen)))  // 从地址得到所在so
    hook_dlopen(dlopen);  // Android14 hook 有时候会导致手机软重启
    const android_dlopen_ext = Module.findExportByName("libdl.so", "android_dlopen_ext");  // Android 高版本API
    hook_dlopen(android_dlopen_ext);
}

monitingLoadSo(['libgame.so', 'libxlua.so'], hook_loadbuffer)

// frida -Ul hook.js -f com.bf.sgs.hdexp
// frida -l hook.js -f com.tencent.sqsd -H 192.168.137.119:9527
// 查看 IP adb shell su -c ifconfig wlan0 | findstr Mask