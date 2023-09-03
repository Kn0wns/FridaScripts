// Time    : 2023-03-04 19:00
// Author  : KKings
// File    : bypass_java.js
// Software: WebStorm

export const bypass_java_exec = () => {

}

// Runtime.getRuntime().exec("ps -ef");
// [Java exec详解 - 调用系统命令以及进程-阿里云开发者社区](https://developer.aliyun.com/article/48878)
function hook_exec() {
    Java.performNow(function () {
        Java.use("java.lang.Runtime").exec.overload('java.lang.String').implementation = function (str) {
            var result = this.exec(str)
            console.log("str=" + str);
            return result
        }
        Java.use("java.lang.Runtime").exec.overload('[Ljava.lang.String;').implementation = function (strArr) {
            var result = this.exec(strArr)
            console.log("strArr=" + strArr);
            return result
        }
        Java.use("java.lang.Runtime").exec.overload('java.lang.String', '[Ljava.lang.String;').implementation = function (str, strArr) {
            var result = this.exec(str, strArr)
            console.log("str=" + str);
            return result
        }
        Java.use("java.lang.Runtime").exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;').implementation = function (strArr1, strArr2) {
            var result = this.exec(strArr1, strArr2)
            console.log("strArr2=" + strArr2);
            return result
        }
        Java.use("java.lang.Runtime").exec.overload('java.lang.String', '[Ljava.lang.String;', 'java.io.File').implementation = function (str, strArr, file) {
            var result = this.exec(str)
            console.log("str=" + str);
            return result
        }
        Java.use("java.lang.Runtime").exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;', 'java.io.File').implementation = function (strArr1, strArr2, file) {
            var result = this.exec(strArr1, strArr2, file)
            console.log("strArr2=" + strArr2);
            return result
        }
    })
}