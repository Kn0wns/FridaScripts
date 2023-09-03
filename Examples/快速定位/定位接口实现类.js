// @Time    : 2022-05-14 21:57
// @Author  : KKings
// @File    : 定位接口实现类.js
// @Software: PyCharm

// 定位接口实现类
function findImplementeInterFace() {
    Java.perform(function () {
        var classes = Java.enumerateLoadedClassesSync();
        for (const className of classes) { //数组迭代
            if (className.indexOf("com.kk") == -1) continue; // 过滤类
            let clazz = Java.use(className);
            let resultArr = clazz.class.getInterfaces();    // 获取类实现接口 返回数组
            if (resultArr.length == 0) continue;
            for (let i = 0; i < resultArr.length; i++) {
                if (resultArr[i].toString().indexOf("com.kk.app.TestRegisterClass") !== -1) { // 过滤接口
                    console.log(className, resultArr);
                }
            }
        }
    })
}

// Frida检查某个类是否直接或间接的实现了某个接口
function checkIsImplementeInterFace(clsName, interface_) {
    // clsName ==> [java.lang.String
    // interface_ ==> ClassWrap
    try {
        var cls = Java.use(clsName)
        if (cls.class.isInterface()) {
            return false
        }
        if (cls.class != undefined)
            if (interface_.class.isAssignableFrom(cls.class)) {
                return true
            }
        return false
    } catch {
        return false
    }
}