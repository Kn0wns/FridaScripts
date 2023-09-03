// @Time    : 2022-05-14 9:37
// @Author  : KKings
// @File    : StringBuilder.js.js
// @Software: PyCharm

Java.perform(function () {
    var str = Java.use("java.lang.StringBuilder");
    str.append.implementation = function () {
        showStack();
        var result = this.append();
        console.log("str.append result: ", newStr);
        return result;
    }
})