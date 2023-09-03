import codecs
import frida
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

with codecs.open('hook.js', 'r', 'utf-8') as f:
    jsCode = f.read()

process = frida.get_usb_device().attach("com.dodonew.online")
script = process.create_script(jsCode)
script.load()
app = FastAPI()  # 初始化


@app.get("/getParams")  # get请求触发
async def getEchoApi(user, pwd):
    # http://127.0.0.1:8080/getParams?user=16688889999&pwd=a12345678
    result = script.exports.getParams(user, pwd)
    return {"Encrypt": result}


# 声明参数模型
class Item(BaseModel):
    data: str

@app.post("/deCipher")
async def getEchoApi(item: Item):
    result = script.exports.decipher(item.data)
    return result


if __name__ == '__main__':
    uvicorn.run(app, port=8080)  # 本地监听端口
