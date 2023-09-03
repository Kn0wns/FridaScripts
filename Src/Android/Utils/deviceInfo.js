// Time    : 2023-03-03 21:58
// Author  : KKings
// File    : deviceInfo.js
// Software: WebStorm

// 获取 Android 设备信息
Java.perform(function x() {
    //获取 IMEI【卡槽】
    const TelephonyManager = Java.use("android.telephony.TelephonyManager");
    TelephonyManager.getDeviceId.overload("int").implementation = function (slotIndex) {
        const iemi = this.getDeviceId(slotIndex);
        console.log("TelephonyManager 获取 IMEI slotIndex = " + slotIndex + "  iemi = " + iemi)
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        return iemi;
    }

    //获取 IMEI
    TelephonyManager.getDeviceId.overload().implementation = function () {
        const iemi = this.getDeviceId();
        console.log("TelephonyManager 获取 IMEI = " + iemi)
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        return iemi;
    }

    //获取 Mac
    const NetworkInterface = Java.use("java.net.NetworkInterface");
    NetworkInterface.getHardwareAddress.implementation = function () {
        const mac = this.getHardwareAddress();
        console.log("NetworkInterface 获取 MAC = " + mac)
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        return mac;
    }

    //获取 AndroidID
    const ANDROID_ID = "android_id";
    let Secure = Java.use("android.provider.Settings$Secure");
    Secure.getString.implementation = function (resolver, name) {
        const result = this.getString(resolver, name);
        console.log("getString  name = " + name + " val =" + result)
        if (ANDROID_ID === name) {
            console.log("getString 获取 androidID")
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        }
        return result;
    }

    Secure = Java.use("android.provider.Settings$Secure");
    Secure.getStringForUser.implementation = function (resolver, name, userHandle) {
        const result = this.getStringForUser(resolver, name, userHandle);
        console.log("getStringForUser  name = " + name + " val =" + result)
        if (ANDROID_ID === name) {
            console.log("Secure getStringForUser 获取 androidID")
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        }
        return result;
    }

    Secure = Java.use("android.provider.Settings$System");
    Secure.getStringForUser.implementation = function (resolver, name, userHandle) {
        const result = this.getStringForUser(resolver, name, userHandle);
        console.log("System getStringForUser  name = " + name + " val =" + result)
        if (ANDROID_ID === name) {
            console.log("System getStringForUser 获取 androidID")
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
        }

        return result;
    }
})
