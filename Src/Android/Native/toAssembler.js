// Time    : 2023-03-11 22:08
// Author  : KKings
// File    : toAssembler.js
// Software: WebStorm

//  翻译指定内存位置的代码汇编
function toAssembler(pointer,length){
    length = arguments[1] ? arguments[1] : 10
    let baseAddr = Module.findBaseAddress(soName)
    console.error("-----------------------------------")
    console.warn("Module Addr = \t" + baseAddr)
    console.error("------------------")
    let target = ptr(pointer)
    for (let t = 0; t < length; t++) {
        let t_addr = target.add(Process.pointerSize * t)
        console.log(t_addr + " -> " + t_addr.sub(baseAddr) + "\t" + Instruction.parse(t_addr))
    }
    console.error("-----------------------------------")
}