import {FSLog as log} from "../FSLogger";


export namespace IOS {
    export function dump_ui() {
        try {
            let current_window = ObjC.classes.UIWindow.keyWindow();
            let view = current_window.recursiveDescription();
            log.i(dump_ui.name, view);
            return view;
        } catch (e) {
            return e;
        }
    }
}