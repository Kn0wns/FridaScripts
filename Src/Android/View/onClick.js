// Time    : 2023-03-12 14:18
// Author  : KKings
// File    : onClick.js
// Software: WebStorm

import {FSLog} from "../../FSLogger";

let jclazz = null;
let jobj = null;

function getObjClassName(obj) {
    if (!jclazz) {
        let jclazz = Java.use("java.lang.Class");
    }
    if (!jobj) {
        let jobj = Java.use("java.lang.Object");
    }
    return jclazz.getName.call(jobj.getClass.call(obj));
}

function watch(obj, mtdName) {
    let tag = watch.name
    let listener_name = getObjClassName(obj);
    let target = Java.use(listener_name);
    if (!target || !mtdName in target) {
        return;
    }
    target[mtdName].overloads.forEach(function (overload) {
        overload.implementation = function () {
            FSLog.d(tag, `[WatchEvent] + ${mtdName}: ${getObjClassName(this)}`)
            return this[mtdName].apply(this, arguments);
        };
    })
}

export function OnClick() {
    let tag = OnClick.name
    Java.perform(function () {
        // 以spawn启动进程的模式来attach的话
        Java.use("android.view.View").setOnClickListener.implementation = function (listener) {
            if (listener != null) {
                watch(listener, 'onClick');
            }
            return this.setOnClickListener(listener);
        };

        // 如果frida以attach的模式进行attch的话
        Java.choose("android.view.View$ListenerInfo", {
            onMatch: function (instance) {
                instance = instance.mOnClickListener.value;
                if (instance) {
                    FSLog.d(tag, `mOnClickListener name is : ${getObjClassName(instance)}`)
                    watch(instance, 'onClick');
                }
            },
            onComplete: function () {
            }
        })
    })
}

// setImmediate(OnClickListener);
