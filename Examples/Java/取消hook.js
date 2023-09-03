// @Time    : 2022-05-14 21:36
// @Author  : KKings
// @File    : 仅Hook一次.js
// @Software: PyCharm

var str = Java.use("java.lang.String");
str.getBytes.overload().implementation = function () {
    showStack();
    var result = this.getBytes();
    var newStr = str.$new(result);
    console.log("str.getBytes result: ", newStr);
    return result;
}
str.getBytes.overload().implementation = null;

// implementation 后面给函数 启用Hook
// implementation 后面null 弃用Hook