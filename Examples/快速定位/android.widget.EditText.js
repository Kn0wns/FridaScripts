// @Time    : 2022-05-14 9:47
// @Author  : KKings
// @File    : android.widget.EditText.js
// @Software: PyCharm

setImmediate(function () {
    // setTimeout
    Java.perform(function () {
        Java.use('android.widget.EditText').getText.overload().implementation = function () {
            let result = this.getText.apply(this, arguments);
            // 这里可以打印参数和返回值 hook code
            result = Java.cast(result, Java.use('java.lang.CharSequence'))
            console.log("[*]\t getText :=>", result)
            return result
        }
    });
});

