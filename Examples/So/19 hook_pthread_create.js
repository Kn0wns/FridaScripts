// @Time    : 2022-05-22 19:55
// @Author  : KKings
// @File    : 19 hook_pthread_create.js
// @Software: PyCharm

function hook_pthread_create() {
    var pthread_create_addr = Module.findExportByName("libc.so", "pthread_create"); // 系统函数 所以无需 hook dlopen
    console.log("pthread_create_addr: ", pthread_create_addr);
    Interceptor.attach(pthread_create_addr, {
        onEnter: function (args) {
            // pthread_create(&thread,nullptr,myThread,nullptr)
            // pthread_create(&线程id, 线程属性, 函数指针, 函数参数)
            console.log(args[0], args[1], args[2], args[3]);
            const module = Process.findModuleByAddress(args[2]);  // 从 NativePointerValue 得到 module 信息
            module && console.log(module.name, args[2].sub(module.base));  // 输出module名及偏移
            console.log('hook Done!')
        }
    })
}

/*
* 一些检测函数需要实时运行，那么就有可能用 pthread 开启一个子线程
* hook 它来查看开启了哪些子线程，把和检测相关的子线程干掉
*    void *fn(void *arg) {
*        int i = *(int *)arg;
*        cout << "i = " << i << endl;
*        return ((void *)0);
*    }
*
*    int main() {
*        int err1;
*        int i=10;
*        err1 = pthread_create(&thread, NULL, &fn, &i);
*        pthread_join(thread, NULL);
*    }
* */

