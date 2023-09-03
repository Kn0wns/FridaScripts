// @Time    : 2022-05-10 10:03
// @Author  : KKings
// @File    : Okhttp3.js
// @Software: PyCharm

//快速定位协议头加密okhttp3的addHeader方法
var okhttp_Builder = Java.use('okhttp3.Request$Builder');
okhttp_Builder.addHeader.implementation = function (a, b) {
    showStacks();
    return this.addHeader(a, b);
}