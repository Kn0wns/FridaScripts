import {FSLog as log} from "../../FSLogger";
import {Utils} from "../Utils/Utils";
import {systemEncryptionLibrary} from "./SystemEncryptionLibrary";

// 快速定位
export namespace FastPoint {
    export const hook = () => {
        toast();
        JSONObject();
        JString();
        base64();
        StringBuffer();
        SQLLite();
        // ArrayList();  // keyword
        // HashMap();
    }

    export const hook_encrypt = () => systemEncryptionLibrary();  // java 系统加密库

    function toast() {
        Java.use("android.widget.Toast").makeText.overload('android.content.Context', 'java.lang.CharSequence', 'int').implementation = function (context: any, text: string, duration: number) {
            let duration_str = "Toast.LENGTH_SHORT"
            if (duration == 1) duration_str = "Toast.LENGTH_LONG"
            log.w("Toast.makeText", "Toast.makeText(\x1b[96m'" + JSON.stringify(context) + "','" + text + "','" + duration_str + "'\x1b[0m)")

            return this.makeText(context, text, duration)
        }

        Java.use("android.widget.Toast").show.implementation = function () {
            log.w("Toast.show", ``);
            Utils.showStacks();
            return this.show();
        }
    }

    function JSONObject() {
        Java.perform(function () {
            Java.use('org.json.JSONObject').getString.implementation = function (key: string) {
                const ret = this.getString(key)
                log.d("JSONObject.getString", `JSONObject.getString(\x1b[96m'${key}'\x1b[0m) 返回值${ret}`);
                return ret
            }
        })
    }

    function JString() {
        let str = Java.use("java.lang.String");
        str.getBytes.overload().implementation = function () {
            Utils.showStacks();
            let result = this.getBytes();
            log.d('JString', `str.getBytes result: ${str.$new(result)}`);
            return result;
        }
        str.getBytes.overload('java.lang.String').implementation = function (a: string) {
            Utils.showStacks();
            let result = this.getBytes(a);
            log.d('JString', `str.getBytes result: ${str.$new(result, a)}`);
            return result;
        }
        str.trim.implementation = function () {
            Utils.showStacks();
            let result = this.trim();
            log.d('JString', `str.trim result: ${str.$new(result)}`);
            return result;
        }
    }

    function base64() {
        let base64 = Java.use("android.util.Base64")
        base64.encodeToString.overload('[B', 'int').implementation = function (a: any, b: number) {
            Utils.showStacks();
            log.d("Base64", `base64.encodeToString: ${JSON.stringify(a)}`);
            let result = this.encodeToString(a, b);
            log.d("Base64", `base64.encodeToString result: ${result}`)
            return result;
        }
    }

    function StringBuffer() {
        let StringBuffer = Java.use("java.lang.StringBuffer");
        let StringBuilder = Java.use("java.lang.StringBuilder");
        StringBuffer.append.implementation = function (append_str: string) {
            Utils.showStacks();
            let result = this.append(append_str);
            log.d('StringBuffer', `str.append result: ${append_str}`);
            return result;
        }
        StringBuilder.append.implementation = function (append_str: string) {
            Utils.showStacks();
            let result = this.append(append_str);
            log.d('StringBuilder', `str.append result: ${append_str}`);
            return result;
        }
    }

    function SQLLite() {
        let SQLiteDatabase = Java.use('com.tencent.wcdb.database.SQLiteDatabase');
        let Set = Java.use("java.util.Set");
        let ContentValues = Java.use("android.content.ContentValues");
        SQLiteDatabase.insert.implementation = function (arg1: string, arg2: string, arg3: any) {
            this.insert.call(this, arg1, arg2, arg3);
            log.d(`SQLiteDatabase`, `[insert] -> arg1: ${arg1} arg2: ${arg2}`);
            let values = Java.cast(arg3, ContentValues);
            let sets = Java.cast(values.keySet(), Set);
            let arr = sets.toArray().toString().split(",");
            for (let i = 0; i < arr.length; i++) {
                log.d(`SQLiteDatabase`, `[insert] -> key: ${arr[i]} value: ${values.get(arr[i])}`);
            }
        };
    }


    function ArrayList() {
        let arrayList = Java.use("java.util.ArrayList");
        arrayList.add.overload('java.lang.Object').implementation = function (a: any) {
            if (arguments[0].indexOf("过滤关键词") != -1) {
                Utils.showStacks();
                log.d(`ArrayList`, `arrayList.add(${JSON.stringify(a)})`);
            }
            return this.add.apply(this, arguments);
        }
        arrayList.add.overload('int', 'java.lang.Object').implementation = function (a: number, b: any) {
            log.d(`ArrayList`, `arrayList.add(${a},${JSON.stringify(b)})`);
            return this.add.apply(this, arguments);
        }
    }

    /*  put 方法
    java.util.HashMap
    java.util.HashSet
    java.util.LinkedHashMap
    java.util.LinkedHashSet*/
    function HashMap() {
        let HashMap = Java.use("java.util.HashMap");
        HashMap.put.implementation = function (key: any, value: string) {
            if (arguments[0].indexOf('过滤关键词') != -1) {
                Utils.showStacks();
                log.d(`HashMap`, `hashMap.put(${key},${value}) `);
            }
            return this.put.apply(this, arguments);
        }
    }
}
