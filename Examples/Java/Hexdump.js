// @Time    : 2022-05-14 21:58
// @Author  : KKings
// @File    : Hexdump.js
// @Software: PyCharm

// 测试系统安卓8
// 地址 + 16进制数据 + Ascii编码
function hexdump(bytearry,offset,length){
  // bytearray => [B
  // offset => I
  // length => I
  var HexDump = Java.use("com.android.internal.util.HexDump")
  console.log(HexDump.dumpHexString(bytearry,offset,length))
}