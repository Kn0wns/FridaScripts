window = global;
const CryptoJS = require('crypto-js');
window.CryptoJS = CryptoJS

const data = CryptoJS.enc.Utf8.parse('KK is data')
const key = CryptoJS.enc.Utf8.parse('1234567890123456') /* 16位key */
const iv = CryptoJS.enc.Utf8.parse('1234567890123456')/* 16位iv */

/* AES Hook */
var _AES_en = window.CryptoJS.AES.encrypt;
window.CryptoJS.AES.encrypt = (data, key, iv) => {
    var result = _AES_en(data, key, iv)
    console.log("[*]\t明文:", data.toString(CryptoJS.enc.Utf8))
    console.log("[*]\tkey:", key.toString(CryptoJS.enc.Utf8))
    console.log("[*]\tiv:", iv.iv.toString(CryptoJS.enc.Utf8))
    console.log("[*]\t密文:", result.toString())
    return result
}

/* 加密 */
var enCrypt = CryptoJS.AES.encrypt(data, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7})
var enData = enCrypt.toString()
console.log('密文:', enData)

/* 解密 */
var DeCrypt = CryptoJS.AES.decrypt(enData, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7})
console.log('明文:', DeCrypt.toString(CryptoJS.enc.Utf8))