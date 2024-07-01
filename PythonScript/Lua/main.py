import os

import frida
import sys

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

    print(f"{size} {filepath}")

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


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python main.py packagename")
        sys.exit(1)

    package_name = sys.argv[1]  # 包名
    pid = frida.get_usb_device().spawn(package_name)
    session = frida.get_usb_device().attach(pid)
    js_code = open("hook.js", "r", encoding='utf-8').read()  # JS 脚本
    script = session.create_script(js_code)
    frida.get_usb_device().resume(pid)
    script.on('message', on_message)
    script.load()

    sys.stdin.read()

    # python main.py packagename
