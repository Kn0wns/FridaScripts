// @Time    : 2022-05-14 9:36
// @Author  : KKings
// @File    : StringBuffer.js
// @Software: PyCharm

Java.perform(function () {
    var str = Java.use("java.lang.StringBuffer");
    str.append.implementation = function () {
        showStack();
        var result = this.append();
        console.log("str.append result: ", newStr);
        return result;
    }
})