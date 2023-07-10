import {FSLog} from "../../FSLogger";

export function CCCrypto() {
    let tag = CCCrypto.name;
    let CCCryptoAddress = Module.findExportByName('libcommonCrypto.dylib', 'CCCrypt');
    if (CCCryptoAddress == null) {
        FSLog.e(tag, "can not find CCCryptoAddress");
    } else {
        // Interceptor.attach(Module.findExportByName('libcommonCrypto.dylib', 'CCCrypt'), {
        //     onEnter: function (args) {
        //         // Save the arguments
        //         this.operation = args[0]
        //         this.CCAlgorithm = args[1]
        //         this.CCOptions = args[2]
        //         this.keyBytes = args[3]
        //         this.keyLength = args[4]
        //         this.ivBuffer = args[5]
        //         this.inBuffer = args[6]
        //         this.inLength = args[7]
        //         this.outBuffer = args[8]
        //         this.outLength = args[9]
        //         this.outCountPtr = args[10]
        //
        //         let CCAlgorithm_ = ["kCCAlgorithmAES128", "kCCAlgorithmDES", "kCCAlgorithm3DES", "kCCAlgorithmCAST", "kCCAlgorithmRC4", "kCCAlgorithmRC2", "kCCAlgorithmBlowfish"];
        //         let CCOptions_ = ['', 'kCCOptionPKCS7Padding', 'kCCOptionECBMode']
        //
        //         FSLog.d(tag, 'CCCrypt(' +
        //             'operation: ' + this.operation + ', ' +
        //             'CCAlgorithm: ' + this.CCAlgorithm + ', ' +
        //             'CCOptions: ' + this.CCOptions + ', ' +
        //             'keyBytes: ' + this.keyBytes + ', ' +
        //             'keyLength: ' + this.keyLength + ', ' +
        //             'ivBuffer: ' + this.ivBuffer + ', ' +
        //             'inBuffer: ' + this.inBuffer + ', ' +
        //             'inLength: ' + this.inLength + ', ' +
        //             'outBuffer: ' + this.outBuffer + ', ' +
        //             'outLength: ' + this.outLength + ', ' +
        //             'outCountPtr: ' + this.outCountPtr + ')')
        //         if (this.operation.toInt32() === 0) {
        //             // Show the buffers here if this an encryption operation
        //             FSLog.d(tag, "In buffer:")
        //             FSLog.d(tag, hexdump(this.inBuffer, {
        //                 length: this.inLength.toInt32(),
        //                 header: false,
        //                 ansi: true
        //             }))
        //             FSLog.d(tag, "Key: ")
        //             FSLog.d(tag, hexdump(this.keyBytes, {
        //                 length: this.keyLength.toInt32(),
        //                 header: false,
        //                 ansi: true
        //             }))
        //             FSLog.d(tag, "IV: ")
        //             FSLog.d(tag, hexdump(this.ivBuffer, {
        //                 length: this.keyLength.toInt32(),
        //                 header: false,
        //                 ansi: true
        //             }))
        //         }
        //     },
        //     onLeave: function (retVal) {
        //         if (this.operation.toInt32() === 1) {
        //             // Show the buffers here if this a decryption operation
        //             FSLog.d(tag, "Out buffer:")
        //             FSLog.d(tag, hexdump(this.outBuffer, {
        //                 length: Memory.readUInt(this.outCountPtr),
        //                 header: false,
        //                 ansi: true
        //             }))
        //             FSLog.d(tag, "Key: ")
        //             FSLog.d(tag, hexdump(this.keyBytes, {
        //                 length: this.keyLength.toInt32(),
        //                 header: false,
        //                 ansi: true
        //             }))
        //             FSLog.d(tag, "IV: ")
        //             FSLog.d(tag, hexdump(this.ivBuffer, {
        //                 length: this.keyLength.toInt32(),
        //                 header: false,
        //                 ansi: true
        //             }))
        //         }
        //         console.error(9527)
        //         console.log(ObjC.object(this.outBuffer))
        //         // FSLog.d(tag, "Out Buffer: ")
        //         // FSLog.d(tag, hexdump(this.outBuffer, {
        //         //     length: this.outCountPtr.toInt32(),
        //         //     header: false,
        //         //     ansi: true
        //         // }))
        //     }
        // })
    }
}