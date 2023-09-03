function main(){
    Java.perform(function (){
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

setImmediate(main)