// @Time    : 2022-05-18 23:53
// @Author  : KKings
// @File    : ARM 汇编.js
// @Software: PyCharm

function hexToString(hexStr) {
    const hex = hexStr.toString();//force conversion
    let str = '';
    for (const i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function hexToBytes(hex) {
    for (let bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function modifyCode() {
    const soAddr = Module.findBaseAddress("libK.so");

    // const codeAddr = soAddr.add(0x1684);
    // Memory.protect(codeAddr, 4, 'rwx');  // 修改内存权限
    // codeAddr.writeByteArray(hexToBytes("0001094B"));  //sub w0, w8, w9 汇编对应机器指令0001094B
    // console.log(Instruction.parse(codeAddr).toString());  // 解析汇编指令 sub w0, w8, w9

    // new Arm64Writer(soAddr.add(0x167C)).putNop();  // FRIDA API 修改汇编指令为nop(不执行)
    // console.log(Instruction.parse(soAddr.add(0x167C)).toString());

    const codeAddr = soAddr.add(0x1684);
    Memory.patchCode(codeAddr, 4, function (code) {
        const writer = new Arm64Writer(code, {pc: codeAddr});
        writer.putBytes(hexToBytes("0001094B"));  //SUB w0, w8, w9
        writer.putBytes(hexToBytes("FF830091"));  //ADD SP, SP, #0x20  堆栈平衡
        writer.putRet();  // Ret 返回
        writer.flush();
    });
}