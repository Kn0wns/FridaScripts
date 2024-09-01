import "frida-il2cpp-bridge"
import {FSLog as log} from "../FSLogger";

export const xjskp = () => main()

// Il2Cpp.corlib 是指 mscorlib 程序集

function unity_log() {
    const coreModule = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
    const debug = coreModule.class('UnityEngine.Debug');
    if (debug) {
        debug.method("Log", 1).implementation = function (message) {
            log.d("unity_log", `${message}`)
            this.method("Log", 1).invoke(message);
        }

        // 与 log.d 基本相同
        debug.method("LogError", 1).implementation = function (message) {
            log.e("unity_log", `${message}`)
            this.method("Log", 1).invoke(message);
        }

        // 与 log.d 相同
        debug.method("LogWarning", 1).implementation = function (message) {
            log.w("unity_log", `${message}`)
            this.method("Log", 1).invoke(message);
        }
    }

    // const logger = coreModule.class('UnityEngine.Logger');
    // if (logger) {
    //     logger.method("Log", 1).implementation = function (message) {
    //         log.i("unity_log", `${message}`)
    //         this.method("Log", 1).invoke(message);
    //     }
    // }

    // Il2Cpp.trace(true)
    //     .assemblies(Il2Cpp.domain.assembly("UnityEngine.CoreModule"))
    //     .filterMethods(method => method.name.toLowerCase().includes("log"))
    //     .and()
    //     .attach();
}

function _log() {
    let DLogger = Il2Cpp.domain.assembly("GameLogic").image.class("T5Game.DLogger")
    // static System.Void Warning(System.String message, System.Object[] args); // 0x014a1864
    // static System.Void Fatal(System.String message, System.Object[] args); // 0x014af4c0
    // static System.Void EditorFatal(System.String message, System.Object[] args); // 0x014a5444
    // static System.Void EditorWarning(System.String message, System.Object[] args); // 0x014b50dc
    // static System.Void Log(T5Game.DLogLevel level, System.String msg, System.Object[] args); // 0x014b4910
    let _log = DLogger.method("Log")
    _log.implementation = function (level, msg, args) {
        log.d("DLogger", `${level} ${msg} ${args}`)
        return this.method("Log").invoke(level, msg, args);
    }
}

function unpackBuildCSMsg(data) {
    // CSPkgHead
    // System.UInt16 Magic; // 0x10
    // System.UInt16 Cmd; // 0x12
    // System.UInt32 PkgLen; // 0x14
    // System.UInt16 Ver; // 0x18
    // System.UInt32 Echo; // 0x1c
    // System.UInt32 SvrTime; // 0x20
    // let CSPkgHead = data.readPointer()
    let bytes_head = data.add(0x10).readPointer().add(0x10).readByteArray(32)
    let memoryStream = new DataView(bytes_head);
    let Magic = memoryStream.getUint16(0, true);  // 12867
    let Cmd = memoryStream.getUint16(2, true);
    let PkgLen = memoryStream.getUint32(4, true);
    let Ver = memoryStream.getUint16(8, true);
    let Echo = memoryStream.getUint32(12, true);
    let SvrTime = memoryStream.getUint32(16, true);

    // class net.CSPkgBody : System.Object
    // net.CSHeatBeatReq HeatBeatReq; // 0x10
    // net.CSHeatBeatRes HeatBeatRes; // 0x18
    // let bytes_body = data.add(0x18).readPointer().add(0x10).readByteArray(16)
    // let bytes_body = data.add(0x18).readPointer().add(0x10).readPointer()
    // console.log(hexdump(bytes_body));
    let head = `Magic:${Magic} Cmd:${Cmd} PkgLen:${PkgLen} Ver:${Ver} Echo:${Echo} SvrTime:${SvrTime}`
    return head
}

