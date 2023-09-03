// 类名非ASCII字符串时，用base64编码和解码，再比对。
//场景hook cls.forName寻找目标类的classloader。
` 不可见字符
 int ֏(int x) {
        return x + 100;
    }
`

cls.forName.overload('java.lang.String', 'boolean', 'java.lang.ClassLoader').implementation = function (arg1, arg2, arg3) {
    var clsName = cls.forName(arg1, arg2, arg3);
    console.log('oriClassName:' + arg1)
    var base64Name = encodeURIComponent(arg1)
    console.log('encodeName:' + base64Name);
    //通过日志确认base64后的非asc字符串，下面对比并打印classloader
    //clsName为特殊字符o.ÎÉ«
    if ('o.%CE%99%C9%AB' == base64Name) {
        //打印classloader
        console.log(arg3);
    }
    return clsName;
}

Java.perform(
    function x() {
        var targetClass = "com.example.hooktest.MainActivity";

        var hookCls = Java.use(targetClass);
        var methods = hookCls.class.getDeclaredMethods();

        for (var i in methods) {
            console.log(methods[i].toString());
            console.log(encodeURIComponent(methods[i].toString().replace(/^.*?\.([^\s\.\(\)]+)\(.*?$/, "$1")));
        }

        hookCls[decodeURIComponent("%D6%8F")]
            .implementation = function (x) {
            console.log("original call: fun(" + x + ")");
            var result = this[decodeURIComponent("%D6%8F")](900);
            return result;
        }
    }
)