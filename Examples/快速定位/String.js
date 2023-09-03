// @Time    : 2022-05-10 10:01
// @Author  : KKings
// @File    : java.lang.String.js
// @Software: PyCharm

// String.getBytes  String.isEmpty Java层加解密必定会getBytes
Java.perform(function () {
    var str = Java.use("java.lang.String");
    str.getBytes.overload().implementation = function () {
        showStack();
        var result = this.getBytes();
        var newStr = str.$new(result);
        console.log("str.getBytes result: ", newStr);
        return result;
    }
    str.getBytes.overload('java.lang.String').implementation = function (a) {
        showStack();
        var result = this.getBytes(a);
        var newStr = str.$new(result, a);
        console.log("str.getBytes result: ", newStr);
        return result;
    }
    str.trim.implementation = function () {
        showStack();
        var result = this.trim();
        console.log("str.trim result: ", result);
        return result;
    }
})
