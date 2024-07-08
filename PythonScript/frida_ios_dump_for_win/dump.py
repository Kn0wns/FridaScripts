#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Author : KK
# blog: www.alonemonkey.com

from __future__ import print_function
from __future__ import unicode_literals
import sys
import codecs
import frida
import threading
import os
import shutil
import argparse
import tempfile
import subprocess
import re
import paramiko
from paramiko import SSHClient
from scp import SCPClient
from tqdm import tqdm
import traceback
import zipfile

# 系统环境判断
IS_WIN = sys.platform == 'win32'

IS_PY2 = sys.version_info[0] < 3
if IS_PY2:
    reload(sys)
    sys.setdefaultencoding('utf8')

script_dir = os.path.dirname(os.path.realpath(__file__))

DUMP_JS = os.path.join(script_dir, 'dump.js')

User = 'root'
Password = 'alpine'
Host = 'localhost'
Port = 22
KeyFileName = None

if IS_WIN:
    TEMP_DIR = os.path.join(os.environ['USERPROFILE'], 'Desktop')
else:
    TEMP_DIR = tempfile.gettempdir()
PAYLOAD_DIR = 'Payload'
PAYLOAD_PATH = os.path.join(TEMP_DIR, PAYLOAD_DIR)

file_dict = {}

finished = threading.Event()


def delete_directory(dir_path):
    """
    尝试删除指定的目录。如果使用Python的shutil库失败，将尝试使用命令行rmdir命令。

    参数:
    dir_path (str): 要删除的目录的路径。
    """
    try:
        # 尝试使用 shutil.rmtree 删除目录
        shutil.rmtree(dir_path)
        print(f"目录 {dir_path} 已被成功删除。")
    except PermissionError as e:
        # 如果是权限错误，尝试使用命令行删除
        print(f"尝试使用命令行删除目录 {dir_path}，因为遇到了权限错误: {e}")
        try:
            # 构建命令行命令
            command = ["cmd", "/c", "rmdir", "/s", "/q", dir_path]
            # 使用 subprocess 执行命令行命令
            subprocess.check_call(command)
            print(f"目录 {dir_path} 已被命令行成功删除。")
        except subprocess.CalledProcessError as e:
            # 如果命令行执行失败，打印错误信息
            print(f"使用命令行删除目录 {dir_path} 时失败: {e}")
    except Exception as e:
        # 捕获其他可能的异常，并打印错误信息
        print(f"删除目录 {dir_path} 时发生错误: {e}")


def get_usb_iphone():
    Type = 'usb'
    if int(frida.__version__.split('.')[0]) < 12:
        Type = 'tether'
    device_manager = frida.get_device_manager()
    changed = threading.Event()

    def on_changed():
        changed.set()

    device_manager.on('changed', on_changed)

    device = None
    while device is None:
        devices = [dev for dev in device_manager.enumerate_devices() if dev.type == Type]
        if len(devices) == 0:
            print('等待 USB 设备...')
            changed.wait()
        else:
            device = devices[0]

    device_manager.off('changed', on_changed)

    return device


def zip_folder(folder_path, output_path):
    """
    将指定目录压缩成zip文件，并保存到指定路径。

    :param folder_path: 待压缩的目录路径。
    :param output_path: 压缩包的输出路径。
    """
    # 创建ZipFile对象，并将待压缩文件写入到压缩包中
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        # 将目录中的文件逐个添加到压缩包中
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                abs_path = os.path.join(root, file)
                root_path = os.path.abspath(os.path.join(folder_path, os.pardir))
                rel_path = os.path.relpath(abs_path, root_path)
                zip_file.write(abs_path, rel_path)


def generate_ipa(path, display_name):
    ipa_filename = display_name + '.ipa'
    print('\r' + '-' * 30)
    print(f'已生成 {display_name}.ipa')
    try:
        app_name = file_dict['app']

        for key, value in file_dict.items():
            from_dir = os.path.join(path, key)
            to_dir = os.path.join(path, app_name, value)
            if key != 'app':
                shutil.move(from_dir, to_dir)

        if IS_WIN:
            zip_folder(path, os.path.join(os.getcwd(), ipa_filename))
        else:
            target_dir = './' + PAYLOAD_DIR
            zip_args = ('zip', '-qr', os.path.join(os.getcwd(), ipa_filename), target_dir)
            subprocess.check_call(zip_args, cwd=TEMP_DIR)
            shutil.rmtree(PAYLOAD_PATH)

    except Exception as e:
        print(e)
        finished.set()


