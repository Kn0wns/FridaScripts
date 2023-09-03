// Time    : 2023-03-04 16:02
// Author  : KKings
// File    : bypass_frida_map.js
// Software: WebStorm


import {FSLog} from "../../FSLogger";

export const bypass_frida_maps = () => {
    replaceMaps();
}

function readFile(fileName) {
    FSLog.d(`readFile`, "> Reading file: " + fileName);
    const JString = Java.use("java.lang.String");
    const Files = Java.use("java.nio.file.Files");
    const Paths = Java.use("java.nio.file.Paths");
    const URI = Java.use("java.net.URI");

    const pathName = "file://" + fileName;
    const path = Paths.get(URI.create(pathName));
    const fileBytes = Files.readAllBytes(path);
    return JString.$new(fileBytes);
}

const checkStr = [`gum-js-loop`, `gmain`, `linjector`, `frida-agent`, `re.frida.server`, `/data/local/tmp`, `frida`]

// FIXME 只是伪造了 maps 还没进行替换
function replaceMaps() {
    const data = readFile("/proc/self/maps");
    const saveFile = new File("/data/local/tmp/maps", "w");
    data.split("\n").forEach(function (line) {
        checkStr.forEach(v => {
            if (!line.include(v)) {
                saveFile.write(line + "\n");
            }
        })
    });
    saveFile.close();
}