import {FSLog} from "../../FSLogger";


export namespace IOS {
    export let nil = ObjC.available ? new ObjC.Object(ptr("0x0")) : null;

    // generic getFuncAddr
    export function getFuncAddr(pattern: string): NativePointer {
        const tag = 'getFuncAddr';
        let targets = IOS.findAllByPattern(pattern);
        let targetAddr = NULL;
        targets.forEach(function (target: any) {
            FSLog.d(tag, 'target.name: ' + target.name + ', target.address: ' + target.address);
            targetAddr = target.address;
            // end forEach
            return false;
        });

        return targetAddr;
    }

    /**
     * 模糊查找所有符合规则的函数
     * 示例参考: examples/ios_hook_all_base64.ts
     * @param pattern
     */
    export function findAllByPattern(pattern: string) {
        const tag = 'findAllByPattern';
        const type: ApiResolverType = (pattern.indexOf(" ") === -1) ? "module" : "objc";
        FSLog.d(tag, 'getFuncAddr type: ' + type);
        const res: ApiResolver = new ApiResolver(type);
        FSLog.d(tag, 'getFuncAddr ApiResolver: ' + JSON.stringify(res));
        const matches = res.enumerateMatches(pattern);
        FSLog.d(tag, 'getFuncAddr matches: ' + JSON.stringify(matches));
        return uniqBy(matches, JSON.stringify);
    }

    // remove duplicates from array
    export function uniqBy(array: any, key: any) {
        const seen: any = {};
        return array.filter(function (item: any) {
            const k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
    }

    export function showStacks(thiz: any) {
        FSLog.d('showStacks', '\tBacktrace:\n\t' + Thread.backtrace(thiz.context,
            Backtracer.ACCURATE).map(DebugSymbol.fromAddress)
            .join('\n\t'));
    }

    export function dump_ui() {
        try {
            let current_window = ObjC.classes.UIWindow.keyWindow();
            return current_window.recursiveDescription().toString();
        } catch (e) {
            return e;
        }
    }

    /**
     * trace openURL
     */
    export function trace_url() {
        //Twitter: https://twitter.com/xploresec
        //GitHub: https://github.com/interference-security
        // Get a reference to the openURL selector
        const openURL = ObjC.classes.UIApplication["- openURL:"];

        // Intercept the method
        Interceptor.attach(openURL.implementation, {
            onEnter: function (args) {
                // As this is an ObjectiveC method, the arguments are as follows:
                // 0. 'self'
                // 1. The selector (openURL:)
                // 2. The first argument to the openURL selector
                const myNSURL = new ObjC.Object(args[2]);
                // Convert it to a JS string
                const myJSURL = myNSURL.absoluteString().toString();
                // Log it
                FSLog.d('openURL', "Launching URL: " + myJSURL);
                //send(myJSURL);
            }
        });

    }

    export function trace_NSLog() {
        const NSLog_ptr = Module.findExportByName("Foundation", "NSLog");
        FSLog.d('NSLog_ptr', 'addr: ' + NSLog_ptr);
        if (NSLog_ptr) {
            Interceptor.attach(NSLog_ptr, {
                onEnter: function (args) {
                    FSLog.d('NSLog', new ObjC.Object(args[0]).toString());
                }
            });
        }

        const NSLogv_ptr = Module.findExportByName("Foundation", "NSLogv");
        FSLog.d('NSLogv_ptr', 'addr: ' + NSLogv_ptr);
        if (NSLogv_ptr) {
            Interceptor.attach(NSLogv_ptr, {
                onEnter: function (args) {
                    FSLog.d('NSLogv', new ObjC.Object(args[0]).toString());
                }
            });
        }
    }

    /**
     * let NSString = ObjC.use("NSString");
     let str = ObjC.cast(ptr("0x1234"), NSString);
     * -- or --
     * let str = ObjC.Object(ptr("0x1234"));
     * @param val
     */
    export function newString(val: any) {
        try {
            return ObjC.classes.NSString.stringWithString_(val);
        } catch (e) {
            return val;
        }
    }

    export function nsdataToString(nsdata: any) {
        return ObjC.classes.NSString.alloc().initWithData_encoding_(nsdata, 4);
    }

    export function getClassName(id: any) {
        return new ObjC.Object(id).$className;
    }

    export function printNSDictionary(id: any) {
        const dict = new ObjC.Object(id);
        const enumerator = dict.keyEnumerator();
        let key;
        while ((key = enumerator.nextObject()) !== null) {
            let value = dict.objectForKey_(key);
            FSLog.d('printNSDictionary', "key: " + key + ", val: " + value);
        }
    }

    export function justTouch(pattern: string) {
        let tgtarr = IOS.findAllByPattern(pattern);
        tgtarr.forEach(function (target: any) {
            FSLog.d('justTouch', `${target.name} attach ed`);
            Interceptor.attach(target.address, {
                onEnter: function (args) {
                    FSLog.d('justTouch', `==== name: ${target.name} onEnter ====`);
                }
            });
        });
    }
}
