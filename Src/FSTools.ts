// 存放双端通用的工具函数
import {FSLog} from "./FSLogger";

export namespace FSTools {
    export const showStacks = () => {
        FSLog.d("showStacks", Java.use("android.util.Log")
            .getStackTraceString(Java.use("java.lang.Exception").$new()));
    }

    /**
     * 精确获取获取So层调用栈，可能会获取不到
     * @param {CpuContext} context
     */
    export const showStacksACCURATE = (context: CpuContext) => {
        FSLog.d('showNativeStacks', '\tBacktrace:\n\t' +
            Thread.backtrace(context, Backtracer.ACCURATE)
                .map(DebugSymbol.fromAddress).join('\n\t'));
    }

    /**
     * 模糊获取获取So层调用栈，存在误报
     * @param {CpuContext} context
     */
    export const showStacksFUZZY = (context: CpuContext) => {
        FSLog.d('showNativeStacks', '\tBacktrace:\n\t' +
            Thread.backtrace(context, Backtracer.FUZZY)
                .map(DebugSymbol.fromAddress).join('\n\t'));
    }

    /**
     * 获取 LR 寄存器值
     * @param {CpuContext} context
     * @returns {NativePointer}
     */
    export function getLR(context: CpuContext) {
        if (Process.arch == 'arm') {
            return (context as ArmCpuContext).lr;
        } else if (Process.arch == 'arm64') {
            return (context as Arm64CpuContext).lr;
        } else {
            FSLog.e('getLR', 'not support current arch: ' + Process.arch);
        }
        return ptr(0);
    }

    /**
     * 根据地址获取模块信息
     * @param {NativePointer} adder
     * @returns {string}
     */
    export function getModuleByAddr(adder: NativePointer): Module | null {
        let result = null;
        Process.enumerateModules().forEach(function (module: Module) {
            if (module.base <= adder && adder <= (module.base.add(module.size))) {
                result = JSON.stringify(module);
                return false; // 跳出循环
            }
        });
        return result;
    }
}