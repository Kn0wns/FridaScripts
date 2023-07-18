import {FSLog} from "../../FSLogger";

export namespace Crypto {
    var global_ansi = true

    export function All() {
        MD5()
        SHA1()
        CCCrypto()
        base64()
    }

    export function base64() {
        let tag = base64.name
        /*Instrumenting...
        -[NSData base64Decoded]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\base64Decoded.js"
        -[NSData base64Encoded]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\base64Encoded.js"
        -[NSData _base64RFC4648]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\_base64RFC4648.js"
        -[NSData dc_base64EncodedString]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\dc_base64EncodedString.js"
        -[NSData dcad_base64EncodedString]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\dcad_base64EncodedString.js"
        -[NSData _base64RFC4648]: Loaded handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\_base64RFC4648.js"
        -[NSData wbsdk_base64EncodedString]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\wbsdk_base64EncodedString.js"
        -[NSData AW_base64Data]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\AW_base64Data.js"
        -[NSData AW_base64]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\AW_base64.js"
        -[NSData AW_base64Safe]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\AW_base64Safe.js"
        -[NSData tl_base64String]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\tl_base64String.js"
        -[NSData _base64EncodingAsString:withOptions:]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\_base64EncodingAsString_withOptions_.js"
        -[NSData base64Encoding]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\base64Encoding.js"
        -[NSData base64EncodedDataWithOptions:]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\base64EncodedDataWithOptions_.js"
        -[NSData base64EncodedStringWithOptions:]: Auto-generated handler at "C:\\Users\\Administrator\\Desktop\\__handlers__\\NSData\\base64EncodedStringWithOptions_.js"
        Started tracing 15 functions. Press Ctrl+C to stop.
                   / TID 0x303 /
         14059 ms  -[NSData base64EncodedStringWithOptions:0x1]
         14059 ms     | -[NSData _base64EncodingAsString:0x1 withOptions:0x1]
         14063 ms  -[NSData base64EncodedStringWithOptions:0x1]
         14064 ms     | -[NSData _base64EncodingAsString:0x1 withOptions:0x1]*/

        // encode
        let NSData_base64EncodedStringWithOptions = ObjC.classes.NSData['- base64EncodedStringWithOptions:'];
        if (NSData_base64EncodedStringWithOptions != null) {
            Interceptor.attach(NSData_base64EncodedStringWithOptions.implementation, {
                onEnter: function (args) {
                    this.self = args[0];
                },
                onLeave: function (retval) {
                    let before = ObjC.classes.NSString.alloc().initWithData_encoding_(this.self, 4);
                    let after = new ObjC.Object(retval);
                    FSLog.d(tag, `-[NSData base64EncodedStringWithOptions:] before=${before}=`);  // 编码前
                    FSLog.d(tag, `-[NSData base64EncodedStringWithOptions:] after=${after}=`);    // 编码后
                }
            });
        }

        // decode
        let NSData_initWithBase64EncodedString_options = ObjC.classes.NSData['+ initWithBase64EncodedString:options:'];
        let NSData_initWithBase64EncodedData_options = ObjC.classes.NSData['+ initWithBase64EncodedData:options:'];
        base64_decode(NSData_initWithBase64EncodedString_options, '+[NSData initWithBase64EncodedString:options:]')
        base64_decode(NSData_initWithBase64EncodedData_options, '+ initWithBase64EncodedData:options:')

        function base64_decode(moduleName: { implementation: NativePointerValue; }, exportName: string) {
            if (!moduleName) return
            Interceptor.attach(moduleName.implementation, {
                onEnter: function (args) {
                    this.self = args[0];
                    this.arg2 = args[2];
                },
                onLeave: function (retval) {
                    let before = new ObjC.Object(this.arg2);
                    let after = ObjC.classes.NSString.alloc().initWithData_encoding_(this.self, 4);
                    FSLog.d(tag, `${exportName} string=${before}=`);
                    FSLog.d(tag, `${exportName} after=${after}=`);
                }
            });
        }
    }

    export function MD5() {
        Hash_hook('libcommonCrypto.dylib', 'CC_MD5')
    }

    export function SHA1() {
        Hash_hook('dyld', 'CC_SHA1')
        Hash_hook('libcommonCrypto.dylib', 'CC_SHA1')
    }