def on_message(message, data):
    t = tqdm(unit='B', unit_scale=True, unit_divisor=1024, miniters=1)
    last_sent = [0]

    def progress(filename, size, sent):
        baseName = os.path.basename(filename)
        if IS_PY2 or isinstance(baseName, bytes):
            t.desc = baseName.decode("utf-8")
        else:
            t.desc = baseName
        t.total = size
        t.update(sent - last_sent[0])
        last_sent[0] = 0 if size == sent else sent

    if 'payload' in message:
        payload = message['payload']
        if 'dump' in payload:
            origin_path = payload['path']
            dump_path = payload['dump']

            scp_from = dump_path
            scp_to = PAYLOAD_PATH + '/'

            with SCPClient(ssh.get_transport(), progress=progress, socket_timeout=60) as scp:
                scp.get(scp_from, scp_to)

            if not IS_WIN:
                chmod_dir = os.path.join(PAYLOAD_PATH, os.path.basename(dump_path))
                chmod_args = ('chmod', '655', chmod_dir)
                try:
                    subprocess.check_call(chmod_args)
                except subprocess.CalledProcessError as err:
                    print(err)

            index = origin_path.find('.app/')
            file_dict[os.path.basename(dump_path)] = origin_path[index + 5:]

        if 'app' in payload:
            app_path = payload['app']

            scp_from = app_path
            scp_to = PAYLOAD_PATH + '/'
            with SCPClient(ssh.get_transport(), progress=progress, socket_timeout=60) as scp:
                scp.get(scp_from, scp_to, recursive=True)

            if not IS_WIN:
                chmod_dir = os.path.join(PAYLOAD_PATH, os.path.basename(app_path))
                chmod_args = ('chmod', '755', chmod_dir)
                try:
                    subprocess.check_call(chmod_args)
                except subprocess.CalledProcessError as err:
                    print(err)

            file_dict['app'] = os.path.basename(app_path)

        if 'done' in payload:
            finished.set()
    t.close()


def compare_applications(a, b):
    a_is_running = a.pid != 0
    b_is_running = b.pid != 0
    if a_is_running == b_is_running:
        if a.name > b.name:
            return 1
        elif a.name < b.name:
            return -1
        else:
            return 0
    elif a_is_running:
        return -1
    else:
        return 1


def cmp_to_key(mycmp):
    """Convert a cmp= function into a key= function"""

    class K:
        def __init__(self, obj):
            self.obj = obj

        def __lt__(self, other):
            return mycmp(self.obj, other.obj) < 0

        def __gt__(self, other):
            return mycmp(self.obj, other.obj) > 0

        def __eq__(self, other):
            return mycmp(self.obj, other.obj) == 0

        def __le__(self, other):
            return mycmp(self.obj, other.obj) <= 0

        def __ge__(self, other):
            return mycmp(self.obj, other.obj) >= 0

        def __ne__(self, other):
            return mycmp(self.obj, other.obj) != 0

    return K


def get_applications(device):
    try:
        applications = device.enumerate_applications()
    except Exception as e:
        sys.exit('未能枚举应用程序: %s' % e)

    return applications


def list_applications(device):
    applications = get_applications(device)

    if len(applications) > 0:
        pid_column_width = max(map(lambda app: len('{}'.format(app.pid)), applications))
        name_column_width = max(map(lambda app: len(app.name), applications))
        identifier_column_width = max(map(lambda app: len(app.identifier), applications))
    else:
        pid_column_width = 0
        name_column_width = 0
        identifier_column_width = 0

    header_format = '%' + str(pid_column_width) + 's  ' + '%-' + str(name_column_width) + 's  ' + '%-' + str(
        identifier_column_width) + 's'
    print(header_format % ('PID', 'Name', 'Identifier'))
    print('%s  %s  %s' % (pid_column_width * '-', name_column_width * '-', identifier_column_width * '-'))
    line_format = '%' + str(pid_column_width) + 's  ' + '%-' + str(name_column_width) + 's  ' + '%-' + str(
        identifier_column_width) + 's'
    for application in sorted(applications, key=cmp_to_key(compare_applications)):
        if application.pid == 0:
            print(line_format % ('-', application.name, application.identifier))
        else:
            print(line_format % (application.pid, application.name, application.identifier))


