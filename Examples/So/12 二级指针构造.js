// @Time    : 2022-05-21 10:56
// @Author  : KKings
// @File    : 12 二级指针构造.js
// @Software: PyCharm

function call_func() {
    const soAddr = Module.findBaseAddress("libkk.so").add(0x17D0); // 获取函数地址
    const _func = new NativeFunction(soAddr, 'int64', ['pointer']); // 构造So方法

    const _str = Memory.allocUtf8String("构造字符串"); // 构造1级指针:申请内存写入字符串,返回地址NativePointer
    console.log(hexdump(_str));
    const _str2 = Memory.alloc(8).writePointer(_str); // 构造2级指针:申请指定大小的内存写入指针 (指针变量8字节)

    _func(_str2); // 调用方法
    console.log(hexdump(_str));
}
