export namespace Game {

    export const yxz = () => {
        main();
    };
}

import "frida-il2cpp-bridge"

function main() {
    // frida -Ul hook.js -f com.xqc.sdklink
    // frida -Ul hook.js -f com.xqc.sdklink -o 1.txt
    console.log("测试输出");
}
