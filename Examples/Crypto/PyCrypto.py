import Crypto.Random
from Crypto.Cipher import DES, AES
from Crypto.Util.Padding import pad, unpad
from base64 import b64encode, b64decode
from Crypto.Hash import MD5, SHA1, HMAC


def md5(data: str):
    m = MD5.new(data.encode())
    return m.hexdigest()


def sha1(data: str):
    s = SHA1.new(data.encode())
    return s.hexdigest()


def hmac(key: str, data: str, type: int):
    key = key.encode()
    data = data.encode()
    if type == 0:
        mode = MD5
    elif type == 1:
        mode = SHA1
    h = HMAC.new(key, data, mode)
    return h.hexdigest()


def AES_encrypt(data: str, key: bytes, mode: int):
    cipher = AES.new(key, mode)
    data = pad(data.encode(), AES.block_size)  # 填充
    result = cipher.encrypt(data)  # 加密
    result = b64encode(result).decode()
    return result


def AES_decrypt(data: str, key: bytes, mode: int):
    data = b64decode(data)
    cipher = AES.new(key, mode)
    result = cipher.decrypt(data)  # 解密
    result = unpad(result, AES.block_size).decode()  # 去除填充
    return result


key = Crypto.Random.get_random_bytes(16)
a = AES_encrypt('a12345678', key, AES.MODE_ECB)
print(a, key)
print(AES_decrypt(a, key, AES.MODE_ECB))


class Cipher():
    def __init__(self):
        """
        md5 sha1 hmac
        aes des
        base64 hex
        """
        pass

    def des_encrypt(data: str):
        iv = bytes.fromhex("1234567890abcdef")
        key = bytes.fromhex("75217e2337407730")
        cipher = DES.new(key, DES.MODE_CBC, iv)  # 初始化AES,ECB模式的实例
        cipherText = cipher.encrypt(pad(data.encode(), DES.block_size))
        print(b64encode(cipherText).decode())
        return b64encode(cipherText).decode()
