// @Time    : 2022-05-10 10:02
// @Author  : KKings
// @File    : android.util.Log.js
// @Software: PyCharm

// Log
var log = Java.use("android.util.Log");
log.w.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
    showStack();
    console.log("log.w: ", tag, message);
    return this.w(tag, message);
}