// @Time    : 2022-05-14 21:58
// @Author  : KKings
// @File    : 输出类的所有方法名.js
// @Software: PyCharm

function enumMethods(targetClass) {
    let ret;
    Java.perform(function () {
        const hook = Java.use(targetClass);
        ret = hook.class.getDeclaredMethods();
        ret.forEach(function (s) {
            console.log(s);
        })
    })
    return ret;
}