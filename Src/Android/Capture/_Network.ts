import {FSLog as log} from "../../FSLogger";
import {Utils} from "../Utils/Utils";

export namespace Network {
    export function hook_send_recv() {
        // lets search for common shared lib
        let myModule = Process.getModuleByName('libc.so');
        let myFuncs = ['recv', 'send'];
        // let myFuncs = ['send'];

        // attach only to functions that have recv or send in name (includes recv, recvmsg, recvfrom, send ,sendmsg, sendto)
        myModule.enumerateExports().filter(module_export => module_export.type === 'function' &&
            myFuncs.some(fName => module_export.name.includes(fName)))
            .forEach(module_export => {
                Interceptor.attach(module_export.address, {
                    onEnter: function (args) { // every time we enter one of the functions, we will log this
                        const tag = module_export.name + "_onEnter";
                        //get function args
                        let fd = args[0].toInt32(); // every function has first argument an FD, so it is safe to do this

                        // error mitigation checks
                        // from frida.Socket (check if socket is TCP and if it has an external IP address)
                        let socktype = Socket.type(fd);
                        let sockaddr = Socket.peerAddress(fd);
                        if ((socktype !== 'tcp' && socktype !== 'tcp6') || sockaddr === null)
                            return;

                        try {
                            let len = args[2].toInt32();
                            this.buf = new NativePointer(args[1]);
                            let data = {
                                'event': module_export.name,
                                'fd': fd,
                                'sockaddr': sockaddr,
                                'socktype': socktype
                                // 'buffer': printByte2(buf2hex(buf))
                            }

                            log.d(tag, '\n');
                            log.d(tag, JSON.stringify(data));
                            Utils.showStacksACCURATE(this.context);
                        } catch (err: any) {
                            log.e(tag, err);
                        }
                    },
                    onLeave: function (retval) {
                        if (undefined != this.buf) {
                            const retlen = retval.toInt32();
                            log.d(module_export.name + '_onLeave', "size:" + retval);
                            if (-1 != retlen) {
                                log.d(module_export.name + '_onLeave', "\n" + hexdump(this.buf, {
                                    offset: 0,
                                    length: retlen,
                                    header: true,
                                    ansi: false
                                }));
                            }
                        }
                    }
                })
            });
    }
}