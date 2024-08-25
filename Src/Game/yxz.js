import "frida-il2cpp-bridge"
import {FSLog as log} from "../FSLogger";
import {opcode} from "./yxz.opcode"

let opcodeMapping = opcode
opcodeMapping["4294967294"] = "H_C2G_Heartbeat_Req";  // 增加心跳映射
opcodeMapping["4294967295"] = "H_G2C_Heartbeat_Res";

export const yxz = () => main()

// Il2Cpp.corlib 是指 mscorlib 程序集

function unity_log() {
    const coreModule = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
    const debug = coreModule.class('UnityEngine.Debug');
    const logger = coreModule.class('UnityEngine.Logger');

    debug.method("Log", 1).implementation = function (message) {
        log.d("unity_log", `${message}`)
        this.method("Log", 1).invoke(message);
    }

    logger.method("Log", 1).implementation = function (message) {
        log.i("unity_log", `${message}`)
        this.method("Log", 1).invoke(message);
    }
}

function hotfixDump() {
    let mscorlib = Il2Cpp.domain.assembly("mscorlib").image.class("System.Reflection.Assembly")
    let Load = mscorlib.method("Load", 1).overload("System.Byte[]")
    Load.implementation = function (bytes) {
        let buff = ptr(bytes).add(Il2Cpp.Array.headerSize)  // 等同于 bytes.elements
        let filePath = `${Il2Cpp.application.dataPath}/hotUpdate.dll`
        let file = new File(filePath, "wb");
        file.write(buff.readByteArray(bytes.length));
        file.flush();
        file.close();
        log.d(`hotfixDump`, `dump to ${filePath}`)
        Load.invoke(bytes)
    }
}

/*
public MemoryStream Unpack(object message, uint sessionId) {
    MemoryStream stream = MemoryStreamHelper.GetStream(12);  // 初始 MemoryStream 对象，预留了12字节的空间
    stream.Seek(12L, SeekOrigin.Begin);  // 流指针移动到12字节的位置
    uint num1 = 4294967294;
    int num2 = 0;
    if (message != null) {
        num1 = MessageOpcode.GetOpCode(message.GetType());  // 获取消息的 OpCode
        this.Serialize<object>(message, stream);  // 序列化消息
        num2 = (int)(stream.Length - 12L);  // 计算实际消息数据的长度（不包括预留的12字节）
    }
    // 检查消息数据是否超过1MB（1048560字节），如果超过则抛出异常
    if (num2 > 1048560) throw new Exception(string.Format("Message content exceeds {0} bytes", (object)1048560));
    stream.Seek(0L, SeekOrigin.Begin);  // 流指针移动到开头
    // 写入会话ID、消息长度和操作码到流的起始位置
    byte[] bytes1 = BitConverter.GetBytes(sessionId);
    stream.Write(bytes1, 0, bytes1.Length);  // uint 4 字节
    byte[] bytes2 = BitConverter.GetBytes(num2);
    stream.Write(bytes2, 0, bytes2.Length);  // int 4 字节
    byte[] bytes3 = BitConverter.GetBytes(num1);
    stream.Write(bytes3, 0, bytes3.Length);  // uint 4 字节
    stream.Seek(0L, SeekOrigin.Begin);
    return stream;
}
// 因此，最小占用大小为12字节（预留空间），加上实际消息数据的大小。最大占用大小为1MB + 12字节
 */

function unpack(bytes) {
    let memoryStream = new DataView(bytes);
    let sessionId = memoryStream.getUint32(0, true);  // 小端字节序
    let msgLen = memoryStream.getInt32(4, true);
    let OpCode = memoryStream.getUint32(8, true);
    return {"sessionId": sessionId, "msgLen": msgLen, "OpCode": OpCode};
}


function pbBuf(bytes, pack) {
    let PbBuff = ptr(bytes.elements).add(12).readByteArray(pack.msgLen);  // 去除12字节的标识头
    return Array.from(new Uint8Array(PbBuff)).map(byte => ('00' + byte.toString(16)).slice(-2)).join('');  // 转换为16进制字符串
}

function send() {
    let KcpNetworkChannel = Il2Cpp.domain.assembly("Game.Runtime").image.class("Sining.KcpNetworkChannel")
    let send = KcpNetworkChannel.method("Send"); // System.Void Send(System.IO.MemoryStream memoryStream); // 0x015a33a8"
    // log.d("send", `${send} ${send.virtualAddress}`)
    send.implementation = function (memoryStream) {
        this.method("Send").invoke(memoryStream)
        let bytes = memoryStream.method("ToArray", 0).invoke();  // System.Byte[] ToArray();
        let arrayBuffer = ptr(bytes.elements).readByteArray(bytes.length);
        let pack = unpack(arrayBuffer);
        let PbHex = pbBuf(bytes, pack);
        log.i(`send`, `${JSON.stringify(pack)} ${opcodeMapping[pack.OpCode]} ${PbHex}`)
    }
}

function recv() {
    let KCP = Il2Cpp.domain.assembly("Game.Runtime").image.class('Sining.KCP')
    let recv = KCP.method("ikcp_recv")  // System.Int32 ikcp_recv(System.IntPtr kcp, System.Byte[] buffer, System.Int32 len);  // 0x0159fdb4
    // let recv = KCP.method("KcpRecv")  // static System.Int32 KcpRecv(System.IntPtr kcp, System.Byte[] buffer, System.Int32 len);
    recv.implementation = function (kcp, bytes, len) {
        this.method("ikcp_recv").invoke(kcp, bytes, len)
        let arrayBuffer = ptr(bytes.elements).readByteArray(bytes.length);
        let pack = unpack(arrayBuffer);
        let PbHex = pbBuf(bytes, pack);
        log.i(`recv`, `${JSON.stringify(pack)} ${opcodeMapping[pack.OpCode]} ${PbHex}`)
    }
}

function main() {
    Il2Cpp.perform(() => {
        // frida -Ul hook.js -f com.xqc.sdklink
        // frida -Ul hook.js -f com.xqc.sdklink -o 1.txt
        log.i("main", Il2Cpp.unityVersion)
        unity_log();
        // Il2Cpp.dump();
        // hotfixDump();
        send();
        recv();
    })
}
