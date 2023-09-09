import {FSLog} from "../../FSLogger";


export namespace Bypass {

    export function hook_ptrace() {
        let tag = hook_ptrace.name
        let ptrace = Module.findExportByName(null, 'ptrace') || NULL
        Interceptor.replace(ptrace, new NativeCallback(() => {
            FSLog.w(tag, 'ptrace is call')
        }, 'void', ['int', 'int', 'int', 'int']))
    }
}