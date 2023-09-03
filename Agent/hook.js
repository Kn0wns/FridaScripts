function showStacks() {
    console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
}

function formatArguments(args, ret, clzName, funN, stacks, len) {
    // 格式化输出参数 or 返回值
    stacks && utils.showStacks();
    const LEN = len ? len : 20;
    const Call = `${clzName}.${funN}`.padEnd(LEN, " ");
    console.log(`[>>>] ${Call}`);
    for (const key in args) {
        let _arg = typeof args[key] === "string" ? args[key] : JSON.stringify(args[key])
        let argStr = `${funN}_arg[${key}]`.padEnd(LEN, " ");
        console.log(`[ + ] ${argStr} :=>  ${_arg}`)
    }
    const result = `${funN}_result`.padEnd(LEN, " ");
    console.log(`[<<<] ${result} :=>  ${ret}`);
    console.log(`-`.padEnd(LEN * 2, `-`));
}

function jhook(clzN, funN, isShowStacks) {
    if (!(funN instanceof Array)) funN = [funN]
    for (const fn of funN) {
        fn && Java.perform(() => {
            const clz = Java.use(clzN);
            let overloadsArr = clz[funN].overloads;
            for (const overloadsArrElement of overloadsArr) {
                overloadsArrElement.implementation = function () {
                    let ret = this[funN](...arguments) // apply 跟call 同理 不同的是apply接收数组类型参数
                    formatArguments(arguments, ret, clzN, funN, isShowStacks, null) // 打印参数/返回值
                    return ret
                }
            }
        });
    }
}

function uhook() {
    var base64 = Java.use("android.util.Base64")
    base64.encodeToString.overload('[B', 'int').implementation = function () {
        console.log("arg1: ", Java.use("com.android.okhttp.okio.ByteString").of(a).utf8());

        var result = this.encodeToString(...arguments);
        console.log("result: ", result)
        formatArguments(arguments, ret, clzN, funN, isShowStacks, null) // 打印参数/返回值
        return result;
    }
}

Java.perform(() => {
    jhook(`android.util.Base64`, [`encodeToString`], false /* 堆栈打印 */);
    jhook(`com.ishumei.dfp.SMSDK`, [`v1`], false /* 堆栈打印 */);

    // uhook();  // 自定义 hook
})

// adb shell pm clear cn.com.bailian.bailianmobile && frida --no-pause -Ul hook.js -f cn.com.bailian.bailianmobile