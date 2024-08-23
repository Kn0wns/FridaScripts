/*
struct Il2CppArray
{
    Il2CppObject obj;  // 两个指针 8+8
    Il2CppArrayBounds *bounds;  // 一个指针 8
    il2cpp_array_size_t max_length; // 指针类型 8 | typedef uintptr_t il2cpp_array_size_t;
    ALIGN_TYPE(8) void* vector[IL2CPP_ZERO_LEN_ARRAY];
} Il2CppArraySize;
* */
// RVA: 0x2ECAC50 Offset: 0x2ECAC50 VA: 0x2ECAC50
// public static Assembly Load(byte[] rawAssembly) { } Unity 中的 Byte[] 数组都是 Il2CppArray

const process_name = "com.xqc.sdklink"


function read_Il2CppString(ptr) {
    /*typedef struct Il2CppString
    {
        Il2CppObject object;  // 2 pointer
        int32_t length;  // 0x4
        Il2CppChar chars[IL2CPP_ZERO_LEN_ARRAY];
    } Il2CppString;*/
    let length = ptr.add(Process.pointerSize * 2).readU32();
    return ptr.add(Process.pointerSize * 2 + 0x4).readUtf16String(length);
}

function hotfixDump() {
    let libil2cpp = Module.findBaseAddress("libil2cpp.so")
    Interceptor.attach(libil2cpp.add(0x2ECAC50), {
        onEnter: function (args) {
            // console.log(hexdump(args[0], {ansi: true, header: false}));
            let length = args[0].add(Process.pointerSize * 3).readS64();
            let bytes = args[0].add(Process.pointerSize * 4).readByteArray(length);
            let file = new File(`/data/data/${process_name}/files/hotUpdate.dll`, "wb");
            file.write(bytes);
            file.flush();
            file.close();
            console.warn("[*]\tdump dll done");
        }
    })
}

function gameLog() {
    let libil2cpp = Process.findModuleByName("libil2cpp.so");
    let Trace = libil2cpp.base.add(0x15A466C);
    let Debug = libil2cpp.base.add(0x1599DF4);
    let Info = libil2cpp.base.add(0x159958C);
    let Warning = libil2cpp.base.add(0x159DFFC);
    let Error = libil2cpp.base.add(0x159BC38);

    function _(address, tag) {
        tag = tag.slice(0, 1)
        Interceptor.attach(address, {
            onEnter: function (args) {
                console.log(`[${tag}] ${read_Il2CppString(args[0])}`)
            }
        })
    }

    _(Trace, "Trace");
    _(Debug, "Debug");
    _(Info, "Info");
    _(Warning, "Warning")
    _(Error, "Error")
}

var isHook = false;

// dlopen地址  监控So加载名 Hook方法
function hook_dlopen(addr) {
    Interceptor.attach(addr, {
        onEnter: function (args) {
            this.soName = args[0].readCString();  // 输出so路径
        }, onLeave: function (retval) {
            if (this.soName && this.soName.includes('libil2cpp.so') && isHook == false) {
                console.error(`[*]\t${this.soName} load success!`);
                main()
                isHook = true;
            }
        }
    })
}

function hookSend() {
    // RVA: 0x15A33A8 Offset: 0x15A33A8 VA: 0x15A33A8 Slot: 5
    // public override void Send(MemoryStream memoryStream) { }
    let libil2cpp = Module.findBaseAddress("libil2cpp.so")
    Interceptor.attach(libil2cpp.add(0x15A33A8), {
        onEnter: function (args) {
            let memoryStream = args[1];
            console.log(hexdump(memoryStream, {ansi: true, header: false}))
        }
    })
}

function main() {
    // hotfixDump();
    gameLog();
    hookSend();
}

hook_dlopen(Module.findExportByName(null, "dlopen"));
// hook_dlopen(Module.findExportByName(null, "android_dlopen_ext")); // 传入hook方法 So名 SO加载就Hook

// frida -Ul hook.js -f com.xqc.sdklink
// frida -Ul hook.js -f com.xqc.sdklink -o 1.txt