def load_js_file(session, filename):
    source = ''
    with codecs.open(filename, 'r', 'utf-8') as f:
        source = source + f.read()
    script = session.create_script(source)
    script.on('message', on_message)
    script.load()

    return script


def create_dir(path):
    path = path.strip()
    path = path.rstrip('\\')
    if os.path.exists(path):
        # shutil.rmtree(path)
        delete_directory(PAYLOAD_PATH)
    try:
        os.makedirs(path)
    except os.error as err:
        print(err)


def open_target_app(device, name_or_bundleid):
    # print('启动应用 {}'.format(name_or_bundleid))

    pid = ''
    session = None
    display_name = ''
    bundle_identifier = ''
    for application in get_applications(device):
        if name_or_bundleid == application.identifier or name_or_bundleid == application.name:
            pid = application.pid
            display_name = application.name
            bundle_identifier = application.identifier

    try:
        if not pid:
            pid = device.spawn([bundle_identifier])
            session = device.attach(pid)
            device.resume(pid)
        else:
            session = device.attach(pid)
    except Exception as e:
        print(e)

    return session, display_name, bundle_identifier


def start_dump(session, ipa_name):
    print('Dumping {} to {}'.format(display_name, TEMP_DIR))

    script = load_js_file(session, DUMP_JS)
    script.post('dump')
    finished.wait()

    generate_ipa(PAYLOAD_PATH, ipa_name)

    if session:
        session.detach()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='frida-ios-dump (by KK v3.0)')
    parser.add_argument('-l', '--list', dest='list_applications', action='store_true', help='列出已安装的应用程序')
    parser.add_argument('-o', '--output', dest='output_ipa', help='指定解密 IPA 名称')
    parser.add_argument('-H', '--host', dest='ssh_host', help='设置 SSH 主机地址')
    parser.add_argument('-p', '--port', dest='ssh_port', help='设置 SSH 端口')
    parser.add_argument('-u', '--user', dest='ssh_user', help='设置 SSH 用户名')
    parser.add_argument('-P', '--password', dest='ssh_password', help='设置 SSH 密码')
    parser.add_argument('-K', '--key_filename', dest='ssh_key_filename', help='设置 SSH 私钥文件路径')
    parser.add_argument('target', nargs='?', help='Bundle 标识符或目标应用的显示名称')

    args = parser.parse_args()

    exit_code = 0
    ssh = None

    if not len(sys.argv[1:]):
        parser.print_help()
        sys.exit(exit_code)

    device = get_usb_iphone()

    if args.list_applications:
        list_applications(device)
    else:
        name_or_bundleid = args.target
        output_ipa = args.output_ipa
        # 设置 SSH 参数
        if args.ssh_host:
            Host = args.ssh_host
        if args.ssh_port:
            Port = int(args.ssh_port)
        if args.ssh_user:
            User = args.ssh_user
        if args.ssh_password:
            Password = args.ssh_password
        if args.ssh_key_filename:
            KeyFileName = args.ssh_key_filename

        try:
            ssh = SSHClient()
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh.connect(Host, port=Port, username=User, password=Password, key_filename=KeyFileName)

            create_dir(PAYLOAD_PATH)
            (session, display_name, bundle_identifier) = open_target_app(device, name_or_bundleid)
            if output_ipa is None:
                output_ipa = display_name
            output_ipa = re.sub('\.ipa$', '', output_ipa)
            if session:
                start_dump(session, output_ipa)
        except paramiko.ssh_exception.NoValidConnectionsError as e:
            print(e)
            print('尝试指定 -H/--hostname 或 -p/--port')
            exit_code = 1
        except paramiko.AuthenticationException as e:
            print(e)
            print('尝试指定 -u/--username 或 -P/--password')
            exit_code = 1
        except Exception as e:
            print('*** 异常信息: %s: %s' % (e.__class__, e))
            traceback.print_exc()
            exit_code = 1

    if ssh:
        ssh.close()

    if os.path.exists(PAYLOAD_PATH):
        # shutil.rmtree(PAYLOAD_PATH)
        delete_directory(PAYLOAD_PATH)

    sys.exit(exit_code)