    export function CCCrypto() {
        let tag = CCCrypto.name;
        let CCCryptoAddress = Module.findExportByName('libcommonCrypto.dylib', 'CCCrypt');
        if (CCCryptoAddress == null) {
            FSLog.e(tag, "can not find CCCryptoAddress");
        } else {
            Interceptor.attach(Module.findExportByName('libcommonCrypto.dylib', 'CCCrypt') || NULL, {
                onEnter: function (args) {
                    // Save the arguments
                    this.operation = args[0]              /* kCCEncrypt or kCCDecrypt */
                    this.CCAlgorithm = args[1]            /* 可选值：kCCAlgorithmAES128、kCCAlgorithmDES、kCCAlgorithm3DES 等加密算法 */
                    this.CCOptions = args[2]              /* 选项，如 kCCOptionPKCS7Padding */
                    this.keyBytes = args[3]               /* 加密密钥 */
                    this.keyLength = args[4]              /* 密钥长度 */
                    this.ivBuffer = args[5]               /* 初始化向量 */
                    this.inBuffer = args[6]               /* 输入数据 */
                    this.inLength = args[7]               /* 输入数据长度 */
                    this.outBuffer = args[8]              /* 输出缓冲区 */
                    this.outLength = args[9]              /* 输出缓冲区大小 */
                    this.outCountPtr = args[10]           /* 输出缓冲区实际写入大小 */

                    let Algorithm = ["AES", "DES", "3DES", "CAST", "RC4", "RC2", "Blowfish"];
                    let Options = ['ECB', 'CBC', 'CFB'] // 用于表示加密和解密操作选项的位掩码（bitmask） CBC 模式下使用 PKCS7 填充(kCCOptionPKCS7Padding | kCCOptionCBCMode)
                    let Key = Array.from(new Uint8Array(this.keyBytes.readByteArray(this.keyLength.toInt32()) || new ArrayBuffer(0)))
                        .map(byte => ('00' + byte.toString(16)).slice(-2)).join('')
                    let IV = Array.from(new Uint8Array(this.ivBuffer.readByteArray(this.keyLength.toInt32()) || new ArrayBuffer(0)))
                        .map(byte => ('00' + byte.toString(16)).slice(-2)).join('')


                    FSLog.w(tag, 'CCCrypt(' +
                        'operation: ' + this.operation + ', ' +
                        'CCAlgorithm: ' + this.CCAlgorithm + ', ' +
                        'CCOptions: ' + this.CCOptions + ', ' +
                        'keyBytes: ' + this.keyBytes + ', ' +
                        'keyLength: ' + this.keyLength + ', ' +
                        'ivBuffer: ' + this.ivBuffer + ', ' +
                        'inBuffer: ' + this.inBuffer + ', ' +
                        'inLength: ' + this.inLength + ', ' +
                        'outBuffer: ' + this.outBuffer + ', ' +
                        'outLength: ' + this.outLength + ', ' +
                        'outCountPtr: ' + this.outCountPtr + ')')
                    FSLog.d(tag, `当前处于 ${Algorithm[this.CCAlgorithm.toInt32()]} ${Options[this.CCOptions.toInt32()]} ${this.operation.toInt32() ? "加密" : "解密"}`)
                    FSLog.d(tag, `Key: ${Key}`)
                    FSLog.d(tag, hexdump(this.keyBytes, {
                        length: this.keyLength.toInt32(),
                        header: false,
                        ansi: global_ansi
                    }))
                    FSLog.d(tag, `IV: ${IV}`)
                    if (!this.ivBuffer.isNull()) {
                        FSLog.d(tag, hexdump(this.ivBuffer, {
                            length: this.keyLength.toInt32(),
                            header: false,
                            ansi: global_ansi
                        }))
                    }
                },
                onLeave: function (retVal) {
                    let InBuffer = Array.from(new Uint8Array(this.inBuffer.readByteArray(this.inLength.toInt32()) || new ArrayBuffer(0)))
                        .map(byte => ('00' + byte.toString(16)).slice(-2)).join('')
                    let OutBuffer = Array.from(new Uint8Array(this.outBuffer.readByteArray(this.outCountPtr.readPointer().toInt32()) || new ArrayBuffer(0)))
                        .map(byte => ('00' + byte.toString(16)).slice(-2)).join('')
                    FSLog.d(tag, `In buffer: ${InBuffer}`)
                    FSLog.d(tag, hexdump(this.inBuffer, {
                        length: this.inLength.toInt32(),
                        header: false,
                        ansi: global_ansi
                    }))
                    FSLog.d(tag, `Out buffer: ${OutBuffer}`)
                    FSLog.d(tag, hexdump(this.outBuffer, {
                        length: this.outCountPtr.readPointer().toInt32(),
                        header: false,
                        ansi: global_ansi
                    }))
                }
            })
        }
    }

    function Hash_hook(moduleName: string, exportName: string) {
        let tag = Hash_hook.name;
        let address = Module.findExportByName(moduleName, exportName);
        if (address) {
            Interceptor.attach(address, {
                onEnter(args) {
                    this.param = args[0]
                    this.paramLen = args[1].toInt32()
                },
                onLeave(retval) {
                    let hex = hexdump(this.param, {ansi: global_ansi, length: this.paramLen, header: false})
                    let ret = hexdump(retval, {ansi: global_ansi, length: this.paramLen, header: false})
                    let ret_hex = Array.from(new Uint8Array(retval.readByteArray(16) || new ArrayBuffer(0)))
                        .map(byte => ('00' + byte.toString(16)).slice(-2)).join('')
                    FSLog.d(tag, `${exportName} retval: `)
                    FSLog.d(tag, ret)
                    FSLog.d(tag, `${exportName} params: ` + this.param.readCString())
                    FSLog.d(tag, `${exportName} params_hex : `)
                    FSLog.d(tag, hex)
                    FSLog.d(tag, `${exportName} retval_hex: ` + ret_hex)
                }
            })
        } else {
            FSLog.e("Hash_hook", `${exportName} -> can not find address`);
        }
    }
}