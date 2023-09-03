// @Time    : 2022-05-10 10:04
// @Author  : KKings
// @File    : Base64.js
// @Software: PyCharm

// Base64
// java.net.URLEncoder
// java.util.Base64
// okio.Base64
// okio.ByteString
Java.perform(function () {
    var base64 = Java.use("android.util.Base64")
    base64.encodeToString.overload('[B', 'int').implementation = function (a, b) {
        showStack();
        console.log("base64.encodeToString: ", JSON.stringify(a));
        var result = this.encodeToString(a, b);
        console.log("base64.encodeToString result: ", result)
        return result;
    }
})