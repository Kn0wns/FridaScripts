# -*- coding: utf-8 -*-
# @Time    : 2023-07-29 23:07
# @Author  : KKings
# @File    : main.py
# @Software: PyCharm
import frida
import sys


def on_message(message, data):
    if message['type'] == 'send':
        data = message['payload']
        print(message['payload'])
        with open('SSLKeys.text', 'a+', encoding='utf-8') as f:
            f.write(data + '\n')


package_name = sys.argv[1]  # 包名
pid = frida.get_usb_device().spawn(package_name)
session = frida.get_usb_device().attach(pid)
js_code = open("SSLKeys.js", "r").read()
script = session.create_script(js_code)
frida.get_usb_device().resume(pid)
script.on('message', on_message)
script.load()

sys.stdin.read()

# run
# python main.py packagename
