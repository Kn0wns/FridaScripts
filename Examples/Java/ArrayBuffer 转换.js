// @Time    : 2022-05-14 21:59
// @Author  : KKings
// @File    : ArrayBuffer 转换.js
// @Software: PyCharm

function ab2Hex(buffer) {
    const arr = Array.prototype.map.call(new Uint8Array(buffer), function (x) {
        return ('00' + x.toString(16)).slice(-2)
    }).join(" ").toUpperCase();
    return "[" + arr + "]";
}