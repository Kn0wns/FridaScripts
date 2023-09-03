// @Time    : 2022-05-16 21:54
// @Author  : KKings
// @File    : AntiFrida.js
// @Software: PyCharm


function main() {
    Java.perform(function () {
        console.log("[*] I am  a hook function");
        const strStr = Module.findExportByName("libc.so", "strstr");
        console.log("[*] strstr addr: " + strStr);
        Interceptor.attach(strStr, {
            onEnter: function (args) {
                console.log("[*] strstr hooked");
                const arg0 = ptr(args[0]).readCString();
                const arg1 = ptr(args[1]).readCString();
                if (arg1.indexOf(":5DBA") >= 0) {
                    console.log("[*] strstr hooked" + arg0 + "," + arg1 + ")");
                    this.dba = true

                }
                if (arg1.indexOf(":69A2") >= 0) {
                    console.log("[*] strstr hooked" + arg0 + "," + arg1 + ")");
                    this.a2 = false
                }

                if (arg1.indexOf("LIBFRIDA") >= 0) {
                    console.log("[*] strstr hooked" + arg0 + "," + arg1 + ")");
                    this.LIBFRIDA = true;
                }
                if (arg1.indexOf("frida") >= 0) {
                    console.log("[*] strstr hooked" + arg0 + "," + arg1 + ")");
                    this.frida = true;

                }
            },
            onLeave: function (retval) {
                if (this.a2) {
                    console.log("[*] a2 hooked" + retval);
                    retval.replace(0x0);
                }
                if (this.dba) {
                    console.log("[*] d8a hooked" + retval);
                    retval.replace(0x0);
                }
                if (this.LIBFRIDA) {
                    console.log("[*] the LIBFRIDA result: " + retval);
                    retval.replace(0x0)
                }
                if (this.frida) {
                    console.log("[*] the frida result: " + retval);
                    retval.replace(0x0)
                }
            }
        });

    })
}
