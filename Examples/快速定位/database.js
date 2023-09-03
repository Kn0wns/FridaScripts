// @Time    : 2022-05-10 9:43
// @Author  : KKings
// @File    : database.js
// @Software: PyCharm

var SQLiteDatabase = Java.use('com.tencent.wcdb.database.SQLiteDatabase');
var Set = Java.use("java.util.Set");
var ContentValues = Java.use("android.content.ContentValues");
SQLiteDatabase.insert.implementation = function (arg1, arg2, arg3) {

    this.insert.call(this, arg1, arg2, arg3);
    console.log("[insert] -> arg1:" + arg1 + "\t arg2:" + arg2);
    var values = Java.cast(arg3, ContentValues);
    var sets = Java.cast(values.keySet(), Set);

    var arr = sets.toArray().toString().split(",");
    for (var i = 0; i < arr.length; i++) {
        console.log("[insert] -> key:" + arr[i] + "\t value:" + values.get(arr[i]));
    }
};
