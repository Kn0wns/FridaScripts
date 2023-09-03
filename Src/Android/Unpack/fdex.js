// Time    : 2023-03-04 16:10
// Author  : KKings
// File    : fdex.js
// Software: WebStorm

const savePath = "/sdcard/";

function saveDexFile(dexFilePtr) {
    try {
        const dexFileBegin = ptr(dexFilePtr).add(Process.pointerSize * 1).readPointer();
        const dexFileSize = ptr(dexFilePtr).add(Process.pointerSize * 2).readU32();
        const dex = new File(savePath + "_" + dexFileSize + ".dex", "a");
        if (dex != null) {
            const content = dexFileBegin.readByteArray(dexFileSize);
            dex.write(content);
            dex.flush();
            dex.close();
            console.warn("[dumpdex]" + savePath + "_" + dexFileSize + ".dex");
        }
    } catch (e) {
    }
}

/**
 * 通过 mCookie 进行脱壳
 * https://404notf.notion.site/fdex2-f46b6bd88f4441db882652dce1784c4c
 */
export const dumpDexBymCookie = () => {
    Java.perform(function () {
        const DexFileClass = Java.use("dalvik.system.DexFile");
        Java.choose("dalvik.system.DexFile", {
            onMatch: function (dexfile) {
                const mCookie = dexfile.mCookie.value;
                /*let classList = DexFileClass.getClassNameList(mCookie);
                classList.forEach(function (classname) {
                    console.log(dexfile.mFileName.value + "->" + classname);  // 每个 DexFile 的类列表
                })*/
                console.log(mCookie.$className); //[J
                const Array = Java.use("java.lang.reflect.Array");
                const size = Array.getLength(mCookie);  // 获取数组长度
                for (let i = 0; i < size; i++) {
                    console.log(i + "->" + Array.getLong(mCookie, i));
                    const longValue = Array.getLong(mCookie, i);
                    const dexFilePtr = ptr(longValue + "");
                    saveDexFile(dexFilePtr);
                }

            }, onComplete: function () {
                console.warn("search DexFile over!");
            }
        })
    })
}

// FIXME 似乎跟上面的是一样的
function dexdump_DexCache() {
    Java.performNow(function () {
        let dex_count = 1;
        Java.choose("java.lang.DexCache", {
            onMatch: function (ins) {
                let name = "" // 不过滤
                // let name = get_self_process_name() // 开启，只在包含当前包名的路劲过滤
                if (ins.location.value.indexOf(name) != -1) {
                    let save_name = ins.location.value.replaceAll("/", "_").replaceAll(".", "_").replaceAll(":", "_").replaceAll("!", "_").replaceAll("-", "_")
                    let dex_file = ins.dexFile.value
                    let base = ptr(dex_file).add(Process.pointerSize).readPointer();
                    let size = ptr(dex_file).add(Process.pointerSize + Process.pointerSize).readUInt();
                    let magic = ptr(base).readCString();
                    if (magic.indexOf("dex") == 0) {
                        let process_name = get_self_process_name();
                        if (process_name != "-1") {
                            if (has_save_permission) {
                                let dex_dir_path = "/sdcard/" + "dumpdex_" + process_name;
                                mkdir(dex_dir_path);
                            } else {
                                let dex_dir_path = "/data/data/" + process_name; // no save permission
                            }
                            let dex_path = dex_dir_path + "/dumpdex_" + save_name + "_DexCache.dex";
                            let fd = new File(dex_path, "wb");
                            if (fd && fd != null) {
                                dex_count++;
                                let dex_buffer = ptr(base).readByteArray(size);
                                fd.write(dex_buffer);
                                fd.flush();
                                fd.close();
                                console.log("[dump dex]:", dex_path);
                            }
                        }
                    }
                }
            },
            onComplete: function () {
            }
        })
    })
}