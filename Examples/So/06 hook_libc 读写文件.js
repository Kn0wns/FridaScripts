// @Time    : 2022-05-18 22:19
// @Author  : KKings
// @File    : 06  内存读写.js
// @Software: PyCharm
function writeText() {
    // 获取So基地址
    const addr_fopen = Module.findExportByName("libc.so", "fopen");  // 打开文件、读取文件
    const addr_fputs = Module.findExportByName("libc.so", "fputs");  // 写入
    const addr_fclose = Module.findExportByName("libc.so", "fclose");  // 关闭文件

    console.log("addr_fopen:", addr_fopen, "addr_fputs:", addr_fputs, "addr_fclose:", addr_fclose);


    /*
        FILE *fopen(const char *filename, const char *mode)
        int fputs(const char *str, FILE *stream)
        int fclose(FILE *stream)
        */
    // 声明函数指针
    const fopen = new NativeFunction(addr_fopen, "pointer", ["pointer", "pointer"]);
    const fputs = new NativeFunction(addr_fputs, "int", ["pointer", "pointer"]);
    const fclose = new NativeFunction(addr_fclose, "int", ["pointer"]);
    //NativeFunction 将地址创建为可调用的函数,第一个参数是函数地址，第二个参数是返回值类型，所有指针类型，包括string(char*),都是pointer
    //第三个参数就是原函数的参数列表

    //native层需要这样创建字符串，在java层就可以直接写字符串
    const filename = Memory.allocUtf8String("/sdcard/KK.txt");  // 注意目录是否有写入权限
    const open_mode = Memory.allocUtf8String("w");
    const file = fopen(filename, open_mode);  // 打开文件
    console.log("fopen:", file);

    const buffer = Memory.allocUtf8String("Write a successful\n");  // 写入内容
    const retval = fputs(buffer, file);
    console.log("fputs:", retval);

    fclose(file);  // 关闭文件
}