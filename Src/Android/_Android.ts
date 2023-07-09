import {FSLog} from "../FSLogger";

export namespace Android {
    /**
     * 批量 hook java 方法并输出对应信息
     * @param clzName {string}类名
     * @param methodNames {any}方法名,可以是单个也可以是数组
     * @param isShowStacks {boolean}
     */
    export const jhook = (clzName: string, methodNames: any, isShowStacks: boolean) => {
        if (!(methodNames instanceof Array))
            methodNames = [methodNames]
        for (const fn of methodNames) {
            fn && Java.perform(() => {
                Java.use(clzName)[fn].implementation = function () {
                    const ret = this[fn](...arguments);
                    FSLog.formatArguments(arguments, ret, clzName, fn, isShowStacks, null) // 打印参数/返回值
                    return ret
                }
            });
        }
    }

    /**
     * @description: 主动调用 Java
     * @date: 2023-02-08 16:37
     * @param className {String} 类名
     * @param methodName {String} 方法名
     * @param params {string} 参数
     */
    export const callMethod = (className: string, methodName: string, params: string) => {
        let instance = Java.use(className)
        // 找不到类则进行内存搜索
        !instance && Java.choose(className, {
            onMatch(ins) {
                instance = ins  // 查找实例
            },
            onComplete() {
            }
        })

        const ret = instance[methodName](...params);
        FSLog.d(callMethod.name, `[>>>] call.${methodName}: ${ret}`)
    }
}