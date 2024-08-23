# FridaScripts
逆向相关的代码集合

> 因为平时会很收集一些有用的代码段，当代码段数量变多时，使用起来就很不便，如果写在同一个 `.js` 脚本里又会很庞大，一样不好管理，索性写成一个项目直接调用即可

> 核心原理：在 hook 代码里写直接引用文件无法使用，所以这里是通过 `frida-compile` 把 `TypeScript` 编译集成到一个 `js` 代码中。实现 `ts`、`js`混写，文件内容更改，即时编译注入

## 如何编译
```shell
$ git clone git clone https://github.com/loadkk/FridaScripts.git
$ cd FridaScripts\
$ npm install
$ frida -UFl hook.js

## 实时编译
$ npm run watch

## 手动编译
$ npm run build
```

## 如何调试
[FRIDA 调试环境搭建](https://www.52pojie.cn/thread-1363328-1-1.html)
```
$ npm run watch
$ frida -UFl hook.js --debug --runtime=v8
```
启动后会显示 Inspector 正在监听 9229 默认端口
```
Chrome Inspector server listening on port 9229
```
打开 `chrome://inspect` 点击 `Open dedicated DevTools for Node`

如果命中未断点可以回到 `chrome://inspect` 选择 `Configure...` 启用转发 `Enable port forwarding`

重复上面操作即可实现断点调试

## 推荐姿势
IDE：Pycharm、WebStorm、 VSCcode （其他 IDE 也一样）

clone 仓库后，在项目根目录创建 agent 目录（已加入 gitignore）在这里开发业务脚本

修改 main.ts 引入 agent 目录下的类

单开一个 shell 跑 npm run watch 实时编译脚本

不断修改 index 或 agent 的脚本，注入、测试，达到目的

## Refs
[GameSentry](https://www.freebuf.com/articles/others-articles/345771.html) | [仓库地址](https://github.com/GrowthEase/GameSentry) 需要修改 frida 版本 `"frida": "^14.2.8"` 此版本 `npm install` 环境总出问题

[Il2CppHookScripts runtime hook](https://github.com/axhlzy/Il2CppHookScripts/blob/ts/README.zh-CN.md) `qbdi` 添加到项目会出问题 暂时没找到原因

[frida-il2cpp-bridge](https://github.com/vfsfitvnm/frida-il2cpp-bridge)
