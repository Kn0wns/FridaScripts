import {FSLog as log} from "./FSLogger";


export namespace FSCommon {
    /**
     * @description: So hook 模板 FIXME
     * @date: 2022-05-17 23:42
     * @param baseAddress {int} hook 地址
     * @param count {int} 参数数量
     * @param soName {string} So名字
     */
    export function hook(baseAddress: any, count: any, soName: any) {
        // Interceptor.attach(baseAddress, {
        //     onEnter: function (args) {
        //         console.log(`\r\n==================== ↓ 方法进入 ${soName} ↓ ====================`)
        //         this.params = [];
        //         for (let i = 0; i < count; i++)
        //             this.params.push(args[i])
        //         for (let i = 0; i < this.params.length; i++)
        //             console.log(`[ * ] ${soName}.args[${i}] onEnter :=> ${utils.pprint(this.params[i])}`)
        //         console.log(`------------------------------ - !${soName}! - ------------------------------`)
        //     },
        //     onLeave: function (retval) {
        //         for (let i = 0; i < this.params.length; i++)
        //             console.log(`[ * ] ${soName}.args[${i}] onLeave :=> ${utils.pprint(this.params[i])}`)
        //         console.log(`[*]\t ${soName}.retval onLeave :=> ${utils.retval}`)
        //         console.log(`==================== ↑ 方法退出 ${soName} ↑ ====================`)
        //     }
        // })
    }

    // FIXME
    export const call = (baseAddress: any, count: any, soName: any) => {
        // const funcAddr = Module.findExportByName("lib.so", "nice_sign_v3")
        // const func = new NativeFunction(funcAddr, "pointer", ['pointer', 'pointer', 'pointer']);
        // const a = Memory.allocUtf8String('xxx');
        // const ret = func(a); // 调用方法
        // console.log(ptr(String(ret)).readCString());
    }

