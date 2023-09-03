// Time    : 2023-03-03 23:15
// Author  : KKings
// File    : bypass_debug_fgets.js
// Software: WebStorm

import {FSLog as log} from "../../FSLogger";
import {FSCommon} from "../../FSCommon";
import {Utils} from "../Utils/Utils";


/**
 * @state_name: cat /proc/xxx/stat ==> ...(<state_name>) S...
 *
 * anti fgets function include :
 * status->TracerPid, SigBlk, S (sleeping)
 * State->(package) S
 * wchan->SyS_epoll_wait
 *
 * C 库函数 char *fgets(char *str, int n, FILE *stream) 从指定的流 stream 读取一行，并把它存储在 str 所指向的字符串内。当读取 (n-1) 个字符时，或者读取到换行符时，或者到达文件末尾时，它会停止，具体视情况而定。
 */
export function bypass_debug_fgets() {
    const tag = bypass_debug_fgets.name
    const fgetsPtr = Module.findExportByName(`libc.so`, 'fgets');
    log.d(tag, 'fgets addr: ' + fgetsPtr);
    if (null == fgetsPtr) return;
    const fgets = new NativeFunction(fgetsPtr, 'pointer', ['pointer', 'int', 'pointer']);
    Interceptor.replace(fgetsPtr, new NativeCallback(function (buffer, size, fp) {
        if (null == this) return 0;
        let logTag = null;
        // 进入时先记录现场
        const lr = FSCommon.getLR(this.context);
        // 读取原 buffer
        const retval = fgets(buffer, size, fp);
        const bufstr = buffer.readCString();

        if (null != bufstr) {
            if (bufstr.indexOf("TracerPid:") > -1) {
                buffer.writeUtf8String("TracerPid:\t0");
                logTag = 'TracerPid';
            }
            //State:	S (sleeping)
            else if (bufstr.indexOf("State:\tt (tracing stop)") > -1) {
                buffer.writeUtf8String("State:\tS (sleeping)");
                logTag = 'State';
            }
            // ptrace_stop
            else if (bufstr.indexOf("ptrace_stop") > -1) {
                buffer.writeUtf8String("sys_epoll_wait");
                logTag = 'ptrace_stop';
            }

            //(sankuai.meituan) t
            else if (bufstr.indexOf(") t") > -1) {
                buffer.writeUtf8String(bufstr.replace(") t", ") S"));
                logTag = 'stat_t';
            }

            // SigBlk
            else if (bufstr.indexOf('SigBlk:') > -1) {
                buffer.writeUtf8String('SigBlk:\t0000000000001204');
                logTag = 'SigBlk';
            }

            // frida
            else if (bufstr.indexOf('frida') > -1) {
                buffer.writeUtf8String("");
                logTag = 'frida';
            }

            if (logTag) {
                log.d(tag + " " + logTag, bufstr + " -> " + buffer.readCString() + ' lr: ' + lr + "(" + FSCommon.getModuleByAddr(lr) + ")");
                Utils.showStacksACCURATE(this?.context);
            }
        }
        return retval;
    }, 'pointer', ['pointer', 'int', 'pointer']));
}