function initConsole() {
    let Color = {
        RESET: "\x1b[39;49;00m", Black: "0;01", Blue: "4;01", Cyan: "6;01", Gray: "7;11",
        "Green": "2;01", Purple: "5;01", Yellow: "3;01", Red: "1;01"
    }
    let LightColor = {
        RESET: "\x1b[39;49;00m", Black: "0;11", Blue: "4;11", Cyan: "6;11", Gray: "7;01",
        "Green": "2;11", Purple: "5;11", Red: "1;11", Yellow: "3;11"
    }
    let colorPrefix = '\x1b[3'
    let colorSuffix = 'm'
    Object.keys(Color).forEach(function (c) {
        if (c === "RESET") return
        console[c] = function (message) {
            console.log(colorPrefix + Color[c] + colorSuffix + "[*]\t" + message + Color.RESET);
        }
        console["Light" + c] = function (message) {
            console.log(colorPrefix + LightColor[c] + colorSuffix + "[*]\t" + message + Color.RESET)
        }
    })
}

function findOkhttpClass() {
    Java.perform(function () {
        let Modifier = Java.use("java.lang.reflect.Modifier")   // 反射框架的类 获取当前类的一些属性(class、method、field)
        let okhttp3_class = [];


        /*  okhttp一共有3个混淆类需要我们定位。
            okhttp3.CertificatePinner : 一个内部类,三个接口,无继承
            okhttp3.OkHttpClient$Builder
        */

        /*  包名下的Okhttp3 不能被混淆 所以不带okhttp3的直接排除 (不是十分确定) */
        Java.enumerateLoadedClassesSync().forEach(v => {
            if (v === "okhttp3.OkHttpClient$Builder") {
                OkhttpClientClassName = "okhttp3.OkHttpClient$Builder"
            } else if (v === "okhttp3.CertificatePinner") {
                CertificatePinnerClassName = "okhttp3.CertificatePinner"
            }
            if (v.startsWith("okhttp3") && v.split(".").length === 2) {
                okhttp3_class.push(v)
            }
        })

        okhttp3_class.forEach(v => {
            if (OkhttpClientClassName === "" && is_okhttpClient(v)) {
                OkhttpClientClassName = v;
            } else if (CertificatePinnerClassName === "" && is_CertificatePinner(v)) {
                CertificatePinnerClassName = v;
            }
        })


        // 输出日志
        let log;
        if (OkhttpClientClassName === "" || CertificatePinnerClassName === "") {
            log = console.Red
            log("Can't find the okhttp class")
            log("============================")
        } else {
            log = console.Green
        }

        log("Found Class:" + okhttp3_class.length)
        log("Found OkhttpClient:" + OkhttpClientClassName)
        log("Found CertificatePinner:" + CertificatePinnerClassName)

        function is_okhttpClient(clazz) {
            let clz = Java.use(clazz);
            let interfaces = clz.class.getInterfaces();  // 获取类实现接口 返回数组
            const len = interfaces.length
            if (len < 2) return false                // implements Cloneable, Call.Factory, WebSocket.Factory 实现接口少于2的也不行
            for (let i = 0; i < len; i++) {
                // public class OkHttpClient implements Cloneable, Call.Factory, WebSocket.Factory
                if (interfaces[i].getName().indexOf("Cloneable") === -1 && interfaces[i].getName().indexOf("$") === -1) return false
            }
            if (clz.class.getDeclaredClasses().length === 0) return false // 获取内部类数量 okhttp3.OkHttpClient有一个内部类
            if (clz.class.getSuperclass().getName() !== 'java.lang.Object') return false   // okhttp3.OkHttpClient没有继承其他类 所以他的父类为object
            return true;
        }

        function is_CertificatePinner(clazz) {
            if (clazz.indexOf("$") > 0) return false // 不是内部类
            let clz = Java.use(clazz)
            if (clz.class.isInterface()) return false  // 不是接口
            if (clz.class.getInterfaces().length > 0) return false  // 没有实现接口
            if (clz.class.getDeclaredClasses().length < 1) return false // 2个内部类
            if (clz.class.getSuperclass().getName() !== "java.lang.Object") return false // 无继承 父类为object
            if (!Modifier.isFinal(clz.class.getModifiers())) return false   // 是一个final类

            // 判断方法参数
            let flag = false
            let methods = clz.class.getDeclaredMethods()    // 获取所有方法
            for (let i = 0; i < methods.length; i++) {
                if (methods[i].getParameterCount() < 1) continue    // 如果参数小于1 迭代下一个方法
                if (methods[i].getParameterTypes()[0].getName() === "java.security.cert.Certificate") {  // 是否存在该方法 public static String pin(Certificate certificate){}
                    flag = true
                    break
                }
            }
            if (!flag) return false

            // 判断字段
            flag = false
            let fields = clz.class.getDeclaredFields()  // 获取所有字段
            for (let k = 0; k < fields.length; k++) {
                if (fields[k].getType().getName() === "java.util.Set") {    // 判断是否包含set集合 private final Set<Pin> pins;
                    flag = true
                    break
                }
            }
            return flag;
        }
    });
}