    /**
     * 打印指定层数的 sp，并输出 module 信息 (如果有）
     * @param {CpuContext} context
     * @param {number} number
     */
    export function showStacksModInfo(context: CpuContext, number: number) {
        const sp: NativePointer = context.sp;

        for (let i = 0; i < number; i++) {
            const curSp = sp.add(Process.pointerSize * i);
            log.d('showStacksModInfo', 'curSp: ' + curSp + ', val: ' + curSp.readPointer() + ', module: ' + FSCommon.getModuleByAddr(curSp.readPointer()));
        }
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

    /**
     * 按地址查找内存范围，判断地址是否有效，多用于参数打印
     * @param address 目标地址
     */
    export const findRangeByAddress = (address: any) => {
        const isNull = Process.findRangeByAddress(address);
        if (isNull) return "\n" + hexdump(address, {ansi: true, header: false});
        return ptr(address).toInt32()
    }

    /**
     * dump 指定模块并存储到指定目录
     * @param {string} moduleName
     * @param {string} saveDir      如果 Android 环境下应该保存在 /data/data/com.package.name/ 目录下，
     *                              否则可能会遇到权限问题，导致保存失败。
     *
     * if (Java.available) {
     *     Java.perform(() => {
     *         dump_module('libmtguard.so');
     *     });
     * }
     *
     * if (ObjC.available) {
     *     dump_module('Hopper Disassembler v4');
     * }
     */
    export function dump_module(moduleName: string) {
        const tag = 'dump_module';
        const module = Process.getModuleByName(moduleName);
        log.d(tag, `[name]: ${module.name}`);
        log.d(tag, `[base]: ${module.base}`);
        log.d(tag, `[size]: ${ptr(module.size)}`);
        log.d(tag, `[path]: ${module.path}`);
        const file_path = "/sdcard/dump/" + module.name + "_" + module.base + "_" + ptr(module.size) + ".so";
        const file_handle = new File(file_path, "wb");
        if (file_handle) {
            Memory.protect(module.base, module.size, 'rwx');  // 更改内存页权限
            const libso_buffer = module.base.readByteArray(module.size);
            if (libso_buffer) {
                file_handle.write(libso_buffer);
                file_handle.flush();
                file_handle.close();
                log.d(tag, `[dump]: ${file_path}`);
            }
        }
    }

    export function dump2file(addr: NativePointer, size: number, savePath: string) {
        log.d('dump2file', `addr: ${addr.toString(16)}, size: ${size}`);
        let file = new File(savePath, "w+");
        let byteArr = addr.readByteArray(size);
        if (null != byteArr) {
            file.write(byteArr);
        }
        file.close();
    }

    export function printModules() {
        Process.enumerateModules().forEach(function (module) {
            log.d('enumerateModules', JSON.stringify(module));
        });
    }

    export function str2hexstr(str: string) {
        return str.split("").map(x => x.charCodeAt(0).toString(16).padStart(2, "0")).join("");
    }

    export function str2hexArray(str: string) {
        return str.split("").map(x => x.charCodeAt(0));
    }

    export function arrayBuffer2Hex(buf: any) {
        return [...new Uint8Array(buf)]
            .map(x => x.toString(16).padStart(2, '0'))
            .join(' ');
    }

    /**
     * stalker trace 功能
     * 由于函数内使用 Stalker.exclude 每次使用建议重启进程，否则可能会有莫名其妙的段、访问错误
     * @param moduleName 模块(so) 名称
     * @param address 要监控的函数地址
     *
     * 用例 FCCommon.stalkerTrace("libxxx.so", addr_2333F);
     */
    export function stalkerTrace(moduleName: string, address: NativePointer) {
        const tag = 'stalkerTrace';
        let module_object = Process.findModuleByName(moduleName);
        if (null == module_object) {
            log.e(tag, "module is null");
            return;
        }
        const module_start = module_object.base;
        const module_end = module_object.base.add(module_object.size);
        // 开始 trace
        let pre_regs = {};
        // let address = module_object.base.add(offset_address);
        // 排除不需要trace 的模块
        Process.enumerateModules().forEach(function (md) {
            if (md.name != moduleName) {
                let memoryRange = {base: md.base, size: md.size};
                Stalker.exclude(memoryRange);
            }
        });
        let threadId = Process.getCurrentThreadId();
        Interceptor.attach(address, {
            onEnter: function (args) {
                this.tid = threadId;
                if (threadId == this.threadId) {
                    this.startFollow = true;
                    Stalker.follow(this.tid, {
                        events: {
                            call: true,
                            ret: false,
                            exec: true,
                            block: false,
                            compile: false
                        },
                        transform(iterator: any) {
                            let instruction = iterator.next();
                            do {
                                const startAddress = instruction.address;
                                const isModuleCode = startAddress.compare(module_start) >= 0 && startAddress.compare(module_end) === -1;
                                if (isModuleCode) {
                                    iterator.putCallout(function (context: any) {
                                        let pc = context.pc;
                                        let module = Process.findModuleByAddress(pc);
                                        if (module) {
                                            try {
                                                let diff_regs = get_diff_regs(context, pre_regs);
                                                if (module.name == module_object?.name) {
                                                    log.d(tag, `${module.name} ! ${pc.sub(module.base)} ${Instruction.parse(pc)} ${JSON.stringify(diff_regs)}`);
                                                    // console.log(module.name + " ! " + pc.sub(module.base), Instruction.parse(ptr(pc)), JSON.stringify(diff_regs));
                                                }
                                            } catch (e: any) {
                                                log.e(tag, e.toString());
                                            }
                                        }
                                    })
                                }
                                iterator.keep();
                            } while ((instruction = iterator.next()) != null);
                        }
                    });
                }
            },
            onLeave: function (retval) {
                if (this.startFollow != undefined && this.startFollow == true) {
                    Stalker.unfollow(this.tid);
                    this.startFollow = false;
                }
            }
        });
    }

    export function get_diff_regs(context: any, pre_regs: any) {
        let diff_regs = {};
        for (const [reg_name, reg_value] of
            Object.entries(JSON.parse(JSON.stringify(context)))) {
            if (reg_name != "pc" && pre_regs[reg_name] !== reg_value) {
                pre_regs[reg_name] = reg_value;
                // @ts-ignore
                diff_regs[reg_name] = reg_value;
            }
        }
        return diff_regs;
    }
}

