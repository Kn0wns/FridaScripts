// @Time    : 2022-05-16 21:53
// @Author  : KKings
// @File    : context.js
// @Software: PyCharm


const current_application = Java.use('android.app.ActivityThread').currentApplication();
const context = current_application.getApplicationContext();
