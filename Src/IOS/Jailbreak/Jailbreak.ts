export namespace Jailbreak {
    export function try_bypass() {
//         var resolver = new ApiResolver('objc');
//
// // 匹配多个大小写特征的符号
//         ['jailbreak', 'jailB', 'Jailb', 'JailB'].forEach(v => {
//
//             resolver.enumerateMatches(`*[* *${v}*]`, {
//                 onMatch: function (match) {
//                     let funcName = match.name;
//                     let funcAddr = match.address;
//                     Interceptor.attach(ptr(funcAddr), {
//                         onEnter: function (args) {
//                             console.log("jailbreak: " + funcName);
//                         },
//                         onLeave: function (retval) {
//                             if (retval.toInt32() === 1) {
//                                 retval.replace(0);  // 如果结果为1，则返回0
//                                 console.log('jailbreak: ' + funcName + ' retval=' + retval);
//                             }
//
//                         }
//                     });
//                 }, onComplete: function () {
//                 }
//             });
//         });
    }
}