function SR() {
    // BuildCSMsg -> SendCSMsg -> DoSendData -> ? -> Send
    // BuildCSMsg 返回值等同于 SendCSMsg1/4 的参数
    // let ProtoUtil = Il2Cpp.domain.assembly("GameLogic").image.class("T5Game.ProtoUtil")
    // let BuildCSMsg = ProtoUtil.method("BuildCSMsg");
    // BuildCSMsg.implementation = function (msg) {  // static net.CSPkg BuildCSMsg(System.Int32 cmdID); // 0x015facdc
    //     let ret = this.method("BuildCSMsg").invoke(msg);
    //     // log.d("BuildCSMsg1", `${msg} ${hexdump(ret)}`)  // 心跳 20009 | FriendDataReq 13001/13012
    //     // log.d("BuildCSMsg2", `${msg} ${hexdump(ret.handle.add(0x10).readPointer().add(0x10)), {length: 32}} `)  // 心跳 20009 | FriendDataReq 13001/13012
    //     let unpackBuff = unpackBuildCSMsg(ret.handle);  // 这里长度还没赋值
    //     log.d("BuildCSMsg", `${msg} | ${unpackBuff}`)  // 心跳 20009 | FriendDataReq 13001/13012
    //     return ret
    // }

    let tcp = Il2Cpp.domain.assembly("GameNative").image.class("T5Game.ClientTcpSocket")
    let Send = tcp.method("Send");
    let Recv = tcp.method("Recv");  // 好像没走该逻辑
    // System.Boolean Send(System.Byte[] data, System.Int32 offset, System.Int32 len); // 0x01852370
    // System.Int32 Recv(System.Byte[] buf, System.Int32 iOffset, System.Int32 maxSize); // 0x01852390
    // Send.implementation = function (buf, offset, len) {
    //     let ret = this.method("Send").invoke(buf, offset, len);
    //     log.d("Send", `${len} ${hexdump(buf.elements, {length: len})}`)
    //     return ret
    // }
    // Recv.implementation = function (buf, iOffset, maxSize) {
    //     let ret = this.method("Recv").invoke(buf, iOffset, maxSize);
    //     if (iOffset > 0) {  // 2/3w
    //         // 这里会有超大的 Recv 所以做一下过滤
    //         log.d("Recv", `${iOffset} ${buf.length} ${maxSize} ${hexdump(buf.elements, {length: iOffset > 200 ? 200 : iOffset, header: false})}`)  // 心跳 20009 | FriendDataRes 13001/13012
    //     }
    //     return ret
    // }

    // 这里返回就是加密数据  调用的就是 Send
    /*let NetClient = Il2Cpp.domain.assembly("GameNative").image.class("T5Game.NetClient");
    // let SendMsg = NetClient.method("SendMsg");
    let EncTdrBuff = NetClient.method("EncTdrBuff");
    // Il2Cpp.trace(true).methods(SendMsg).and().methods(EncTdrBuff).and().attach();
    // System.Int32 EncTdrBuff(System.Byte[] tdrBuff, System.Int32 tdrBuffLen, System.Byte[] encBuff); // 0x01997830
    EncTdrBuff.implementation = function (tdrBuff, tdrBuffLen, encBuff) {
        log.d("EncTdrBuff-1", `${tdrBuffLen} ${hexdump(tdrBuff.elements, {length: tdrBuffLen})}`)
        let ret = this.method("EncTdrBuff").invoke(tdrBuff, tdrBuffLen, encBuff);
        log.d("EncTdrBuff-2", `${ret} ${hexdump(encBuff.elements, {length: ret})}`)
        return ret
    }*/

    // class T5Game.GameClientEventHandle.OnRecvData : System.MulticastDelegate 找不到函数
    // let kOnRecvData = Il2Cpp.domain.assembly("GameBase").image.class("T5Game.GameClientEventHandle.OnRecvData");
    // Il2Cpp.trace().classes(kOnRecvData).and().attach();

    // System.Boolean OnRecvData(ProtoBase.PbReadBuf data); // 0x01606bc4
    let GameClient = Il2Cpp.domain.assembly("GameLogic").image.class("T5Game.GameClient");
    // System.Boolean OnRecvData(ProtoBase.PbReadBuf data); // 0x01606bc4
    let OnRecvData = GameClient.method("OnRecvData");
    OnRecvData.implementation = function (data) {
        let ret = this.method("OnRecvData").invoke(data);
        // log.d("OnRecvData", `${ret} ${hexdump(data)})`)
        log.d("OnRecvData", `${ret} ${data.method("getTotalSize").invoke()}`)
        return ret
    }
    // il2cpp:
    // 0x01606bc4+0x000 T5Game.GameClient::OnRecvData
    // 0x01263fe8+0x078 T5Game.GameClientFactoryImp::Update
    // 0x024c371c+0x048 UnityEngine.Rendering.OnDemandRendering::GetRenderFrameInterval
    Il2Cpp.backtrace(Backtracer.FUZZY).methods(OnRecvData).and().attach();
}

function loadSoList() {
    // dlopen地址  监控So加载名 Hook方法
    function hook_dlopen(addr) {
        Interceptor.attach(addr, {
            onEnter: function (args) {
                let soName = args[0].readCString();
                if (soName && soName.includes("il2cpp")) log.w(`dlopen`, `${soName}`)
                else log.i(`dlopen`, `${soName}`)
            }
        })
    }

    hook_dlopen(Module.findExportByName(null, "dlopen"));
    hook_dlopen(Module.findExportByName(null, "android_dlopen_ext"));
}

