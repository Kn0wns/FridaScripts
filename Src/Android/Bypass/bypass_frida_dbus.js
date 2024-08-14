import {FSLog} from "../../FSLogger";

// 等同于 ./frida-server -l 0.0.0.0:26151
export const bypass_frida_dbus = () => {
    let connect = Module.findExportByName(null, "connect");
    if (!connect) {
        FSLog.e("bypass_frida_dbus", "connect is null");
        return;
    }
    Interceptor.attach(connect, {
        onEnter: function (args) {
            let arg = args[1];
            let port = arg.add(0x2).readUShort();
            if (port === 41577 /*|| port === 35421*/) {  // A269 > 41577
                arg.add(0x2).writeUShort(26151);  // 修改默认端口 27042(69A2大端) > 26151
                FSLog.w("bypass_frida_dbus", `端口号${port}已被修改为26151`);
            }
        }
    })
}
