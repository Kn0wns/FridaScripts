// @Time    : 2022-05-16 22:05
// @Author  : KKings
// @File    : diyURL.js
// @Software: PyCharm

function hook_shield() {
    let Builder = Java.use("okhttp3.Request$Builder")
    Builder.header.implementation = function (key, value) {
        if (typeof this.build().url != "undefined" && this.build().url().toString().indexOf("search/user") > -1) {
            let encryptUrl = this.build().url().toString();
            let devnulUrl = encryptUrl.replace("xiaohongshu.com", "baidu.com");
            console.log("key,value:===>", key, value)
            return this.url(devnulUrl).header(key, value);

        }
        return this.header(key, value)
    }
    Builder.addHeader.implementation = function (key, value) {
        console.log("addHeader key,value:==>", key, value)
        return this.addHeader(key, value)
    }

    let RealInterceptorChain = Java.use("okhttp3.internal.http.RealInterceptorChain")
    RealInterceptorChain.proceed.overload("okhttp3.Request").implementation = function (request) {
        if (typeof request.url != "undefined" && typeof request.newBuilder != "undefined" && typeof request.newBuilder().url != "undefined") {
            let myurl = "https://www.xxxx.com/api/sns/v3/search/user?keyword=%E7%BE%8E%E9%A3%9F&page=2&page_size=20&search_id=ssssxxx"
            let newRequest = request.newBuilder().url(myurl).build();
            let response = this.proceed(newRequest)
            let chainObject = this;
            return response;
        }
    }
}

function hook_java() {
    Java.perform(function () {
        let XhsHttpInterceptor = Java.use("com.xxx.shield.http.XhsHttpInterceptor")
        XhsHttpInterceptor.intercept.overload("okhttp3.Interceptor$Chain", "long").implementation = function (x, y) {
            let result = this.intercept(x, y)
            console.log("x,y:===>", x, y)
            console.log("result:===>", result)
            return result;
        }
        hook_shield()
    });
}

function main() {
    hook_java();
    hook_native();
}

function hook_native() {
}

setImmediate(main)
