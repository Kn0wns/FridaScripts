import {FSLog} from "../FSLogger";
import {Utils} from "./Utils/Utils";

export namespace Android {
    /**
     * 批量 hook java 方法并输出对应信息
     * @param clzName {string}类名
     * @param methodNames {any}方法名,可以是单个也可以是数组
     * @param isShowStacks {boolean}
     */
    export const jhook = (clzName: string, methodNames: any, isShowStacks: boolean) => {
        if (!(methodNames instanceof Array))
            methodNames = [methodNames]
        for (const fn of methodNames) {
            fn && Java.perform(() => {
                Java.use(clzName)[fn].implementation = function () {
                    const ret = this[fn](...arguments);
                    FSLog.formatArguments(arguments, ret, clzName, fn, isShowStacks, null) // 打印参数/返回值
                    return ret
                }
            });
        }
    }

    /**
     * @description: 主动调用 Java
     * @date: 2023-02-08 16:37
     * @param className {String} 类名
     * @param methodName {String} 方法名
     * @param params {string} 参数
     */
    export const callMethod = (className: string, methodName: string, params: string) => {
        let instance = Java.use(className)
        // 找不到类则进行内存搜索
        !instance && Java.choose(className, {
            onMatch(ins) {
                instance = ins  // 查找实例
            },
            onComplete() {
            }
        })

        const ret = instance[methodName](...params);
        FSLog.d(callMethod.name, `[>>>] call.${methodName}: ${ret}`)
    }

    /**
     * 内存查找指定类名实例
     * @param className {hook_string}
     */
    export const findInstance = (className: string) => {
        let ret: Java.Wrapper<{}>;
        Java.choose(className, { // 获取类字节码
            onMatch(obj) {
                FSLog.d(findInstance.name, `查找实例:${obj}`)
                ret = obj
            },
            onComplete() {
                if (!ret) FSLog.w(findInstance.name, `内存中所有对象搜索完毕`)
            }
        });
        // @ts-ignore
        return ret;
    }

    /**
     * hook string 相关方法
     */
    export const hook_string = () => {
        const str = Java.use("java.lang.String");
        str.getBytes.overload().implementation = function () {
            Utils.showStacks()
            const result = this.getBytes();
            const newStr = str.$new(result);
            FSLog.d(hook_string.name, `str.getBytes result => ${newStr}`)
            return result;
        }
        str.getBytes.overload('java.lang.String').implementation = function (a: any) {
            Utils.showStacks()
            const result = this.getBytes(a);
            const newStr = str.$new(result, a);
            FSLog.d(hook_string.name, `str.getBytes result => ${newStr}`)
            return result;
        }

        const artSyms = Process.getModuleByName('libart.so').enumerateSymbols();
        let NewStringUTFAddr = null
        for (const artSym of artSyms) {
            if (artSym.name.indexOf("CheckJNI") === -1 && artSym.name.indexOf("NewStringUTF") !== -1) {
                NewStringUTFAddr = artSym.address;
            }
        }

        NewStringUTFAddr && Interceptor.attach(NewStringUTFAddr, {
            onEnter: function (args) {
                FSLog.d("NewStringUTF", `NewStringUTF: ${args[1].readCString()}`)
                Utils.showStacksACCURATE(this.context);
            }
        });
    }

    /**
     * hook 目标 jni 方法
     * @param jniFuncName {hook_string} JNI 方法名
     */
    export const ART = (jniFuncName: string) => {
        const artSyms = Process.getModuleByName('libart.so').enumerateSymbols();
        let jniFuncAddress = null
        for (const artSym of artSyms) {
            if (artSym.name.indexOf("CheckJNI") === -1 && artSym.name.indexOf(jniFuncName) !== -1) {
                jniFuncAddress = artSym.address;
            }
        }

        jniFuncAddress && Interceptor.attach(jniFuncAddress, {
            onEnter: function (args) {
                FSLog.d(ART.name, `hookART: ${args[1].readCString()}`)
                Utils.showStacksACCURATE(this.context);
            }
        });
        return jniFuncAddress
    }

