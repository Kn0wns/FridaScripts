// @Time    : 2022-05-14 12:32
// @Author  : KKings
// @File    : 重载方法Hook.js
// @Software: PyCharm

/*
* Hook 所有重载函数
* */

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

Java.perform(() => {
    hook_overloads("com.xiaojianbang.hook.Utils", "getCalc");
})
