// @Time    : 2022-05-21 11:11
// @Author  : KKings
// @File    : 13 So 函数定位.js
// @Software: PyCharm

/* 基本概念
1. 静态分析查看静态代码块中加载的so并不准确
    native函数声明在一个类中,so加载在其他的类中.或另外的类中一次性加载所有的so,只要在使用方法前加载即可

2. hook系统函数来得到绑定的native函数地址，然后再得到so地址
  jni函数动态注册，可以hook RegisterNatives
  jni函数静态注册，可以hook dlsym

  frida-trace -UF -i "Java_com*"
*/



