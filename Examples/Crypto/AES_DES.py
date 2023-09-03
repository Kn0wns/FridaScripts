import base64
import binascii
import hashlib
import json
import re
import zlib

from Crypto.Util.Padding import pad, unpad
from Crypto.Cipher import DES3
from Crypto.Cipher import DES
from Crypto.Cipher import AES
from binascii import b2a_hex, a2b_hex


class EncryptDate:
    def __init__(self, type, key, iv=None):
        if type == 'AES':
            self.unpad = lambda date: date[0:-ord(date[-1])]
            self.key = key  # 初始化密钥
            if iv:
                self.iv = iv
                self.length = AES.block_size  # 初始化数据块大小
                self.aes = AES.new(self.key, AES.MODE_CBC, self.iv)  # 初始化AES,ECB模式的实例
                # 截断函数，去除填充的字符

            else:
                self.length = AES.block_size  # 初始化数据块大小
                self.aes = AES.new(self.key, AES.MODE_ECB)  # 初始化AES,ECB模式的实例
                # 截断函数，去除填充的字符

        elif type == 'DES3':
            self.key = key  # 初始化密钥
            if iv:
                self.iv = iv
                self.length = DES3.block_size  # 初始化数据块大小
                self.aes = DES3.new(
                    self.key, DES3.MODE_CBC, self.iv)  # 初始化AES,ECB模式的实例

            else:
                self.length = DES3.block_size  # 初始化数据块大小
                self.aes = DES3.new(self.key, DES3.MODE_ECB)  # 初始化AES,ECB模式的实例
        elif type == 'DES':
            self.key = key  # 初始化密钥
            if iv:
                self.iv = iv
                self.length = DES.block_size  # 初始化数据块大小
                self.aes = DES.new(
                    self.key, DES.MODE_CBC, self.iv)  # 初始化AES,ECB模式的实例

            else:
                self.length = DES.block_size  # 初始化数据块大小
                self.aes = DES.new(self.key, DES.MODE_ECB)  # 初始化AES,ECB模式的实例

    def base64_decode(self, text):
        return base64.b64decode(text)

    def pad(self, data):
        """
        #填充函数，使被加密数据的字节码长度是block_size的整数倍
        """
        if isinstance(data, str):
            count = len(data.encode('utf-8'))
            add = self.length - (count % self.length)
            entext = data + (chr(add) * add)
            return entext
        elif isinstance(data, bytes):
            padding_len = (16 - len(data) % 16)
            data += padding_len * binascii.a2b_hex(format(padding_len, 'x').zfill(2))
            return data

    # base64输出

    def encrypt(self, encrData):  # 加密函数
        res = self.aes.encrypt(self.pad(encrData).encode())

        msg = base64.b64encode(res).decode()
        return msg

    def decrypt(self, decrData):  # 解密函数
        res = base64.b64decode(decrData.encode())

        msg = self.aes.decrypt(res).decode()
        # bytes.rstrip('\0')
        return self.unpad(msg)

    # 16进制输出
    def encrypt_hex(self, encrData):  # 加密函数
        if isinstance(encrData, bytes):
            res = self.aes.encrypt(self.pad(encrData))

            return b2a_hex(res).decode()
        res = self.aes.encrypt(self.pad(encrData).encode())

        return b2a_hex(res).decode()

    def decrypt_hex(self, decrData):  # 解密函数
        res = a2b_hex(decrData)
        plain_text = self.aes.decrypt(res)

        try:
            return plain_text.decode()
        except:

            return plain_text


if __name__ == "__main__":
    text = '{"categoryId":19,"pageIndex":4,"pageSize":20}'
    key = '3b21a5ea2aa7222e'.encode()
    iv = "PuQL2Dsk74deXwGo".encode()
    # 加密
    aes = EncryptDate('AES', key, iv)
    text = aes.encrypt(text)
    print(text)
    # 解密
    aes = EncryptDate('AES', key, iv)
    data = aes.decrypt(text)
    print(data)
