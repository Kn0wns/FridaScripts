// @Time    : 2022-05-17 21:26
// @Author  : KKings
// @File    : 03.js
// @Software: PyCharm

// 导出表、导入表、符号表找到不函数时,地址就需要自己计算
// 计算方式 = So基址 + 函数偏移[+1]

// 获取基址
const SoName = 'libart.so'
const module1 = Process.findModuleByName(SoName); // 返回 module 对象
const module2 = Process.getModuleByName(SoName); // 返回 module 对象
const soAddress = Module.findBaseAddress(SoName); // 返回So基址
// {"name":"libart.so","base":"0x787cea0000","size":6418432,"path":"/system/lib64/libart.so"} base(基址)
// console.log("Process.findModuleByName:",JSON.stringify(module1));
// console.log("Process.getModuleByName:",JSON.stringify(module2));
// console.log("Module.findBaseAddress:",soAddress);

const modules = Process.enumerateModules(); // 返回数组对象
for (const module of modules) if (module.name === 'libencryptlib.so') console.log(JSON.stringify(module))

Process.findModuleByAddress(地址); // 传入地址 返回module
Process.getModuleByAddress(地址) // 传入地址 返回module

// 通过符号反查模块地址
console.log(JSON.stringify(Process.findModuleByAddress(Module.findExportByName(null, "dlsym"))))

/* 函数地址是否 +1
thumb指令函数地址计算方式:So基址 + 函数偏移 +1
arm指令函数地址计算方式:So基址 + 函数偏移
32位So中 基本都是thumb指令
64位SO中 基本都是arm指令

查看汇编代码的机器码(opcode bytes):4字节则为arm(79 92 00 94)
    options -> general -> Number of opcode bytes(non-graph) 4/8
    设置 -> 常规 -> 操作字节数(非图表) -> 修改为4或8*/
