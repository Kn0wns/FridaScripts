import {banner_android, banner_ios} from "./banner";
import {FSTools} from "./FSTools";

export let FSLog = {
    bDebug: true,  // 管理输出信息
    threadName: '',
    dateFormat2(date) {
        return date.toLocaleString('zh-CN');
    },
    getThreadName() {
        if (!FSLog.threadName && Java.available) {
            Java.perform(() => {
                const Thread = Java.use('java.lang.Thread');
                FSLog.threadName = `[${Thread.currentThread().getName()}]`;
            });
        }
        return FSLog.threadName
    },
    dateFormat(date) {
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let mSecond = date.getMilliseconds();

        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        mSecond = mSecond < 10 ? "00" + mSecond : mSecond < 100 ? "0" + mSecond : mSecond;

        // return `${hour}:${minute}:${second}`;
        return `${date.toLocaleDateString()} ${hour}:${minute}:${second}`;
    },
    log(logFunc, level, tag, content) {
        // logFunc(`[${level}][${SSLog.dateFormat(new Date())}][PID:${Process.id}]${""}[${Process.getCurrentThreadId()}][${tag}]: ${content}`);
        let emoji = ``
        switch (level) {
            case 'INFO':
                emoji = `💧`
                break;
            case 'DEBUG':
                emoji = `💭`
                break;
            case 'WARN':
                emoji = `🔔`
                break;
            case 'ERROR':
                emoji = `❌`
                break;
            default:
                emoji = `❓`
                break;
        }
        // logFunc(`[${level}][${FSLog.dateFormat2(new Date())}][PID:${Process.id}]${FSLog.threadName}[${Process.getCurrentThreadId()}][${tag}] ${emoji} ${content}`);
        logFunc(`[${level}][${FSLog.dateFormat(new Date())}][PID:${Process.id}]${FSLog.threadName}[${Process.getCurrentThreadId()}][${tag ? tag : 'tag'}] ${emoji} ${content ? content : tag}`);
    },


    d(tag, content) {
        if (!FSLog.threadName) FSLog.getThreadName()

        if (FSLog.bDebug) {
            FSLog.log(console.log, 'DEBUG', tag, content);
        }
    },
    i: (tag, content) => FSLog.log(console.log, 'INFO', tag, content),
    w: (tag, content) => FSLog.log(console.warn, 'WARN', tag, content),
    e: (tag, content) => FSLog.log(console.error, 'ERROR', tag, content),

    send(tag, content) {
        let tid = Process.getCurrentThreadId();
        send(JSON.stringify({
            tid: tid,
            status: 'msg',
            tag: tag,
            content: content
        }));
    },

    /**
     * 格式化输出 java hook 的参数 or 返回值
     * @param args {Array|string} 参数数组
     * @param ret {*} 返回值
     * @param clzName {string} 类名
     * @param methodName {string} 方法名
     * @param isShowStacks {boolean} 是否显示调用栈
     * @param len {number} 长度
     */
    formatArguments(args, ret, clzName, methodName, isShowStacks, len) {
        isShowStacks && FSTools.showStacks();
        const LEN = len || 20;
        const Call = `${clzName}.${methodName}`.padEnd(LEN, " ");
        console.log(`[>>>] ${Call}`);
        for (const key in args) {
            let _arg = typeof args[key] === "string" ? args[key] : JSON.stringify(args[key])
            let argStr = `${methodName}_arg[${key}]`.padEnd(LEN, " ");
            console.log(`[ + ] ${argStr} :=>  ${_arg}`)
        }
        const result = `${methodName}_result`.padEnd(LEN, " ");
        console.log(`[<<<] ${result} :=>  ${ret}`);
        console.log(`-`.padEnd(LEN * 2, `-`));
    },

    android: () => FSLog.w("MAIN", banner_android),
    ios: () => FSLog.w("MAIN", banner_ios),
}
