// @Time    : 2022-05-10 10:02
// @Author  : KKings
// @File    : Toast.js
// @Software: PyCharm

function showStacks() {
    console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
}

Java.perform(function () {
    // Toast.show
    Java.use("android.widget.Toast").show.implementation = function () {
        showStacks();
        console.log("toast.show", ...arguments);
        return this.show();
    }
})

// 主线程显示toast的脚本：主动调用显示toast
function showToast(string) {
    Java.perform(function () {
        var Toast = Java.use('android.widget.Toast');
        var currentApplication = Java.use('android.app.ActivityThread').currentApplication();
        var context = currentApplication.getApplicationContext();
        Java.scheduleOnMainThread(function () {
            Toast.makeText(context, string, Toast.LENGTH_LONG.value).show();
        })
    })
}