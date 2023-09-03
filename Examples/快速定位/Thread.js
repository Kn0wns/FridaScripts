// @Time    : 2022-05-10 10:03
// @Author  : KKings
// @File    : java.lang.Thread.js
// @Software: PyCharm

function showStacks() {
    console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
}
//在多线程中快速定位关键代码
//java.lang.Thread相关代码或者以下的线程池相关代码
var ThreadPoolExecutor = Java.use("java.util.concurrent.ThreadPoolExecutor");
ThreadPoolExecutor.execute.implementation = function (a) {
    showStacks();
    return this.execute(a);
}
ThreadPoolExecutor.submit.overload('java.lang.Runnable').implementation = function (a) {
    showStacks();
    return this.submit(a);
}
ThreadPoolExecutor.submit.overload('java.util.concurrent.Callable').implementation = function (a) {
    showStacks();
    return this.submit(a);
}
ThreadPoolExecutor.submit.overload('java.lang.Runnable', 'java.lang.Object').implementation = function (a, b) {
    showStacks();
    return this.submit(a, b);
}
