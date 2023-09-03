// @Time    : 2022-05-16 23:12
// @Author  : KKings
// @File    : 02 Hook.js
// @Software: PyCharm

const func = "_ZN7MD5_CTX11MakePassMD5EPhjS0_" // 汇编中的方法名
const SoName = "libencryptlib.so"
const funcAddr = Module.findExportByName(SoName, func); // 返回方法地址
console.log(funcAddr)
// Interceptor:拦截器,执行到指定地址时进入回调方法
// 1.进入时执行onEnter
// 2.执行原函数
// 3.退出时执行onLeave

Interceptor.attach(funcAddr, {
    onEnter: function (args) {
        console.log("[*]\t arg[1] :=>", hexdump(args[1])) // *InputChars
        console.log("[*]\t arg[2] :=>", args[2].toInt32()) // InputCharsLen
        this.arg3 = args[3] // *OutChars
    },
    onLeave: function () {
        console.log("[*]\t arg[3] :=>", hexdump(this.arg3))
    }
})

/* IDA 数据
    void __fastcall MD5_CTX::MakePassMD5(
            MD5_CTX *this,
            unsigned __int8 *InputChars,
            unsigned int InputCharsLen,
            unsigned __int8 *OutChars)
    {
      const unsigned __int8 *v6; // x2
      unsigned __int8 digest[5]; // [xsp+58h] [xbp-18h] BYREF
      __int64 v8; // [xsp+68h] [xbp-8h]

      v8 = *(_ReadStatusReg(ARM64_SYSREG(3, 3, 13, 0, 2)) + 40);
      MD5_CTX::MD5Update(this, InputChars, InputCharsLen);
      MD5_CTX::MD5Final(this, digest);
      sprintf(OutChars, 0xFFFFFFFFFFFFFFFFLL, v6, digest[0], digest[1], digest[2], digest[3], digest[4]);
    }*/

/* 输出数据
0x785ab0fa38
[*]      arg[1] :=>              0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  0123456789ABCDEF
7858f03aa0  31 36 35 32 37 39 33 33 39 34 34 35 34 34 64 38  16527933944544d8
7858f03ab0  36 66 64 64 36 65 35 37 35 34 38 32 32 38 33 63  6fdd6e575482283c
7858f03ac0  35 35 64 37 33 37 61 64 32 39 63 35 35 00 00 00  55d737ad29c55...
7858f03ad0  28 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  (...............
7858f03ae0  00 00 00 00 00 00 00 00 00 00 00 00 03 00 00 00  ................
7858f03af0  a8 c9 d9 52 78 00 00 00 09 00 00 00 00 00 00 00  ...Rx...........
7858f03b00  00 00 80 3f 00 00 00 00 00 00 00 00 00 00 00 00  ...?............
7858f03b10  00 00 80 3f 00 00 00 00 00 00 00 00 00 00 00 00  ...?............
7858f03b20  00 00 80 3f 10 00 00 00 00 00 00 00 00 00 00 00  ...?............
7858f03b30  28 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  (...............
7858f03b40  00 00 00 00 00 00 00 00 00 00 00 00 03 00 00 00  ................
7858f03b50  08 c9 d9 52 78 00 00 00 09 00 00 00 66 00 00 00  ...Rx.......f...
7858f03b60  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
7858f03b70  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
7858f03b80  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
7858f03b90  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
[*]      arg[2] :=> 45
[*]      arg[3] :=>              0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  0123456789ABCDEF
785b05b6b0  39 61 31 34 33 39 30 37 38 35 62 33 35 30 62 31  9a14390785b350b1
785b05b6c0  35 37 38 32 62 38 61 39 61 34 32 32 38 34 37 61  5782b8a9a422847a
*/
