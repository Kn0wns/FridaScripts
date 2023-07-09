# tsc

`tsc` 命名默认会编译整个项目所有的 `ts` 文件，也编译指定文件 `tsc test.ts` ，编译文件默认和源文件在同一文件夹下，这是因为 `tsc` 会结合 `tsconfig` 文件进行编译

`tsc -w` watch 模式监控当前项目 `ts` 文件变化立即进行编译

Tips：使用 `tsc` 命令时，后面没有任何参数才会使用 `tsconfig` 配置进行编译

# tsconfig 配置详解
```typescript
{
   // 指定需要编译文件 否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件
   "include": ["./test.ts"],
   // 指定需要编译文件 否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件
   "files": ["./src/**/*"],
   // 不编译某些文件
   "exclude": ["test.ts"],
   "compilerOptions": {
       // 只编译修改过的文件,这个时候会生成tsconfig.tsbuildinfo,下次编译的时候会进行对比只编译修改过的文件 
       "incremental": true,
       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
       "target": "es5",
       // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
       "module": "commonjs",
       /* 注意：如果未指定--lib，则会注入默认的librares列表。注入的默认库为：
       对于 --target ES5: DOM,ES5,ScriptHost
       对于 --target ES6: DOM,ES6,DOM.Iterable,ScriptHost
       TS 绝不会在您的代码中注入polyfill,所以需要你自己制定编译lib */
       "lib": ["es5", "dom", "ScriptHost", "es2015.promise"],
       // 允许编译JS
       "allowJs": true,
       /* 是否检测JS的语法,例如下面的语法编辑器会报错
       let name = 'paul';
       console.log(name.a.b) */
       "checkJs": true,
       // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
       "jsx": preserve,
       /* 如果设为true，编译每个ts文件之后会生成一个js文件和一个声明文件,
       declaration和allowJs不能同时设为true */
       "declaration": true
       // 值为true或false，指定是否为声明文件.d.ts生成map文件
       "declarationMap": true
       // 用来指定编译时是否生成.map文件
       "sourceMap": true,
       // 当module设置为 'amd' and 'system'的时候可以使用此命令,这样可以将ts文件打包到一个目录下
       "outFile":"./",
       //  outDir 编译后的文件存到到哪个目录下,默认是每一个ts文件的当前目录,,下面的配置就是把ts编译到build目录下
       "outDir": './build',
       // 下面单独介绍
       "rootDir": "./src",
       // 是否编译构建引用项目,很复杂后面介绍
       "composite": true,
       // 指定文件用来存储增量编译信息,默认是tsconfig.tsbuildinfo
       "tsBuildInfoFile": "./",
       // 编译的时候删除注释
       "removeComments": true,
       // 不生成编译文件，这个一般比较少用,这个build目录下将没有任何文件,但是会进行编译,有错误会抛出
       "noEmit": true,
       // 是否引入npm包tslib中的辅助函数,__extends等 
       "importHelpers": true,
       // 当target为'ES5' or 'ES3'时，为'for-of', spread, and destructuring'中的迭代器提供完全支持
       "downlevelIteration": true,
       // isolatedModules的值为true或false，指定是否将每个文件作为单独的模块，默认为true，它不可以和declaration同时设定
       // 不是很理解,将每一个文件作为单独模块
       "isolatedModules": true,
       /* Strict Type-Checking Options */
       // 严格模式将会打开下面的几个选项
       "strict": false, 
       /* 不允许变量或函数参数具有隐式any类型,例如
       function(name) {
           return name;
       } */
       "noImplicitAny": true,
       // null类型检测,const teacher: string = null;会报错
       "strictNullChecks": true,
       // 对函数参数进行严格逆变比较
       "strictFunctionTypes": true,
       // 严格检查bind call apply
       "strictBindCallApply": true,
       // 此规则将验证构造函数内部初始化前后已定义的属性。
       "strictPropertyInitialization": true,
       // 检测this是否隐式指定
       "noImplicitThis": true,
       // 使用js的严格模式,在每一个文件上部声明 use strict
       "alwaysStrict": true,
       /* Additional Checks */
       // 默认false,是否检测定义了但是没使用的变量
       "noUnusedLocals": true,
       // 用于检查是否有在函数体中没有使用的参数
       "noUnusedParameters": true,
       // 用于检查函数是否有返回值，设为true后，如果函数没有返回值则会提示
       "noImplicitReturns": true,
       // 用于检查switch中是否有case没有使用break跳出switch
       "noFallthroughCasesInSwitch": true,
       /* Module Resolution Options */
       // 用于选择模块解析策略，有'node'和'classic'两种类型
       "moduleResolution": "node",
       // 复杂的很 下面单独介绍这三个模块
       "baseUrl": './'
       "paths": {},                   
       "rootDirs": [],
       /* typeRoots用来指定声明文件或文件夹的路径列表，如果指定了此项，则只有在这里列出的声明文件才会被加载 */
       typeRoots: [],
       // types用来指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载进来
       types:[],
       // 用来指定允许从没有默认导出的模块中默认导入 
       "allowSyntheticDefaultImports": true, 
       // 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性
       "esModuleInterop": true ,
       // 不把符号链接解析为真实路径，具体可以了解下webpack和node.js的symlink相关知识
       "preserveSymlinks": true,
       "allowUmdGlobalAccess": true,
       
       // sourceRoot用于指定调试器应该找到TypeScript文件而不是源文件的位置，这个值会被写进.map文件里
       "sourceRoot": '',
       // mapRoot用于指定调试器找到映射文件而非生成文件的位置，指定map文件的根路径，该选项会影响.map文件中的sources属性
       "mapRoot",
       // inlineSourceMap指定是否将map文件内容和js文件编译在一个同一个js文件中，如果设为true,则map的内容会以//#soureMappingURL=开头，然后接base64字符串的形式插入在js文件底部
       "inlineSourceMap": true,
       // inlineSources用于指定是否进一步将ts文件的内容也包含到输出文件中
       "inlineSources": true,
       
       // experimentalDecorators用于指定是否启用实验性的装饰器特性
       "experimentalDecorators": true,
       
       // emitDecoratorMetadata用于指定是否为装上去提供元数据支持，关于元数据，也是ES6的新标准，可以通过Reflect提供的静态方法获取元数据，如果需要使用Reflect的一些方法，需要引用ES2015.Reflect这个库
       "emitDecoratorMetadata": true,
       // compileOnSave的值是true或false，如果设为true，在我们编辑了项目中的文件保存的时候，编辑器会根据tsconfig.json中的配置重新生成文件，不过这个要编辑器支持
       "compileOnSave": true,
       // 很复杂 下面介绍
       "references":[]",
   }
}
```

