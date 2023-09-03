// @Time    : 2022-05-20 20:56
// @Author  : KKings
// @File    : 08 Call_native.js
// @Software: PyCharm

// 1. 声明函数指针
// 文档：https://frida.re/docs/javascript-api/#NativeFunction
// 语法：new NativeFunction(address, returnType, argTypes[, abi])

// 2. 支持的returnType和argTypes
// void、pointer、int、uint、long、ulong、char、uchar、float、double
// int8、uint8、int16、uint16、int32、uint32、int64、uint64、bool
// size_t、ssize_t

// 3. 代码示例

//拿到函数地址
const funcAddr = Module.findBaseAddress("libkk.so").add(0x23F4);
//声明函数指针
const func = new NativeFunction(funcAddr, "pointer", ['pointer', 'pointer']);
const env = Java.vm.tryGetEnv();
console.log("env: ", JSON.stringify(env));
if (env != null) {
    const jstr = env.newStringUtf("K is very good!!!");
    const cstr = func(env, jstr);
    console.log(cstr.readCString());
    console.log(hexdump(cstr));
}