    /**
     * @description: Hook 目标函数所有重载
     * @date: 2022-05-18 20:29
     * @param className {hook_string} 类名
     * @param methodName {hook_string} 方法名
     * @return null
     */
    export const hook_All_overloads = (className: string, methodName: string) => {
        let tag = hook_All_overloads.name
        let clz = Java.use(className);
        let overloadsArr = clz[methodName].overloads;
        for (const overloadsArrElement of overloadsArr) {
            overloadsArrElement.implementation = function () {          // hook 方法
                let ret = this[methodName](...arguments) // apply 跟call 同理 不同的是apply接收数组类型参数
                FSLog.formatArguments(arguments, ret, className, methodName, null, null) // 打印参数/返回值
                return ret
            }
        }
    }

    /**
     * @description: Hook 类下所有方法
     * @date: 2023-02-08 16:30
     * @return
     * @param className {*} 类名
     */
    export const classMethods = (className: string) => {
        let clz = Java.use(className);
        let constructors = clz.class.getDeclaredConstructors(); // 获取类构造方法
        let methods = clz.class.getDeclaredMethods();// 获取类方法
        for (const method of methods) {
            Android.hook_All_overloads(className, method.getName())
        }
    }


    /**
     * 当指定 So 加载时，执行回调方法
     * @param soName {hook_string} 目标So名
     * @param callback {Object}回调方法
     */
    export const hook_dlopen = (soName: string, callback: any) => {
        const VERSION = Java.use('android.os.Build$VERSION');
        let dlopenFuncName = "android_dlopen_ext";
        if (VERSION.SDK_INT.value <= 23) { // 6.0 以上版本
            dlopenFuncName = "dlopen";
        }

        const dlopenAddress: any = Module.findExportByName(null, "dlopenFuncName");
        Interceptor.attach(dlopenAddress, {
            onEnter: function (args) {
                const name = args[0].readCString();  // 输出so路径
                this.hook = name?.includes(soName)
            }, onLeave: function (retval) {
                this.hook && callback();
            }
        })
    }

    export function hook_uri(bShowStacks: boolean) {
        // android.net.Uri
        const Uri = Java.use('android.net.Uri');
        Uri.parse.implementation = function (str: string) {
            FSLog.d('hook_uri', 'str: ' + str);
            bShowStacks && Utils.showStacks();
            return this.parse(str);
        }
    }

    export function hook_url(bShowStacks: boolean) {
        // java.net.URL;
        const URL = Java.use('java.net.URL');
        URL.$init.overload('java.lang.String').implementation = function (url: string) {
            FSLog.d('hook_url', 'url: ' + url);
            bShowStacks && Utils.showStacks();
            return this.$init(url);
        }
    }

    export function hook_JSONObject_getString(pKey: string) {
        const JSONObject = Java.use('org.json.JSONObject');
        JSONObject.getString.implementation = function (key: string) {
            if (key == pKey) {
                Utils.showStacks();
                FSLog.d('hook_JSONObject_getString', 'found key: ' + key);
            }
            return this.getString(key);
        }
    }

    export function hook_fastJson(pKey: string) {
        // coord: (106734,0,22) | addr: Lcom/alibaba/fastjson/JSONObject; | loc: ?
        const fastJson = Java.use('com/alibaba/fastjson/JSONObject');
        fastJson.getString.implementation = function (key: string) {
            if (key == pKey) {
                Utils.showStacks();
                FSLog.d('hook_fastJson getString', 'found key: ' + key);
            }
            return this.getString(key);
        };
        fastJson.getJSONArray.implementation = function (key: string) {
            if (key == pKey) {
                Utils.showStacks();
                FSLog.d('hook_fastJson getJSONArray', 'found key: ' + key);
            }
            return this.getString(key);
        };
        fastJson.getJSONObject.implementation = function (key: string) {
            if (key == pKey) {
                Utils.showStacks();
                FSLog.d('hook_fastJson getJSONObject', 'found key: ' + key);
            }
            return this.getString(key);
        };
        fastJson.getInteger.implementation = function (key: string) {
            if (key == pKey) {
                Utils.showStacks();
                FSLog.d('hook_fastJson getJSONObject', 'found key: ' + key);
            }
            return this.getString(key);
        };
    }

    export function hook_Map(pKey: string, accurately: boolean) {
        const Map = Java.use('java.util.Map');
        Map.put.implementation = function (key: string, val: string) {
            let bRes;
            if (accurately) {
                bRes = (key + "") == (pKey);
            } else {
                bRes = (key + "").indexOf(pKey) > -1;
            }
            if (bRes) {
                Utils.showStacks()
                FSLog.d('map', 'key: ' + key);
                FSLog.d('map', 'val: ' + val);
            }
            this.put(key, val);
        };

        const LinkedHashMap = Java.use('java.util.LinkedHashMap');
        LinkedHashMap.put.implementation = function (key1: any, val: any) {
            let bRes;
            if (accurately) {
                bRes = (key1 + "") == (pKey);
            } else {
                bRes = (key1 + "").indexOf(pKey) > -1;
            }
            if (null != key1 && bRes) {
                Utils.showStacks()
                FSLog.d('LinkedHashMap', 'key: ' + key1);
                FSLog.d('LinkedHashMap', 'val: ' + val);
            }
            return this.put(key1, val);
        };
    }

