// @Time    : 2022-05-10 10:04
// @Author  : KKings
// @File    : java.util.ArrayList.js
// @Software: PyCharm

// ArrayList的add、addAll、set方法等
// Vector、LinkedList
Java.perform(function () {
    var arrayList = Java.use("java.util.ArrayList");
    arrayList.add.overload('java.lang.Object').implementation = function () {
        if (arguments[0].indexOf("拦截关键词") != -1) {
            showStack();
            console.log("arrayList.add: ", arguments);
        }
        return this.add.apply(this, arguments);
    }
    arrayList.add.overload('int', 'java.lang.Object').implementation = function () {
        console.log("arrayList.add: ", arguments);
        return this.add.apply(this, arguments);
    }
})

