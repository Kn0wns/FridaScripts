// @Time    : 2022-05-14 13:44
// @Author  : KKings
// @File    : Hook_clz.js
// @Software: PyCharm

/*
* Hook 类下所有方法
* */

function hook_classMethods(className) {
    function hook_overloads(className, methodName) {
        var clz = Java.use(className);
        var overloadsArr = clz[methodName].overloads;
        for (const overloadsArrElement of overloadsArr) {
            overloadsArrElement.implementation = function () {          // hook 方法
                console.log(`[*]\t Method :=> ${className}.${methodName}`)
                var result = this[methodName](...arguments) // apply 跟call 同理 不同的是apply接收数组类型参数
                for (const argumentsKey in arguments)
                    console.log(`[*]\t arg[${argumentsKey}] :=> ${arguments[argumentsKey]}`) // 打印参数
                console.log(`[*]\t result :=> ${result}`) // 打印结果
                console.log('--------------------------------------------------')
                return result
            }
        }
    }

    var clz = Java.use(className);
    var constructors = clz.class.getDeclaredConstructors(); // 获取类构造方法
    var methods = clz.class.getDeclaredMethods();// 获取类方法
    for (const method of methods) {
        /* public static int com.xiaojianbang.hook.Utils.getCalc(int,int,int,int) -> getCalc */
        // method.getName() // 获取方法名
        hook_overloads(className, method.getName())
    }
}

Java.perform(() => {
    hook_classMethods("com.xiaojianbang.hook.Utils");
})