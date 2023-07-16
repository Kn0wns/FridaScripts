import {FSLog} from "../../FSLogger";

export namespace Jailbreak {
    export function try_bypass() {
        let tag = try_bypass.name
        let resolver = new ApiResolver('objc');
        ['jailbreak', 'jailB', 'Jailb', 'JailB'].forEach(v => {
            for (const enumerateMatch of resolver.enumerateMatches(`*[* *${v}*]`)) {
                let funcName = enumerateMatch.name;
                let funcAddr = enumerateMatch.address;
                Interceptor.attach(funcAddr || NULL, {
                    onLeave: function (retval) {
                        if (retval.toInt32() === 1) {
                            retval.replace(ptr(0));  // 如果结果为1，则返回0
                            FSLog.d(tag, 'jailbreak: ' + funcName + ' retval=' + retval);
                        }
                    }
                })
            }
        });
    }
}