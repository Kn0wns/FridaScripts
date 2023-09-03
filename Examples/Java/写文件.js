// @Time    : 2022-05-14 14:52
// @Author  : KKings
// @File    : writeTexr.js
// @Software: PyCharm

// 需要App有存储权限
// App私有目录1：/data/data/包名
// App私有目录2：/sdcard/Android/data/包名

var current_application = Java.use('android.app.ActivityThread').currentApplication();
var context = current_application.getApplicationContext();
var path = Java.use("android.content.ContextWrapper").$new(context).getExternalFilesDir("Download").toString()  // Download 全路径
console.log(path);
var ios = new File(path + "/test.txt", "w");
ios.write("写入内容\n");
ios.flush();    // 刷新数据后才会存入数据
ios.close();