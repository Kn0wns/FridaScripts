import codecs
import frida
import json
import requests

with codecs.open('hook.js', 'r', 'utf-8') as f:
    jsCode = f.read()

process = frida.get_usb_device(1000).attach("com.dodonew.online")
script = process.create_script(jsCode)
print('[*] Running ...')
script.load()

# Rpc getParams
cipherText = script.exports.getParams('16688889999', 'a12345678')
print("cipherText:", cipherText)
url = 'http://api.dodovip.com/api/user/login'
data = json.dumps({"Encrypt": cipherText})
r = requests.post(url=url, data=data, headers={
    "content-type": "application/json; charset=utf-8",
    "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 10; Pixel Build/QP1A.191005.007.A3)"
})
print("[*] 请求参数 :=> " + data)
print("[*] 响应 :=> " + r.text)
print("[*] 响应解密 :=> " + script.exports.deCipher(r.text))
