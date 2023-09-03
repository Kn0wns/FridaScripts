// @Time    : 2022-05-10 10:04
// @Author  : KKings
// @File    : java.util.HashMap.js
// @Software: PyCharm

/*  put 方法
    java.util.HashMap
    java.util.HashSet
    java.util.LinkedHashMap
    java.util.LinkedHashSet*/
Java.perform(function () {
    var HashMap = Java.use("java.util.HashMap");
    HashMap.put.implementation = function () {
        if (arguments[0].indexOf('关键词') != -1) {
            showStack();
            console.log("hashMap.put: ", a, b);
        }
        return this.put.apply(this, arguments);
    }
})

// //HashMap的打印
// var utils = Java.use("com.xiaojianbang.hook.Utils");
// var stringBuilder = Java.use("java.lang.StringBuilder");
// utils.shufferMap.implementation = function (a) {
//     var key = a.keySet();
//     var it = key.iterator();
//     var result = stringBuilder.$new();
//     while(it.hasNext()){
//         var keystr = it.next();
//         var valuestr = a.get(keystr);
//         result.append(valuestr);
//     }
//     console.log("utils.shufferMap param: ", result.toString());
//     var result = this.shufferMap(a);
//     console.log("utils.shufferMap result: ", result);
//     return result;
// }
// frida -UFl HashMap.js -o log.txt