function getParams(username, passward) {
    var result;
    Java.perform(function () {

        var time = new Date().getTime();
        var signData = 'equtype=ANDROID&loginImei=Android352689082129358&timeStamp=' +
            time + '&userPwd=' + passward + '&username=' + username + '&key=sdlkjsdljf0j2fsjk';
        var Utils = Java.use('com.dodonew.online.util.Utils');
        var sign = Utils.md5(signData).toUpperCase();
        // console.log('sign: ', sign);

        var encryptData = '{"equtype":"ANDROID","loginImei":"Android352689082129358","sign":"' +
            sign + '","timeStamp":"' + time + '","userPwd":"' + passward + '","username":"' + username + '"}';
        var RequestUtil = Java.use('com.dodonew.online.http.RequestUtil');
        var Encrypt = RequestUtil.encodeDesMap(encryptData, '65102933', '32028092');
        // console.log('Encrypt: ', Encrypt);
        result = Encrypt;

    });
    return result;
}

function deCipher(CipherText) {
    // 响应解密
    var retval = ""
    Java.perform(function () {
        // 主动调用
        var desKey = "65102933"
        var desIv = "32028092"
        retval = Java.use('com.dodonew.online.http.RequestUtil').decodeDesJson(CipherText, desKey, desIv)
    })
    return retval
}

rpc.exports = {
    getparams: getParams,
    decipher: deCipher
};