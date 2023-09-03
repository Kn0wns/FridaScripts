# -*- coding:utf-8 -*-

import os
import socket


class adbShell():
	"""adb shell的类"""

	def adb_send_command(self, command):
		"""adb发送指令"""
		self.socket.sendall(b'%04x' % (len(command)))
		self.socket.sendall(command.encode())

	def adbshell_send_command(self, command):
		"""adb shell 发送指令"""
		req_msg = 'shell:%s' % (command)
		self.adb_send_command(req_msg)

	def adb_recvice(self, count):
		"""adb接收count个数据"""
		return self.socket.recv(count)

	def adb_recvice_data(self):
		"""adb接收完整的数据"""
		resp = self.adb_recvice(4)
		if b'OKAY' != resp:
			return 1, resp
		rbuf = b''  # 以字符串的形式呈现
		count = 0
		while True:
			try:
				resp = self.adb_recvice(4096)
			except socket.error as e:
				if 5 == count:
					break  # 超时的时候也退出
				else:
					count += 1  # 多等几次吧
					continue
			else:
				if 0 == len(resp):  # recv函数返回值为字符串,只能通过判断字符串长度来确定是否有数据接收
					break
				else:
					rbuf += resp
		return 0, rbuf

	def adb_connect(self):
		"""创建链接"""
		self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		self.socket.settimeout(5)
		count = 0
		while True:
			try:
				self.socket.connect(('127.0.0.1', 5037))
			except:
				if 5 != count:
					# 尝试连接5次
					os.system('adb start-server')
					count = count + 1
					continue
				else:
					return 'ERRO'
			else:
				break
		req_msg = 'host:transport-any'
		self.adb_send_command(req_msg)
		resp = self.adb_recvice(4)
		return resp  # 只返回结果,不进行判断

	def adb_server(self, command):
		"""adb服务"""
		is_connected = self.adb_connect()
		if b'OKAY' != is_connected:
			return [1, 'Can not connect to any devices']
		self.adbshell_send_command(command)
		error_code, recv_data = self.adb_recvice_data()
		return error_code, recv_data


if __name__ == '__main__':
	"""测试用"""
	pid = 14489
	SONAME = "libegis.so"
	test = adbShell()
	result = test.adb_server(f'su -c cat /proc/{pid}/maps | grep {SONAME} --context=3')
