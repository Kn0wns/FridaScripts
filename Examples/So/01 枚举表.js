// console.log(JSON.stringify(imports[0]));
// {"type":"function","name":"__cxa_atexit","module":"/system/lib64/libc.so","address":"0x79013b40b4"}
// type(类型) name(名字) module(路径) address(内存中真实地址)

function _enum(t) {
    for (const t of imports) {
        // console.log(JSON.stringify(t))
        console.log(`${t.name} - ${t.address}`)
    }
}

const imports = Module.enumerateImports("libencryptlib.so"); // 导入表
const exports = Module.enumerateExports("libencryptlib.so"); // 导出表:SHT_DYNSYM,So运行必须的符号不可去除
const Symbols = Module.enumerateSymbols("libencryptlib.so") // 符号表:SHT_SYMTAB,SHT_DYNSYM属于子集,不是So运行所必须的,编译时一般会被去掉
// _enum(imports)
// _enum(exports)
// _enum(Symbols)

// 操作App So推荐枚举exports
// 操作系统So推荐枚举Symbols

const modules = Process.enumerateModules();// 枚举所有模块
_enum(modules)
// 从枚举的所有模块里在枚举其中三个表
// modules[0].enumerateExports()
// modules[0].enumerateImports()
// modules[0].enumerateSymbols()
