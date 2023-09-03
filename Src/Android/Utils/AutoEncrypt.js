/**
 * Java 层系统库加密自吐
 */
export function autoEncrypt() {
    Java.perform(function () {
        console.log('Start\n')

        // let ApiRequester = Java.use("com.upex.exchange.net.ApiRequester");
        // ApiRequester.withdraw.implementation = function (coinId, chainCoinId, amount, address, addressTag, bizSubType, assetPwd, addrAccountType, areaCode, checkValidateTypeList, hgExchangeBean, simpleSubscriber, compositeSubscription) {
        //     console.log('withdraw is called');
        //     console.log("assetPwd:",...arguments[6])
        //     let ret = this.withdraw(coinId, chainCoinId, amount, address, addressTag, bizSubType, assetPwd, addrAccountType, areaCode, checkValidateTypeList, hgExchangeBean, simpleSubscriber, compositeSubscription);
        //     console.log('withdraw ret value is ' + ret);
        //     return ret;
        // };
        //
        // var base64 = Java.use("android.util.Base64")
        // base64.encodeToString.overload('[B', 'int').implementation = function (a, b) {
        //     showStacks();
        //     console.log("base64.encodeToString: ", JSON.stringify(a));
        //     console.log("base64.encodeToString2: ", Java.use("com.android.okhttp.okio.ByteString").of(a).utf8());
        //
        //     var result = this.encodeToString(a, b);
        //     console.log("base64.encodeToString result: ", result)
        //     return result;
        // }


        function showStacks() {
            if (ISLOGSTACKS) console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        }

        function _() {
            console.log("\n================================================== ⚡ ==================================================\n")
        }

        function _log(tag, data) {
            // console.log(`[*]\t ${tag} | ${JSON.stringify({
            // "Base64": ByteString.of(data).base64(),
            // "Hex": ByteString.of(data).hex(),
            // "Utf8": ByteString.of(data).utf8()
            // })}`);
            console.log("[*]\t" + tag + " | Base64:", ByteString.of(data).base64());
            console.log("[*]\t" + tag + " | Hex:", ByteString.of(data).hex());
            console.log("[*]\t" + tag + " | Utf8:", ByteString.of(data).utf8());
        }

        function _log2(offset, len) {
            console.log(`[*]\t${JSON.stringify({"offset": offset, "len": len})}`)
        }

        /*
        * okio.ByteString okhttp 第三方库
        * com.android.okhttp.okio.ByteString okhttp 系统集成库
        * */
        const ByteString = Java.use("com.android.okhttp.okio.ByteString");

        const ISLOGSTACKS = true;      // 是否打印堆栈
        // const ISLOGSTACKS = false;      // 是否打印堆栈

        MessageDigest()       // MD5 SHA
        Mac()                 // MAC
        Cipher()              // DES 3DES(DESede.TripleDES) AES RSA_Base64 RSA_Hex
        Signature()           // Signature

        function MessageDigest() {
            const messageDigest = Java.use('java.security.MessageDigest');
            /**
             *  update
             * .overload('byte')
             * .overload('java.nio.ByteBuffer')
             * .overload('[B') 常用
             * .overload('[B', 'int', 'int') 常用
             *
             * this.getProvider().toString() 返回此消息摘要对象的提供者(AndroidOpenSSL version 1.0)
             * this.getProvider().getInfo() 返回提供程序及其服务的可读描述(Android's OpenSSL-backed security provider)
             * */
            messageDigest.update.overload('[B').implementation = function (input) {
                this.update(input);
                showStacks()
                _log(this.getAlgorithm() + " | update", input);
            }
            messageDigest.update.overload('byte').implementation = function (input) {
                this.update(input);
                showStacks()
                console.log("[*]\tMessageDigest.update('byte') is called");
            }
            messageDigest.update.overload('java.nio.ByteBuffer').implementation = function (input) {
                this.update(input);
                showStacks()
                console.log("[*]\tMessageDigest.update('java.nio.ByteBuffer') is called");
            }
            messageDigest.update.overload('[B', 'int', 'int').implementation = function (input, offset, len) {
                this.update(input, offset, len);
                showStacks()
                _log2(offset, len)
                _log(this.getAlgorithm() + " | update", input)
            }

            /**
             *  digest 加密结果
             * .overload()   最终都是调用该重载
             * .overload('[B')
             * .overload('[B', 'int', 'int')
             * */
            messageDigest.digest.overload().implementation = function () {
                var result = this.digest();
                _log(this.getAlgorithm() + " | digest", result);
                _()
                return result;
            }
            messageDigest.digest.overload('[B', 'int', 'int').implementation = function (buf, offset, len) {
                var result = this.digest(buf, offset, len);
                _log2(offset, len)
                _()
                return result;
            }
        }

        function Mac() {
            var mac = Java.use("javax.crypto.Mac");
            /**
             * init
             * .overload('java.security.Key', 'java.security.spec.AlgorithmParameterSpec')
             * .overload('java.security.Key')  常用
             * */
            mac.init.overload('java.security.Key', 'java.security.spec.AlgorithmParameterSpec').implementation = function (key, params) {
                this.init(key, params);
                showStacks();
                _log(this.getAlgorithm() + " | init Key", key.getEncoded())
            }
            mac.init.overload('java.security.Key').implementation = function (key) {
                this.init(key);
                showStacks();
                _log(this.getAlgorithm() + " | init Key", key.getEncoded())
            }
            /**
             * update
             * .overload('byte')
             * .overload('java.nio.ByteBuffer')
             * .overload('[B') 常用
             * .overload('[B', 'int', 'int')
             **/
            mac.update.overload('byte').implementation = function (input) {
                this.update(input);
                console.log("[*]\tMac.update('byte') is called");
                _log(this.getAlgorithm() + " | update", input)
            }
            mac.update.overload('java.nio.ByteBuffer').implementation = function (input) {
                this.update(input);
                console.log("[*]\tMac.update('java.nio.ByteBuffer') is called");
                _log(this.getAlgorithm() + " | update", input)
            }
            mac.update.overload('[B').implementation = function (input) {
                this.update(input);
                _log(this.getAlgorithm() + " | update", input);
            }
            mac.update.overload('[B', 'int', 'int').implementation = function (input, offset, len) {
                this.update(input, offset, len);
                _log2(offset, len)
                _log(this.getAlgorithm() + " | update", input)
            }
            /**
             * doFinal
             * .overload() 最终调用
             * .overload('[B')
             * .overload('[B', 'int')
             **/
            mac.doFinal.overload().implementation = function () {
                var result = this.doFinal();
                _log(this.getAlgorithm() + " | doFinal", result);
                return result;
            }
            mac.doFinal.overload('[B').implementation = function () {
                var result = this.doFinal(...arguments);
                _log(this.getAlgorithm() + " | doFinal", result);
                return result;
            }
            mac.doFinal.overload('[B', 'int').implementation = function () {
                var result = this.doFinal(...arguments);
                _log(this.getAlgorithm() + " | doFinal", result);
                return result;
            }
        }

        function Cipher() {
            var cipher = Java.use("javax.crypto.Cipher");
            /**
             * init
             * AES DES 3DES RSA
             * 两个参数最终都会调用带有第三个参数(java.security.SecureRandom)的方法 所以直接hook带有第三参数 四个方法
             * java.security.SecureRandom 随机数
             *
             * .overload('int', 'java.security.Key')    常用 mode,key
             * .overload('int', 'java.security.Key', 'java.security.SecureRandom')
             *
             * .overload('int', 'java.security.cert.Certificate')
             * .overload('int', 'java.security.cert.Certificate', 'java.security.SecureRandom')
             *
             * .overload('int', 'java.security.Key', 'java.security.AlgorithmParameters')
             * .overload('int', 'java.security.Key', 'java.security.AlgorithmParameters', 'java.security.SecureRandom')
             *
             * .overload('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec')   常用 mode,key,iv
             * .overload('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec', 'java.security.SecureRandom')
             * */
            cipher.init.overload('int', 'java.security.Key', 'java.security.SecureRandom').implementation = function () {
                this.init.apply(this, arguments);
                showStacks()
                if (JSON.stringify(arguments[1]).indexOf("OpenSSLRSAPrivateKey") != -1) {
                    console.log("[*]\tRSA_HEX私钥,getEncoded低版本可用,Android10版本会崩溃,Java原因所以需要做一个过滤,仅输出堆栈")
                    console.log("[*]\t私钥堆栈输出!!")
                    return
                }

                if (arguments[0] == 1) _log(this.getAlgorithm() + " | 加密模式 | init.Key", arguments[1].getEncoded());
                else if (arguments[0] == 2) _log(this.getAlgorithm() + " | 解密模式 | init.Key", arguments[1].getEncoded());
            };
            cipher.init.overload('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec').implementation = function () {
                this.init.apply(this, arguments);
                showStacks()
                if (JSON.stringify(arguments[1]).indexOf("OpenSSLRSAPrivateKey") != -1) {
                    console.log("[*]\tRSA_HEX私钥,getEncoded低版本可用,Android10版本会崩溃,Java的原因所以需要做一个过滤,仅输出堆栈")
                    console.log("[*]\t私钥堆栈输出!!")
                    return
                }

                const iv = Java.cast(arguments[2], Java.use("javax.crypto.spec.IvParameterSpec")).getIV();

                let Tag = "";
                if (arguments[0] == 1) Tag = "加密模式"
                else if (arguments[0] == 2) Tag = "解密模式"
                _log(this.getAlgorithm() + " | " + Tag + " | init.Key", arguments[1].getEncoded());
                _log(this.getAlgorithm() + " | " + Tag + " | init.iv", iv);
            }

            cipher.init.overload('int', 'java.security.Key').implementation = function () {
                this.init.apply(this, arguments);
                showStacks();
                let Tag = ""
                if (arguments[0] === 1) Tag = "加密模式"
                else if (arguments[0] === 2) Tag = "解密模式"
                _log(this.getAlgorithm() + " | " + Tag + " | init.Key", arguments[1].getEncoded());
                // console.log("[*]\tcipher.init('int', 'java.security.Key') is called");
            };
            cipher.init.overload('int', 'java.security.cert.Certificate').implementation = function () {
                this.init.apply(this, arguments);
                showStacks();
                console.log("[*]\tcipher.init('int', 'java.security.cert.Certificate') is called");
            };
            cipher.init.overload('int', 'java.security.cert.Certificate', 'java.security.SecureRandom').implementation = function () {
                this.init.apply(this, arguments);
                showStacks();
                console.log("[*]\tcipher.init('int', 'java.security.cert.Certificate', 'java.security.SecureRandom') is called");
            };
            cipher.init.overload('int', 'java.security.Key', 'java.security.AlgorithmParameters').implementation = function () {
                this.init.apply(this, arguments);
                showStacks();
                console.log("[*]\tcipher.init('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec) is called");
            };
            cipher.init.overload('int', 'java.security.Key', 'java.security.AlgorithmParameters', 'java.security.SecureRandom').implementation = function () {
                this.init.apply(this, arguments);
                showStacks();
                console.log("[*]\tcipher.init('int', 'java.security.Key', 'java.security.AlgorithmParameters', 'java.security.SecureRandom') is called");
            };
            cipher.init.overload('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec', 'java.security.SecureRandom').implementation = function () {
                this.init.apply(this, arguments);
                showStacks()
                // if (JSON.stringify(arguments[1]).indexOf("OpenSSLRSAPrivateKey") != -1) {
                //     // console.log("[*]\tRSA_HEX私钥,getEncoded低版本可用,Android10版本会崩溃,Java的原因所以需要做一个过滤,仅输出堆栈")
                //     console.log("[*]\t私钥堆栈输出!!")
                //     return
                // }
                // var iv = Java.cast(arguments[2], Java.use("javax.crypto.spec.IvParameterSpec")).getIV();
                //
                // var Tag = ""
                // if (arguments[0] == 1) Tag = "加密模式3"
                // else if (arguments[0] == 0) Tag = "解密模式3"
                // _log(this.getAlgorithm() + " | " + Tag + " | init.Key", arguments[1].getEncoded());
                // _log(this.getAlgorithm() + " | " + Tag + " | init.iv", iv);

                console.log("[*]\tcipher.init('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec', 'java.security.SecureRandom') is called");
            };

            /**
             * doFinal 结果
             * .overload()
             * .overload('[B')
             * .overload('java.nio.ByteBuffer', 'java.nio.ByteBuffer')
             * .overload('[B', 'int')
             * .overload('[B', 'int', 'int')
             * .overload('[B', 'int', 'int', '[B')
             * .overload('[B', 'int', 'int', '[B', 'int')
             * **/
            cipher.doFinal.overload('java.nio.ByteBuffer', 'java.nio.ByteBuffer').implementation = function () {
                console.log("[*]\tCipher.doFinal('java.nio.ByteBuffer', 'java.nio.ByteBuffer') is called!")
                return this.doFinal.apply(this, arguments);
            }
            cipher.doFinal.overload('[B', 'int').implementation = function () {
                console.log("[*]\tCipher.doFinal('[B', 'int') is called!");
                return this.doFinal.apply(this, arguments);
            }
            cipher.doFinal.overload('[B', 'int', 'int', '[B').implementation = function () {
                console.log("[*]\tCipher.doFinal('[B', 'int', 'int', '[B') is called!");
                return this.doFinal.apply(this, arguments);
            }
            cipher.doFinal.overload('[B', 'int', 'int', '[B', 'int').implementation = function () {
                console.log("[*]\tCipher.doFinal('[B', 'int', 'int', '[B', 'int') is called!");
                return this.doFinal.apply(this, arguments);
            }
            cipher.doFinal.overload().implementation = function () {
                var result = this.doFinal(...arguments);
                console.log("[*]\tCipher.doFinal() is called!");
                _log(this.getAlgorithm() + " | doFinal result", result);
                _();
                return result;
            }
            cipher.doFinal.overload('[B').implementation = function () {
                var result = this.doFinal(...arguments);
                _log(this.getAlgorithm() + " | doFinal params", arguments[0])
                _log(this.getAlgorithm() + " | doFinal result", result);
                _();
                return result;
            }
            cipher.doFinal.overload('[B', 'int', 'int').implementation = function () {
                var result = this.doFinal(...arguments);
                console.log("Cipher.doFinal('[B', 'int', 'int') is called!");
                console.log("[*]\toffset:", arguments[1],)
                console.log("[*]\tlen:", arguments[2])
                _log(this.getAlgorithm() + " | doFinal params", arguments[0])
                _log(this.getAlgorithm() + " | doFinal result", result);
                _();
                return result;
            }
        }

        function Signature() {
            var signature = Java.use("java.security.Signature");
            /**
             * update
             * **/
            signature.update.overload('byte').implementation = function (data) {
                this.update(data);
                showStacks()
                console.log("[*]\tSignature.update('byte') is called!");
            }
            signature.update.overload('java.nio.ByteBuffer').implementation = function (data) {
                this.update(data);
                showStacks()
                console.log("[*]\tSignature.update('java.nio.ByteBuffer') is called!");
            }
            signature.update.overload('[B').implementation = function (data) {
                this.update(data);
                showStacks()
                console.log("[*]\tSignature.update('[B') is called!");
                // _log(this.getAlgorithm() + " | update", data)
            }
            signature.update.overload('[B', 'int', 'int').implementation = function (data, offset, len) {
                this.update(data, offset, len);
                showStacks()
                _log2(offset, len)
                _log(this.getAlgorithm() + " | update", data)
            }
            signature.sign.overload().implementation = function () {
                var result = this.sign();
                _log(this.getAlgorithm() + " | sign result", result)
                _();
                return result;
            }
            signature.sign.overload('[B', 'int', 'int').implementation = function () {
                this.sign.apply(this, arguments);
                console.log("[*]\tSignature.sign('[B', 'int', 'int') is called!");
                _();
            }
        }
    })
}
