// @Time    : 2022-05-22 9:05
// @Author  : KKings
// @File    : 16 hook_inline.js
// @Software: PyCharm

// hook某一行汇编 查看 x8 寄存器值
function hook_inline(targetSo, offset) {
    const hookAddr = Module.findBaseAddress(targetSo).add(offset); // hook地址
    Interceptor.attach(hookAddr, {
        onEnter: function (args) {
            console.log("onEnter: ", this.context.x8);  // 没有w8寄存器只有x8寄存器 打印0x5
        }, onLeave: function (retval) {
            console.log("onLeave: ", this.context.x8.toInt32());  // 打印0xb 也就是11
            console.log(this.context.x8 & 7);  // 取低32位值 打印3
            /*
                比如 寄存器数据是 0x12345678,但是我只要其中的 0x3456 就需要用到位与,需要的是整个寄存器的话那就 x 就行
                F&Q:他这个x会不会受到上下文影响,就是比如我读w8,但是我是x8 他就包含了w8 w9?
                Q:x8包含w8,w8是x8的低32位,跟w9没关系
            */
        }
    });
}