import {FSLog} from "../../FSLogger";

export namespace Network {
    export function bypass_VPN() {
        let tag = bypass_VPN.name
        Interceptor.attach(Module.findExportByName('CFNetwork', 'CFNetworkCopySystemProxySettings') || NULL, {
            onLeave: function (retval) {
                // console.log(Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
                // console.warn(DebugSymbol.fromAddress(this.returnAddress));
                FSLog.w(tag, 'CFNetworkCopySystemProxySettings is call')
                const NSMutableDictionary = ObjC.classes.NSMutableDictionary;
                const proxySettings = NSMutableDictionary.dictionary();
                const NSMuArray = ObjC.classes.NSMutableArray.array();
                NSMuArray.addObject_("*.local");
                NSMuArray.addObject_("169.254/16");
                proxySettings.setObject_forKey_(NSMuArray, "ExceptionsList");
                proxySettings.setObject_forKey_(1, "FTPPassive");

                const scopedDictionary = NSMutableDictionary.dictionary();
                scopedDictionary.setObject_forKey_(NSMuArray, "ExceptionsList");
                scopedDictionary.setObject_forKey_(1, "FTPPassive");

                const nestedDictionary = NSMutableDictionary.dictionary();
                nestedDictionary.setObject_forKey_(scopedDictionary, "en0");
                proxySettings.setObject_forKey_(nestedDictionary, "__SCOPED__");
                retval.replace(proxySettings);
            }
        });
    }
}