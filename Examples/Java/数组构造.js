// @Time    : 2022-05-14 21:59
// @Author  : KKings
// @File    : 数组构造.js
// @Software: PyCharm

// 使用Java.array这个API的时候，第一个类名参数各个版本写法不一样
// 试试java.lang.String不行就试试Ljava.lang.String;还不行就再试试Ljava/lang/String;

StrArray
Clazz.Methond(["1", "2", "3"])
Clazz.Methond(Java.Array("Ljava.lang.String;", ["1", "2", "3"]))

BytesArray
Java.array('byte', [13, 37, 42])

ObjArray ["str", 1, true, this.Clazz] //只需要处理基本数据类型的包装
// this.Clazz 就获取类对象然后构造出来就行了
var boolean = Java.use("java.lang.Boolean").$new(true)
var integer = Java.use("java.lang.Integer").$new(2).intValue()
var Long = Java.use("java.lang.Long").$new(2).longValue()

Clazz.Methond(Java.Array("Ljava.lang.Object;", ["1", integer, boolean, ClazzObj]))
Clazz.Methond(["1", integer, boolean, ClazzObj])  // 不带Java.Array frida也会自动处理

// ArrayList 主动调用
var newList = Java.use("java.util.ArrayList").$new();
var integer = Java.use("java.lang.Integer")
newList.add(integer.$new(9));
newList.add("你好");