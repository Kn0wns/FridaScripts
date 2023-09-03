# -*- coding: utf-8 -*-
# @Time    : 2022/1/26 13:48
# @Author  : KKings
# @File    : RSA.py
# @Software: PyCharm
from base64 import b64decode, b64encode
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5, PKCS1_OAEP


def generate_key():
    key = RSA.generate(2048)
    with open('public.pem', 'wb') as f:
        print('生成公钥!')
        f.write(key.public_key().export_key())
    with open('private.pem', 'wb') as f:
        print('生成私钥!')
        f.write(key.export_key())


def encrypt(data: bytes):
    with open('public.pem', 'rb') as f:
        content = f.read()
    RSAkey = RSA.import_key(content)
    RSAkey = PKCS1_v1_5.new(RSAkey)
    result = RSAkey.encrypt(data)
    result = b64encode(result).decode()
    print('密文:', result)
    return result


def decode(data: str):
    with open('private.pem', 'rb') as f:
        content = f.read()
    RSAkey = RSA.import_key(content)
    RSAkey = PKCS1_v1_5.new(RSAkey)
    data = b64decode(data)
    result = RSAkey.decrypt(data, 'error').decode()
    print('明文:', result)
    return result


if __name__ == '__main__':
    generate_key()  # 公私钥生成
    data = 'KK'
    encodeData = encrypt(data.encode())  # 加密
    decodeData = decode(encodeData)  # 解密
