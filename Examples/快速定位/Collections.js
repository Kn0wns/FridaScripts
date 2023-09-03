// @Time    : 2022-05-14 10:05
// @Author  : KKings
// @File    : Collections.js
// @Software: PyCharm

setImmediate(function () {
    Java.perform(function () {
        let Collections = Java.use('java.util.Collections');
        Collections.sort.overload('java.lang.List').implementation = function () {
            let result = this.sort.apply(this, arguments);
            result = java.cast(result, Java.use('java.util.ArrayList'))
            console.log("[*]\t arg[] :=>", result.toString())
            return result
        }
        Collections.sort.overload('java.lang.List', 'java.util.Comparator').implementation = function () {
            let result = this.sort.apply(this, arguments);
            result = java.cast(result, Java.use('java.util.ArrayList'))
            console.log("[*]\t arg[] :=>", result.toString())
            return result
        }
    });
});

