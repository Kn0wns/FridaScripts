// Time    : 2023-03-03 22:11
// Author  : KKings
// File    : Utils.js
// Software: WebStorm

import {FSLog as log} from "../../FSLogger";

export namespace Utils {
    /**
     * @description: sleep
     * @date: 2023-02-08 16:34
     * @param time
     */
    export const sleep = async (time: number) => {
        // const timeStamp = new Date().getTime();
        // const endTime = timeStamp + (time * 1000);
        // while (true) {
        //     if (new Date().getTime() > endTime) {
        //         return;
        //     }
        // }
        await new Promise(resolve => setTimeout(resolve, time * 1000));
    }

    export const j_hexdump = (byteArray: any, offset: number, length: number) => {
        const HexDump = Java.use("com.android.internal.util.HexDump")
        log.d(j_hexdump.name, HexDump.dumpHexString(byteArray, offset, length))
    }

    /**
     * map格式化到字符串
     * */
    export const mapToString = (map: { keySet: () => any; get: (arg0: any) => any; }) => {
        const keySet = map.keySet();
        const it = keySet.iterator();
        let str = "{";
        while (it.hasNext()) {
            const key = it.next().toString();
            const value = map.get(key);
            str += '"' + key + '":"' + value + '",';
        }
        return str.trim() + "}"
    }

    /**
     * 将字节数组转换为指定的格式 `hex` `base64` `utf8`
     *
     * ByteString(bytes).hex
     *
     * ByteString(bytes).base64
     *
     * ByteString(bytes).utf8
     */
    export const ByteString = (data: any) => {
        return Java.use("com.android.okhttp.okio.ByteString").of(data)
    }

    export const getApplicationContext = () => {
        // const ActivityThread = Java.use('android.app.ActivityThread');
        // const Context = Java.use('android.content.Context');
        // return Java.cast(ActivityThread.currentApplication().getApplicationContext(), Context);
        return Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
    }

    export function showStacks() {
        let stackTraceString = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());

        Java.perform(function () {
            log.d('showStacks', stackTraceString);  // 打印堆栈
        });
    }

    /**
     * 精确获取获取So层调用栈，可能会获取不到
     * @param {CpuContext} context
     */
    export const showStacksACCURATE = (context: CpuContext) => {
        log.d('showNativeStacks', '\tBacktrace:\n\t' + Thread.backtrace(context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n\t'));
    }

    /**
     * 模糊获取获取So层调用栈，存在误报
     * @param {CpuContext} context
     */
    export const showNativeStacksFUZZY = (context: CpuContext) => {
        log.d('showNativeStacks', '\tBacktrace:\n\t' + Thread.backtrace(context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join('\n\t'));
    }

    /**
     * 获取当前进程名称
     * @private
     */
    export const getSelfProcessName = () => {
        const openPtr = Module.getExportByName('libc.so', 'open');
        const open = new NativeFunction(openPtr, 'int', ['pointer', 'int']);

        const readPtr = Module.getExportByName("libc.so", "read");
        const read = new NativeFunction(readPtr, "int", ["int", "pointer", "int"]);

        const closePtr = Module.getExportByName('libc.so', 'close');
        const close = new NativeFunction(closePtr, 'int', ['int']);

        const path = Memory.allocUtf8String("/proc/self/cmdline");
        const fd = open(path, 0);
        if (fd != -1) {
            const buffer = Memory.alloc(0x1000);
            const result = ptr(read(fd, buffer, 0x1000)).readCString();
            close(fd);
            return result;
        }
        log.e('getSelfProcessName', "获取进程名失败！")
        return "";
    }

    /**
     * 获取当前进程包名
     */
    export const getPkgName = () => {
        let retStr = ""
        Java.perform(() => retStr = getApplicationContext().getPackageName())
        return retStr
    }

    export function getThreadName(tid: number = Process.id) {
        let threadName: string = "unknown"
        try {
            var file = new File("/proc/self/task/" + tid + "/comm", "r")
            threadName = file.readLine().toString().trimEnd()
            file.close()
        } catch (e) {
            throw e
        }

        // var threadNamePtr: NativePointer = Memory.alloc(0x40)
        // var tid_p: NativePointer = Memory.alloc(p_size).writePointer(ptr(tid))
        // var pthread_getname_np = new NativeFunction(Module.findExportByName("libc.so", 'pthread_getname_np')!, 'int', ['pointer', 'pointer', 'int'])
        // pthread_getname_np(ptr(tid), threadNamePtr, 0x40)
        // threadName = threadNamePtr.readCString()!

        return threadName
    }
}
