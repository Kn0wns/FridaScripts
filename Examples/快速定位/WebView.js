// @Time    : 2022-05-10 10:02
// @Author  : KKings
// @File    : WebView.js
// @Software: PyCharm

//快速定位 WebView 加载的文件
var webView = Java.use("android.webkit.WebView");
console.log("WebView: ", webView);
webView.loadData.implementation = function (a, b, c) {
    console.log("WebView.loadData: ", a, b, c);
    return this.loadData(a, b, c);
}
webView.loadUrl.overload('java.lang.String').implementation = function (a) {
    console.log("WebView.loadUrl: ", a);
    return this.loadUrl(a);
}
webView.loadUrl.overload('java.lang.String', 'java.util.Map').implementation = function (a, b) {
    console.log("WebView.loadUrl Map: ", a);
    return this.loadUrl(a, b);
}