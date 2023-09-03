window = global;
const CryptoJS = require('crypto-js');
const JSEncrypt = require('jsencrypt');
const fs = require('fs');

var _MD5 = CryptoJS.MD5;
CryptoJS.MD5 = (data) => {
    var result = _MD5(data)
    console.log('MD5 源数据: ' + data)
    console.log('MD5 结果: ' + result)
    return result
}
var _SHA1 = CryptoJS.SHA1;
CryptoJS.SHA1 = (data) => {
    var result = _SHA1(data)
    console.log('SHA1 源数据: ' + data)
    console.log('SHA1 结果: ' + result)
    return result
}

var _SHA256 = CryptoJS.SHA256;
CryptoJS.SHA256 = (data) => {
    var result = _SHA256(data)
    console.log('SHA256 源数据: ' + data)
    console.log('SHA256 结果: ' + result)
    return result
}


var data = 'a12345678'
console.log(CryptoJS.MD5('a12345678') + '')
console.log(CryptoJS.SHA1('a12345678') + '')
console.log(CryptoJS.SHA256('a12345678') + '')