    export function hook_log() {
        const Log = Java.use('android.util.Log');
        Log.d.overload('java.lang.String', 'java.lang.String').implementation = function (tag: string, content: string) {
            FSLog.d('Log d', 'tag: ' + tag + ', content: ' + content);
            return 0;
        };
        Log.v.overload('java.lang.String', 'java.lang.String').implementation = function (tag: string, content: string) {
            FSLog.d('Log v', 'tag: ' + tag + ', content: ' + content);
            return 0;
        };
        Log.i.overload('java.lang.String', 'java.lang.String').implementation = function (tag: string, content: string) {
            FSLog.d('Log i', 'tag: ' + tag + ', content: ' + content);
            return 0;
        };
        Log.w.overload('java.lang.String', 'java.lang.String').implementation = function (tag: string, content: string) {
            FSLog.d('Log w', 'tag: ' + tag + ', content: ' + content);
            return 0;
        };
        Log.e.overload('java.lang.String', 'java.lang.String').implementation = function (tag: string, content: string) {
            FSLog.d('Log e', 'tag: ' + tag + ', content: ' + content);
            return 0;
        };
        Log.wtf.overload('java.lang.String', 'java.lang.String').implementation = function (tag: string, content: string) {
            FSLog.d('Log wtf', 'tag: ' + tag + ', content: ' + content);
            return 0;
        };
    }

    /**
     * 枚举 ClassLoader 找到相应的类，执行 callback
     * @param clsname {string}
     * @param callback {any} 回调方法
     */
    export function enumerateClassLoadersAndUse(clsname: string, callback: any) {
        const tag = enumerateClassLoadersAndUse.name
        Java.enumerateClassLoaders({
            onMatch(loader) {
                try {
                    let cls = loader.loadClass(clsname);
                    if (null != cls) {
                        FSLog.d(tag, "found cls: " + cls);

                        let cf = Java.ClassFactory.get(loader);

                        let cls1 = cf.use(clsname);
                        callback(cls1);
                    }

                } catch (e: any) {
                    FSLog.e(tag, e.toString());
                }
            },
            onComplete() {
                FSLog.d(tag, 'completed .');
            }
        });
    }

    /**
     * hook获取时间的函数。并且替换函数内容
     *
     * [算法还原的助手(一) 先让时间停下来 - 固定 So 层时间戳：lrand48 与 gettimeofday](https://zhuanlan.zhihu.com/p/322153629)
     */
    export function hook_gettimeofday() {
        let tag = hook_gettimeofday.name
        let addr_gettimeofday: any = Module.findExportByName(null, "gettimeofday");
        let gettimeofday = new NativeFunction(addr_gettimeofday, "int", ["pointer", "pointer"]);

        let source = [
            'struct timeval {',
            '    int tv_sec;',
            '    int tv_usec;',
            '};',
            'void modify_time(struct timeval* tv, int tv_sec, int tv_usec) {',
            '  tv->tv_sec = tv_sec;',
            '  tv->tv_usec = tv_usec;',
            '}',
        ].join('\n');

        let cm = new CModule(source);
        let modify_time = new NativeFunction(cm.modify_time, 'void', ["pointer", "int", "int"]);

        Interceptor.replace(addr_gettimeofday, new NativeCallback(function (ptr_tz, ptr_tzp) {

            let result = gettimeofday(ptr_tz, ptr_tzp);
            if (result == 0) {
                FSLog.d(tag, `hook gettimeofday: ${ptr_tz} ${ptr_tzp} ${result}`);
                // modify_time(ptr_tz, 0xAAAA, 0xBBBB);
                let t = new Int32Array(ArrayBuffer.wrap(ptr_tz, 8));
                t[0] = 0xAAAA;
                t[1] = 0xBBBB;
                FSLog.d(tag, hexdump(ptr_tz));
            }
            return result;
        }, "int", ["pointer", "pointer"]));
    }
}