# rootDir
```typescript
// 假设我的目录结构如下
-- src
    version1
        test.ts
    version2
        demo.ts
// 如果我们设置 "rootDir": "./src",那么我们的编译后的文件结构如下,需要注意的是项目中除了src目录中,其他地方不能有ts文件了
--build
    version1
        test.ts
    version2
        demo.ts
```

# strict 严格模式详解

### noImplicitAny
```typescript
// Parameter 'name' implicitly has an 'any' type
function getName (name) {
    return name;
}
// 如果确定为name为any,也必须显式的制定
function getName1 (name: any) {
    return name;
}
```

### noImplicitThis
```typescript
// 不允许this上下文隐式定义
function uppercaseLabel () {
    return this.label.toUpperCase()
}

const config = {
    label: 'foo-config',
    uppercaseLabel
}
config.uppercaseLabel();

// 修改后的代码为
interface MyConfig {
    label: string
    uppercaseLabel: (params: void) => string
}

const config: MyConfig = {
    label: 'foo-config',
    uppercaseLabel () {
      return this.label.toUpperCase()
    }
}
```

### strictPropertyInitialization
```typescript
// 此规则将验证构造函数内部初始化前后已定义的属性。
// 必须要确保每个实例的属性都有初始值，可以在构造函数里或者属性定义时赋值
// Property 'username' has no initializer and is not definitely assigned in the constructor.
class User {
    private username: string;
}
  
const user = new User();
  
const username = user.username.toLowerCase();

// 第一种修改方式为username指定类型为string或者undefined
class User {
    private username: string | undefined;
}
  
const user = new User();
// 第二种方式是创建实例的时候初始化值
class User {
   constructor (public username: string) {}
}
// 第三种方式是使用断言明确告诉TS我知道自己在干嘛
const user = new User('paul');
    class User {
    username! : string;
}
const user = new User();
const username = user.username.toLowerCase();
```