function hookAllOverloads(targetClass, targetMethod, parameter, flag) {
    Java.perform(function () {
        let targetClassMethod = targetClass + '.' + targetMethod;
        let hook = Java.use(targetClass);
        let overloadCount = hook[targetMethod].overloads.length;
        for (let i = 0; i < overloadCount; i++) {
            hook[targetMethod].overloads[i].implementation = function () {
                if (flag) {
                    arguments[0] = parameter
                    return this[targetMethod].apply(this, arguments);
                }
            }
        }
    });
}

function hook() {
    Java.perform(function () {
        Java.use(CertificatePinnerClassName).class.getDeclaredMethods().forEach(method => {
            if (method.getParameterCount() !== 2) return
            let secondParameterTypeName = method.getParameterTypes()[1].getName()    /* 取第二个参数类型名称 */
            if (secondParameterTypeName === "java.util.List" || secondParameterTypeName === "[Ljava.security.cert.Certificate;") {
                hookAllOverloads(CertificatePinnerClassName, method.getName(), "", "");
                console.Purple("check:" + method.getName() + " Hooking!!")
            }
        })


        /* SSLContext.init hook TrustAllManager 注册类 */
        let TrustAllManagerClass = Java.registerClass({
            name: "TrustAllManager",
            implements: [Java.use("javax.net.ssl.X509TrustManager")],
            methods: {
                checkClientTrusted(chain, authType) {
                    console.Cyan("checkClientTrusted Hooking!!")
                },
                checkServerTrusted(chain, authType) {
                    console.Cyan("checkServerTrusted Hooking!!")
                },
                getAcceptedIssuers() {
                    return [];
                },
            }
        })
        let trustAllManagerHandle = TrustAllManagerClass.$new()
        let sslContext = Java.use("javax.net.ssl.SSLContext").getInstance("TLS")
        sslContext.init(null, Java.array("Ljavax.net.ssl.X509TrustManager;", [trustAllManagerHandle]), null)

        /* HostnameVerify 注册类 */
        let MyHostnameVerify = Java.registerClass({
            name: "MyHostnameVerify",
            implements: [Java.use("javax.net.ssl.HostnameVerifier")],
            methods: {
                verify(hostname, session) {
                    console.Yellow("verify:" + hostname)
                    return true
                }
            }
        })

        /* 获取所有方法迭代 */
        Java.use(OkhttpClientClassName).class.getDeclaredMethods().forEach(method => {
            if (method.getParameterCount() === 0) return /* 方法没有参数直接返回 */
            let firstParameterTypeName = method.getParameterTypes()[0].getName()    /* 获取第一个参数类型名称 */
            let methodName = method.getName()
            switch (firstParameterTypeName) {
                case "javax.net.ssl.SSLSocketFactory":      // .sslSocketFactory()  证书链校验 SSLContext.init 重载
                    let sslSocketFactory = sslContext.getSocketFactory()
                    hookAllOverloads(OkhttpClientClassName, methodName, sslSocketFactory, true)
                    console.Blue("SSLSocketFactory:" + methodName + "  Hooking!!")
                    break;
                case "javax.net.ssl.HostnameVerifier":      // .hostnameVerifier() true
                    let myHostnameVerifyHandle = MyHostnameVerify.$new()
                    hookAllOverloads(OkhttpClientClassName, methodName, myHostnameVerifyHandle, true)
                    console.Yellow("HostnameVerifier:" + methodName + "  Hooking!!")
                    break;
                default:
                    break;
            }

        })


    });
}

function saveCertificate() {
    Java.perform(function () {
        function storeP12(pri, p7, p12Path, p12Password) {
            let X509Certificate = Java.use("java.security.cert.X509Certificate")
            let p7X509 = Java.cast(p7, X509Certificate);
            let chain = Java.array("java.security.cert.X509Certificate", [p7X509])
            let ks = Java.use("java.security.KeyStore").getInstance("PKCS12", "BC");
            ks.load(null, null);
            ks.setKeyEntry("client", pri, Java.use('java.lang.String').$new(p12Password).toCharArray(), chain);
            try {
                let out = Java.use("java.io.FileOutputStream").$new(p12Path);
                ks.store(out, Java.use('java.lang.String').$new(p12Password).toCharArray())
            } catch (exp) {
                console.log(exp)
            }
        }

        //在服务器校验客户端的情形下，帮助dump客户端证书，并保存为p12的格式，证书密码为r0ysue
        Java.use("java.security.KeyStore$PrivateKeyEntry").getPrivateKey.implementation = function () {
            let result = this.getPrivateKey()
            let packageName = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext().getPackageName();
            storeP12(this.getPrivateKey(), this.getCertificate(), '/sdcard/Download/' + packageName + '.p12', '123456');
            console.log("dumpClinetCertificate=>" + '/sdcard/Download/' + packageName + '.p12' + '   pwd: 123456');
            return result;
        }
        Java.use("java.security.KeyStore$PrivateKeyEntry").getCertificateChain.implementation = function () {
            let result = this.getCertificateChain()
            let packageName = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext().getPackageName();
            storeP12(this.getPrivateKey(), this.getCertificate(), '/sdcard/Download/' + packageName + '.p12', '123456');
            console.log("dumpClinetCertificate=>" + '/sdcard/Download/' + packageName + '.p12' + '   pwd: 123456');
            return result;
        }
    })
}

let OkhttpClientClassName = ""
let CertificatePinnerClassName = ""

setImmediate(function () {
    initConsole()
    findOkhttpClass()
    hook()
    //saveCertificate()
});