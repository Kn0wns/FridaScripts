let baseAddress = Module.findBaseAddress('libflutter.so')?.add(0x3E0F74)
baseAddress && Interceptor.attach(baseAddress, {
    onLeave: (retval) => retval.replace(ptr(0x1))
});

// IDA 分析 libflutter.so 在字符串窗口搜索 ssl_client 定位引用
// .rodata:00000000000EC2DC 73 73 6C 5F 63 6C 69 65 6E 74+aSslClient DCB "ssl_client",0           ; DATA XREF: sub_3E0F74+E4↓o
// 得到引用地址 sub_3E0F74 => 0x3E0F74
// 修改 add 地址 .add(0x3E0F74)