function xxtea_key() {
    let NetClient = Il2Cpp.domain.assembly("GameNative").image.class("T5Game.NetClient");
    let SetSimpleEncKey = NetClient.method("SetSimpleEncKey");
    let SetEncryptKey = NetClient.method("SetEncryptKey");
    let GetEncodeKey = NetClient.method("GetEncodeKey");
    // System.Void SetSimpleEncKey(System.UInt32 key); // 0x0199718c
    // System.Void SetEncryptKey(System.String key); // 0x01997208
    Il2Cpp.trace(true)
        .methods(SetSimpleEncKey).and()
        .methods(SetEncryptKey).and()
        .methods(GetEncodeKey).and()
        .attach();
}

function xxtea_enc() {
    let FastXXTEA = Il2Cpp.domain.assembly("DodGameLib").image.class("FastXXTEA")
    // FastXXTEA.method("DexxV2")
    // Il2Cpp.trace().classes(FastXXTEA).filterMethods(m => m.name.includes("xx")).and().attach();
    let DoxxV2 = FastXXTEA.method("DoxxV2");
    let DexxV2 = FastXXTEA.method("DexxV2");
    // static System.Byte[] DoxxV2(System.Byte[] textData, System.Int32 iStartPos, System.Int32 iLength, System.UInt32[] k); // 0x013a8ebc
    // static System.Byte[] DexxV2(System.Byte[] textData, System.Int32 iStartPos, System.Int32 iLength, System.UInt32[] k); // 0x013a94ac
    // FastXXTEA__DoxxV2(encBuff, 6, encBuffLen, EncodeKey, 0LL);
    // DoxxV2.implementation = function (textData, iStartPos, iLength, k) {
    //     log.d("DoxxV2-1", `iLength:${iLength} iStartPos:${iStartPos} k:${k} textData:${hexdump(textData.elements, {length: iLength + 6})}`)
    //     let ret = this.method("DoxxV2").invoke(...arguments);
    //     log.d("DoxxV2-2", `iLength:${iLength} iStartPos:${iStartPos} k:${k} textData:${hexdump(textData.elements, {length: iLength + 6})}`)
    //     return ret
    // }
    DexxV2.implementation = function (textData, iStartPos, iLength, k) {
        // iStartPos 固定值为6
        // k 就是密匙 doKjILyxgame#83& [1783328612,2021215305,1701667175,640890915]
        log.d("DexxV2-1", `iLength:${iLength} textData:${hexdump(textData.elements, {length: iLength + 6})}`)
        let ret = this.method("DexxV2").invoke(...arguments);
        log.d("DexxV2-2", `iLength:${iLength} textData:${hexdump(textData.elements, {length: iLength + 6})}`)
        return ret
    }
    Il2Cpp.backtrace(Backtracer.FUZZY).methods(DexxV2).and().attach();
    Il2Cpp.backtrace(Backtracer.ACCURATE).methods(DexxV2).and().attach();
}

function tryHook() {
    // let EventLogReport = Il2Cpp.domain.assembly("GameNative").image.class("T5Game.EventLogReport")
    // let CheckFirstReport = EventLogReport.method("CheckFirstReport", 1);
    // // System.Boolean CheckFirstReport(System.String eventName);
    // CheckFirstReport.implementation = function (eventName) {
    //     log.d("CheckFirstReport", `${eventName}`)
    //     return this.method("CheckFirstReport", 1).invoke(eventName);
    // }

    /*let ClientWebSocket = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("T5Game.ClientWebSocket")
    let ClientTcpSocket = Il2Cpp.domain.assembly("GameNative").image.class("T5Game.ClientTcpSocket")
    Il2Cpp.trace()
        .classes(ClientWebSocket)
        .filterMethods(m => m.name.includes("Send") || m.name.includes("Recv"))
        .and()
        .classes(ClientTcpSocket)
        .filterMethods(m => m.name.includes("Send") || m.name.includes("Recv"))
        .and()
        .attach();*/
}

// com.xjskp.tv.tgb
function main() {
    Il2Cpp.perform(() => {
        log.i(Il2Cpp.unityVersion, JSON.stringify(Process.findModuleByName("libil2cpp.so")))
        unity_log();
        _log();
        // Il2Cpp.dump();
        tryHook();
        SR();
        xxtea_key();
        xxtea_enc();
    })
}
