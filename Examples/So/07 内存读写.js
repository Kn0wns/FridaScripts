// @Time    : 2022-05-18 22:25
// @Author  : KKings
// @File    : 07 内存读写.js
// @Software: PyCharm

// 读取指定地址的字符串
var soAddr = Module.findBaseAddress("libc.so");  // 获取So基地址
console.log(soAddr.add(0x2C00).readCString());  // add偏移 读取字符串

// 读指定地址的内存
console.log(soAddr.add(0x2C00).readByteArray(16)); // readByteArray读指定大小字节
console.log(Memory.readByteArray(soAddr.add(0x2C00), 16));  // 原API


// 写指定地址的内存
soAddr.add(0x2C00).writeByteArray(stringToBytes("strstr"));
console.log(hexdump(soAddr.add(0x2C00)));

// 申请新内存写入
Memory.alloc(size)
Memory.allocUtf8String(str) // 申请内存写入str 自动生成字符串结尾00

// 修改内存权限
Memory.protect(ptr(libso.base), libso.size, 'rwx'); // r 可读 w 可写 x 可执行
