// @Time    : 2022-05-20 23:55
// @Author  : KKings
// @File    : So 堆栈打印.js
// @Software: PyCharm

console.log('CCCryptorCreate called from:\n' + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');

Backtracer.FUZZY        // 模糊回溯器在堆栈上执行取证以猜测返回地址，这意味着您会得到误报，但它适用于任何二进制文件
Backtracer.ACCURATE     // 准确的回溯追踪器依赖于调试器友好的二进制文件或调试信息的存在来做好工作，但要避免误报
