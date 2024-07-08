dump_so("libil2cpp.so")

function dump_so(so_name) {
    console.log('start!')
    Java.perform(function () {
        // 获取
        var currentApplication = Java.use("android.app.ActivityThread").currentApplication()
        var dir = currentApplication.getApplicationContext().getFilesDir().getPath()	// 获取App私有目录
        var libso = Process.getModuleByName(so_name)
        console.log("[*]\t[name]:", libso.name)
        console.log("[*]\t[base]:", libso.base)
        console.log("[*]\t[size]:", ptr(libso.size))
        console.log("[*]\t[path]:", libso.path)
        var file_path = dir + "/" + libso.name + "_" + libso.base + "_" + ptr(libso.size) + ".so"
        var file_handle = new File(file_path, "wb")
        if (file_handle && file_handle != null) {
            Memory.protect(ptr(libso.base), libso.size, "rwx")	// 修改指定内存大小权限为可读可写可执行
            var libso_buffer = ptr(libso.base).readByteArray(libso.size)	// 读数据
            file_handle.write(libso_buffer)	// 写出数据
            file_handle.flush()
            file_handle.close()
            console.log("[*]\t[dump]:", file_path)
        }
    })
}