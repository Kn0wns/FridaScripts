# frida-ios-dump
从越狱设备中提取解密的IPA

## Change
1. 修改为中文提示
2. 优化默认配置信息, 无需端口转发
3. 适配 Windows API 调用
4. 去除依赖 `frida-tools` 避免自动更新 `frida` 版本


## Usage

 1. 在设备上安装 [frida](http://www.frida.re/)
 2. 安装所需依赖 `sudo pip install -r requirements.txt --upgrade`
 3. 执行脚本 `./dump.py [应用名称|包名]`
```
~frida-ios-dump_for_win〉python dump.py 嘟嘟牛 -P root -H 192.168.1.7
Dumping 嘟嘟牛 to C:\Users\ADMINI~1\AppData\Local\Temp
start dump /var/containers/Bundle/Application/FDAFF301-F24F-410F-9690-59D2CB91E793/DoDoNew.app/DoDoNew
------------------------------

已生成 嘟嘟牛.ipa
```

Drag to [MonkeyDev](https://github.com/AloneMonkey/MonkeyDev), Happy hacking!

## Support

Python 2.x and 3.x