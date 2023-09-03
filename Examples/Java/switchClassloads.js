// @Time    : 2022-05-14 15:01
// @Author  : KKings
// @File    : switchClassloads.js
// @Software: PyCharm


function switchClassloads(className) {
    let DexClassLoader = Java.use('dalvik.system.DexClassLoader');
    console.log(DexClassLoader,Object.keys(DexClassLoader).join('\n'))
    DexClassLoader.loadClass.overload('java.lang.String').implementation = function () {
        console.log(...arguments)
        return this.loadClass(...arguments);
    }

    let ClassLoader = Java.use('java.lang.ClassLoader');
    console.log(ClassLoader,Object.keys(ClassLoader).join('\n'))
        ClassLoader.loadClass.overload('java.lang.String').implementation = function () {
        console.log('1', ...arguments)
        // if (arguments[0] == className) Java.classFactory.loader = this  // 切换classloader
        return this.loadClass(...arguments);
    }

    // let BootClassLoader = Java.use('java.lang.ClassLoader$BootClassLoader');
    // console.log(BootClassLoader, Object.keys(BootClassLoader).join('\n'))
    // ClassLoader.loadClass.implementation = function () {
    //     console.log('1', ...arguments)
    //     // if (arguments[0] == className) Java.classFactory.loader = this  // 切换classloader
    //     return this.loadClass(...arguments);
    // }
}


Java.perform(() => {
    switchClassloads("com.class.name");
})