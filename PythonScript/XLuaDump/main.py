import argparse
import os

import frida
import sys

js_code = """
function hook_loadbuffer(so) {
    let loadbuffer = Module.findExportByName(so, "luaL_loadbufferx");
    console.log(JSON.stringify(Process.getModuleByAddress(loadbuffer)))  // 从地址得到所在so
    Interceptor.attach(loadbuffer, {
        onEnter: function (args) {
            let size = args[2].toInt32();
            let buff = args[1].readCString(size);
            let name = args[3].readCString();
            // console.log(`[ * ] ${size} ${name} ${buff.slice(0, 30)}`)  // debug
            send({"name": name, "size": size, "buff": buff})
        }
    })
}

function monitingLoadSo(soList, hook_func) {
    // dlopen地址  监控So加载名 Hook方法
    function hook_dlopen(addr) {
        Interceptor.attach(addr, {
            onEnter: function (args) {
                this.soName = args[0].readCString();
            }, onLeave: function (retval) {
                if (this.soName) {
                    for (const soListElement of soList) {
                        if (this.soName.includes(soListElement)) {
                            hook_func(soListElement);
                        }
                    }
                }
            }
        })
    }

    const android_dlopen_ext = Module.findExportByName("libdl.so", "android_dlopen_ext");  // Android 高版本API
    hook_dlopen(android_dlopen_ext);
}

monitingLoadSo(['libxlua.so'], hook_loadbuffer)"""

package_name = ""
un_know_lua = 1


def write_file(filepath, buffer, size):
    global un_know_lua
    if filepath == buffer:
        filepath = os.path.join(package_name, f"unknow_{un_know_lua}.lua")
        un_know_lua = un_know_lua + 1
    else:
        # 格式化文件路径
        filepath = filepath.replace('.', '/').replace('@', '')

        # 添加后缀
        if not filepath.endswith('.lua'):
            filepath += '.lua'

        # 添加目录前缀
        filepath = os.path.join(package_name, filepath)

    print(f"{size:8} {filepath}")

    # 判断目录是否存在，如果不存在则创建
    folder = os.path.dirname(filepath)
    if not os.path.exists(folder):
        os.makedirs(folder)

    # 打开文件并写入缓冲区内容
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(buffer)


# write_file("net.netmsg.worship.ClientWorshipMasterInfoRep", "9527")


def on_message(message, data):
    if message['type'] == 'send':
        name = message['payload']['name']
        buff = message['payload']['buff']
        size = message['payload']['size']
        write_file(name, buff, size)


def main():
    global package_name
    parser = argparse.ArgumentParser(description='Frida 脚本加载器')
    parser.add_argument('package', metavar='包名', type=str, help='需要 hook 的包名')
    parser.add_argument('-H', '--host', type=str, help='远程 frida 服务器地址 (例如 192.168.1.100:27042)')

    args = parser.parse_args()

    if args.host:
        device = frida.get_device_manager().add_remote_device(args.host)
    else:
        device = frida.get_usb_device()

    try:
        package_name = args.package  # 包名
        pid = device.spawn(package_name)
        session = device.attach(pid)
        script = session.create_script(js_code)
        device.resume(pid)
        script.on('message', on_message)
        script.load()
        print("脚本加载成功，按 Ctrl+C 退出。")

        sys.stdin.read()  # 保持脚本运行
    except KeyboardInterrupt:
        print("\n用户中断了脚本执行")
    except Exception as e:
        print(f"发生错误: {e}")
        sys.exit(1)
    finally:
        # 在此处可以添加任何必要的清理操作
        pass


if __name__ == '__main__':
    # python main.py <packagename>
    # python main.py <packagename> -H <192.168.1.100:27042>
    main()
