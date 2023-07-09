import {banner_android, banner_ios} from "./banner";
import {FSTools} from "./FSTools";

export class FSLog {
    static bDebug = true;  // 管理输出信息
    static threadName = '';

    private static dateFormat2(date: Date) {
        return date.toLocaleString('zh-CN');
    }

    private static getThreadName() {
        if (!this.threadName && Java.available) {
            Java.perform(() => {
                const Thread = Java.use('java.lang.Thread');
                this.threadName = `[${Thread.currentThread().getName()}]`;
            });
        }
        return this.threadName
    }

    private static dateFormat(date: Date): string {
        let hour: string | number = date.getHours();
        let minute: string | number = date.getMinutes();
        let second: string | number = date.getSeconds();
        let mSecond: string | number = date.getMilliseconds();

        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        mSecond = mSecond < 10 ? "00" + mSecond : mSecond < 100 ? "0" + mSecond : mSecond;

        return `${hour}:${minute}:${second}`;
    }

    private static log(logFunc: (message?: any, ...optionalParams: any[]) => void, level: string, tag: string, content: any) {
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
        logFunc(`[${level}][${this.dateFormat2(new Date())}][PID:${Process.id}]${this.threadName}[${Process.getCurrentThreadId()}][${tag}] ${emoji} ${content}`);
    }


    static d(tag: string, content: any) {
        if (!this.threadName) this.getThreadName()

        if (this.bDebug) {
            this.log(console.log, 'DEBUG', tag, content);
        }
    }

    static i(tag: string, content: any) {
        this.log(console.log, 'INFO', tag, content);
    }

    static w(tag: string, content: any) {
        this.log(console.warn, 'WARN', tag, content);
    }

    static e(tag: string, content: any) {
        this.log(console.error, 'ERROR', tag, content);
    }

    static send(tag: string, content: any) {
        let tid = Process.getCurrentThreadId();
        send(JSON.stringify({
            tid: tid,
            status: 'msg',
            tag: tag,
            content: content
        }));
    }

    /**
     * 格式化输出 java hook 的参数 or 返回值
     * @param args {Array|string} 参数数组
     * @param ret {*} 返回值
     * @param clzName {string} 类名
     * @param methodName {string} 方法名
     * @param isShowStacks {boolean} 是否显示调用栈
     * @param len {number} 长度
     */
    static formatArguments(args: IArguments, ret: any, clzName: string, methodName: string, isShowStacks: boolean | null, len: number | null) {
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
    }

    static android(){
        this.w("MAIN", banner_android);
    }

    static ios() {
        this.w("MAIN", banner_ios)
    }
}