### strictBindCallApply
```typescript
/* 此函数在TS中会报错,Argument of type '[number, number, number]' is not
assignable to parameter of type '[number, number]'.
Types of property 'length' are incompatible */
function sum (num1: number, num2: number) {
    return num1 + num2
}
sum.apply(null, [1, 2, 3]);
// 可以使用...运算符和reduce函数修改
function sum(...args: number[]) {
    return args.reduce<number>((total, num) => total + num, 0)
}
  
sum.apply(null, [1, 2, 3])
```

### strictFunctionTypes
```typescript
// 该规则将检查并限制函数类型参数是逆变而非双变,因为对于逆变类型的接口，TS是允许双变的
declare let f1: (x: Animal) => void;
declare let f2: (x: Dog) => void;
declare let f3: (x: Cat) => void;
f1 = f2;  // 启用 --strictFunctionTypes 时错误   
f2 = f1;  // 正确
f2 = f3;  // 错误

interface Animal {
    Eat(): void
}

interface Dog extends Animal{
    Bark():void
}

interface Cat extends Animal{
    Meow():void
}

interface Comparer<T> {
    compare: (a: T, b: T) => number;
}

declare let animalComparer: Comparer<Animal>;
declare let dogComparer: Comparer<Dog>;

animalComparer = dogComparer;  // 启用 --strictFunctionTypes 时错误
dogComparer = animalComparer;  // 正确
```

# 模块解析baseUrl
```typescript
// 假设我们路径如下,此时我们在test.ts中引用 import test2 from '../test2',
-- src
version1
    test.ts
version2
    demo.ts
test2.ts
// 如果我们设置"baseUrl": "./src" 那么我们在ts中引入test2可以写为
import test2 from 'test2',需要注意的是只有我们引用的是绝对路径的时候才会使用baseUrl去解析文件
```

# 路径映射(path)
```typescript
// path是相对于baseUrl更复杂的路径映射
// 如果我们tsconfig使用如下配置
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "*": [
        "*",
        "version2/*"
      ]
    }
}
// 我们的项目目录如下,此时我们在test.ts中引用 import test2 from 'test2',
// 首先匹配 baseUrl/test2如果找到则停止否则开始寻找 baseUrl/version2/test2
-- src
version1
    test.ts
version2
    demo.ts
test2.ts
```

# 虚拟目录rootDirs
```typescript
// 如果我们tsconfig使用如下配置, 这个时候我们生成了一个虚拟的根目录,这个根目录下存放了version2,version3目录下文件
{
  "compilerOptions": {
    "rootDirs": [
      "src/version2",
      "src/version3",
    ],
}

// 我们的项目目录如下,此时我们在test.ts中引用demo就可以这样使用了 import demo from './demo',
-- src
version1
    test.ts
version2
    demo.ts
test2.ts
```

# 函数的导入导出
```typescript
// 常见的导出语句：
// 普通导出
export { something1, something2, ..., somethingN };
export { something1 as rename1, something2 as rename2, ..., somethingN as renameN };
export let something = '100';
export function func() {/* some actions here */ };

// 默认导出
export default something;
export default { something1, something2, ..., somethingN };
export default let something = '100';
export default function func() {/* some actions here */ };

// 重新导出
export { something1, something2, ..., somethingN } from 'modulename';
export { something1 as rename1, something2 as rename2, ..., somethingN as renameN } from 'modulename';
export * from 'modulename';

// 兼容CommonJS和AMD的导出
export = { something1, something2, ..., somethingN };
export = something;

// ------------------------------------------------------------------------------------------------------------
    
// 常见的导入语句：
// 普通导入
import { something1, something2, ..., somethingN } from 'modulename';
import { something1 as rename1, something2 as rename2, ..., somethingN as renameN } from 'modulename';

// 默认导入
import theNewModuleNameYouLike from 'modulename';

// 导入全部
import * as theNameYouLike from 'modulename';

// 兼容CommonJS和AMD的导入
import theNewModuleNameYouLike = require('modulename');
```