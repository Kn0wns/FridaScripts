# 作为 npm node 模块使用

## 配置参考

### package.json

```json
{
  "name": "fridascript",
  "version": "1.0.0",
  "description": "描述",
  "main": "index.js",
  "scripts": {
    "prepare": "npm run build",
    "build": "frida-compile src/main.ts -o hook.js -c",
    "watch": "frida-compile src/main.ts -o hook.js -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/frida-gum": "^16.2.0",  // 依赖
    "@types/node": "^14.14.2",
    "frida-compile": "^10.0.0"
  }
}

```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",        // 指定ECMAScript目标版本
    "lib": ["ESNext"],         // 编译过程中需要引入的库文件的列表
    "allowJs": true,           // 允许编译javascript文件
    "noEmit": true,            // 不生成输出文件
    "strict": true,            // 启用所有严格类型检查选项
    "esModuleInterop": true,   // 为了兼容 旧的 js项目，对于 import 转译规则发送变化
    "skipLibCheck": true,      // 忽略所有的声明文件（ *.d.ts）的类型检查
    "removeComments": true,    // 移除所有注释
    "baseUrl": "./"            // 解析非相对模块名的基准目录
  }
}
```

## 安装 node
```bash
sudo npm install
```

## 引用

因为在 `tsconfig.json` 中 `baseUrl` 和 `paths` 重定向了搜索路径为 `fridacontainer`，所以下面可以缩短导入路径长度。

```typescript
import {FCAnd} from "fridacontainer/FCAnd"

function main() {
    FCAnd.hook_url(true);
}
```

## 参考文章
[了不起的 tsconfig.json 指南](https://blog.csdn.net/6346289/article/details/120426715)

[frida-compile - npm](https://www.npmjs.com/package/frida-compile)

[package.json 指南](http://dev.nodejs.cn/learn/the-package-json-guide)

[package.json文件 -- JavaScript 标准参考教程（alpha）](https://javascript.ruanyifeng.com/nodejs/packagejson.html)

[tsconfig.json · TypeScript中文网 · TypeScript——JavaScript的超集](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

[编译选项 · TypeScript中文网 · TypeScript——JavaScript的超集](https://www.tslang.cn/docs/handbook/compiler-options.html)

[5分钟上手TypeScript · TypeScript中文网 · TypeScript——JavaScript的超集](https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html)

[frida调试工具构建](https://liangmc.com/archives/frida-diao-shi-gong-ju-gou-jian)