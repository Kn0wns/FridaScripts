// @Time    : 2022-05-10 10:09
// @Author  : KKings
// @File    : enumerateClassMethods.js
// @Software: PyCharm

Java.perform(function () {
    console.log(Java.enumerateLoadedClassesSync().join("\n"))  // 同步枚举已加载类 enumerateLoadedClassesSync返回数组
});

setTimeout(function () {
    Java.perform(function () {
        console.log("\n[*] enumerating classes...");
        Java.enumerateLoadedClasses({
            onMatch: function (_className) {
                console.log("[->]\tfound instance of '" + _className + "'");
            },
            onComplete: function () {
                console.log("[*]\tclass enuemration complete");
            }
        });
    });
}, 0);

// 枚举类下的所有方法
setImmediate(function () {
    Java.perform(function () {
        var Clazz = Java.use("类名");                                               // 获取类的字节码
        var Constructors = Clazz.class.getDeclaredConstructors();                   // Java反射 获取构造函数
        var methods = Clazz.class.getDeclaredMethods();                             // Java反射 通过类的字节码获取方法数组 不包括构造函数及内部类
        // console.log(methods);       // 方法数组
        methods.forEach(function (item, index) {
            console.log('\n[*]\tmethod_name', index + ' => ' + item.getName());
            var method_name = item.getName()                                        // 获取方法名
            for (let i = 0; i < methods[method_name].overloads.length; i++) {
                // methods.method_name会报错  用这个就不会 methods[method_name] 踩坑笔记
                // .的话是针对json或者是对象成员的操作
                // []是取数组或者键值对
                methods[method_name].overloads[i].implementation = function () {
                    // Hook逻辑
                    for (let k = 0; k < arguments.length; k++) {                    // arguments 参数数组
                        console.log(arguments[k]);
                    }
                    return this[method_name].apply(this, arguments);                // 重新调用
                }
            }
        });
    });
})
// item.getName()  不加 getName() 则会输出完整的方法名 public static ...
// public static java.lang.String com.xiaojianbang.app.MD5.md5_1(java.lang.String) throws java.lang.Exception
// md5_1