// @Time    : 2022-05-14 21:57
// @Author  : KKings
// @File    : 定位抽象类的实现.js
// @Software: PyCharm

function findImplementeAbstract() {
    Java.perform(function () {
        var classes = Java.enumerateLoadedClassesSync();
        for (const className of classes) { //数组迭代
            if (className.indexOf("com.kk") == -1) continue; // 过滤类
            let clazz = Java.use(className);
            let resultClass = clazz.class.getSuperclass();  // 获取父类
            if (resultClass == null) continue;
            if (resultClass.toString().indexOf("com.kk.app.TestAbstract") != -1) { // 过滤
                console.log(className, resultClass);
            }
        }
    })
}