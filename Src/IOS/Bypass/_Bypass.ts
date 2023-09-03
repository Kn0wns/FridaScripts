import {FSLog} from "../../FSLogger";


export namespace Anti {
    export function anti_ptrace() {
        let ptrace = Module.findExportByName(null, "ptrace");
        if (null != ptrace) {
            FSLog.d('anti_ptrace', "ptrace addr: " + ptrace);
            Interceptor.replace(ptrace, new NativeCallback(function (p1: any, p2: any, p3: any, p4: any) {
                FSLog.d('anti_ptrace', 'entry');
                return 1;
            }, 'long', ['int', "int", 'pointer', 'pointer']));
        }
    }
}