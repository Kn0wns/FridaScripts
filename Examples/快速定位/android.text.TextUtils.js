// @Time    : 2022-05-10 10:04
// @Author  : KKings
// @File    : android.text.TextUtils.js
// @Software: PyCharm


Java.perform(function () {
    // TextUtils.isEmpty
    var textUtils = Java.use("android.text.TextUtils");
    textUtils.isEmpty.implementation = function (a) {
        if (arguments[0].indexOf("拦截关键词") != -1) {
            showStack();
            console.log("textUtils.isEmpty: ", arguments);
        }
        return this.isEmpty.apply(this, arguments);
    }
})