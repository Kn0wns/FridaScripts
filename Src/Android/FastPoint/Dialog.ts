import {FSLog as log} from "../../FSLogger";
import {Utils} from "../Utils/Utils";

export const Dialog = () => {
    let tag = "Dialog";
    const isShowPrintStack = true

    Java.perform(() => {

        try {
            let DialogFragment = Java.use('androidx.fragment.app.DialogFragment')

            ///      ↓↓↓↓↓↓↓      androidx.appcompat.app.AlertDialog      ↓↓↓↓↓↓↓

            /// <reference path="https://cs.android.com/android/platform/superproject/main/+/main:external/javassist/sample/rmi/AlertDialog.java;l=22?q=AlertDialog&ss=android" />
            // public void show(String message)
            log.d(tag, "[*] HOOK androidx.appcompat.app.AlertDialog")
            Java.use("androidx.appcompat.app.AlertDialog").show.implementation = function () {
                let params: string = arguments.length == 0 ? '' : JSON.stringify(arguments)
                log.w(tag, `CALLED -> ${this.toString()}`)
                log.d(tag, `\tPARAMS[${arguments.length}] -> ${params}`)
                isShowPrintStack && Utils.showStacks()
                return this.show.apply(this, arguments)
            }

            ///      ↓↓↓↓↓↓↓      androidx.fragment.app.DialogFragment      ↓↓↓↓↓↓↓

            log.d(tag, "[*] HOOK androidx.fragment.app.FragmentTransaction")
            /// <reference path="https://cs.android.com/android/platform/superproject/+/master:frameworks/base/core/java/android/app/DialogFragment.java;l=263?q=DialogFragment&ss=android%2Fplatform%2Fsuperproject" />
            // public int show(FragmentTransaction transaction, String tag)
            DialogFragment.show.overload('androidx.fragment.app.FragmentTransaction', 'java.lang.String').implementation = function () {
                let params: string = arguments.length == 0 ? '' : JSON.stringify(arguments)
                log.w(tag, `CALLED -> ${this.toString()}`)
                log.d(tag, `\tPARAMS[${arguments.length}] -> ${params}`)
                isShowPrintStack && Utils.showStacks()
                return this.show.apply(this, arguments)
            }

            /// <reference path="https://cs.android.com/android/platform/superproject/+/master:frameworks/base/core/java/android/app/DialogFragment.java;l=236?q=DialogFragment&ss=android%2Fplatform%2Fsuperproject" />
            // public void show(FragmentManager manager, String tag)
            DialogFragment.show.overload('androidx.fragment.app.FragmentManager', 'java.lang.String').implementation = function () {
                let params: string = arguments.length == 0 ? '' : JSON.stringify(arguments)
                log.w(tag, `CALLED -> ${this.toString()}`)
                log.d(tag, `\tPARAMS[${arguments.length}] -> ${params}`)
                isShowPrintStack && Utils.showStacks()
                return this.show.apply(this, arguments)
            }
        } catch (error) {
            log.e(tag, "DO NOT FOUND `androidx.fragment.app.DialogFragment`")
        }

        ///      ↓↓↓↓↓↓↓      android.app.Dialog      ↓↓↓↓↓↓↓

        log.d(tag, "[*] HOOK android.app.Dialog")
        Java.use('android.app.Dialog').show.overload().implementation = function () {
            let params: string = arguments.length == 0 ? '' : JSON.stringify(arguments)
            log.w(tag, `CALLED -> ${this.toString()}`)
            log.d(tag, `\tPARAMS[${arguments.length}] -> ${params}`)
            isShowPrintStack && Utils.showStacks()
            return this.show.apply(this, arguments)
        }

        ///      ↓↓↓↓↓↓↓      android.widget.PopupWindow      ↓↓↓↓↓↓↓

        let PopupWindow = Java.use("android.widget.PopupWindow")

        log.d(tag, "[*] HOOK android.widget.PopupWindow")
        /// <reference path="https://cs.android.com/android/platform/superproject/+/master:frameworks/base/core/java/android/widget/PopupWindow.java;l=1361?q=showAsDropDown&ss=android%2Fplatform%2Fsuperproject" />
        // public void showAsDropDown(View anchor)
        PopupWindow.showAsDropDown.overload('android.view.View').implementation = function () {
            let params: string = arguments.length == 0 ? '' : JSON.stringify(arguments)
            log.w(tag, `CALLED -> ${this.toString()}`)
            log.d(tag, `\tPARAMS[${arguments.length}] -> ${params}`)
            isShowPrintStack && Utils.showStacks()
            return this.showAsDropDown.apply(this, arguments)
        }

        /// <reference path="https://cs.android.com/android/platform/superproject/+/master:frameworks/base/core/java/android/widget/PopupWindow.java;l=1382?q=showAsDropDown&ss=android%2Fplatform%2Fsuperproject" />
        // public void showAsDropDown(View anchor, int xoff, int yoff)
        PopupWindow.showAsDropDown.overload('android.view.View', 'int', 'int').implementation = function () {
            let params: string = arguments.length == 0 ? '' : JSON.stringify(arguments)
            log.w(tag, `CALLED -> ${this.toString()}`)
            log.d(tag, `\tPARAMS[${arguments.length}] -> ${params}`)
            isShowPrintStack && Utils.showStacks()
            return this.showAsDropDown.apply(this, arguments)
        }

        /// <reference path="https://cs.android.com/android/platform/superproject/+/master:frameworks/base/core/java/android/widget/PopupWindow.java;l=1406?q=showAsDropDown&ss=android%2Fplatform%2Fsuperproject" />
        // public void showAsDropDown(View anchor, int xoff, int yoff, int gravity)
        PopupWindow.showAsDropDown.overload('android.view.View', 'int', 'int', 'int').implementation = function () {
            let params: string = arguments.length == 0 ? '' : JSON.stringify(arguments)
            log.w(tag, `CALLED -> ${this.toString()}`)
            log.d(tag, `\tPARAMS[${arguments.length}] -> ${params}`)
            isShowPrintStack && Utils.showStacks()
            return this.showAsDropDown.apply(this, arguments)
        }

        /// <reference path="https://cs.android.com/android/platform/superproject/+/master:frameworks/base/core/java/android/widget/PopupWindow.java;l=1327?q=showAsDropDown&ss=android%2Fplatform%2Fsuperproject" />
        // public void showAtLocation(IBinder token, int gravity, int x, int y)
        PopupWindow.showAtLocation.overload('android.os.IBinder', 'int', 'int', 'int').implementation = function () {
            let params: string = arguments.length == 0 ? '' : JSON.stringify(arguments)
            log.w(tag, `CALLED -> ${this.toString()}`)
            log.d(tag, `\tPARAMS[${arguments.length}] -> ${params}`)
            isShowPrintStack && Utils.showStacks()
            return this.showAtLocation.apply(this, arguments)
        }

        /// <reference path="https://cs.android.com/android/platform/superproject/+/master:frameworks/base/core/java/android/widget/PopupWindow.java;l=1310?q=showAsDropDown&ss=android%2Fplatform%2Fsuperproject" />
        // public void showAtLocation(View parent, int gravity, int x, int y)
        PopupWindow.showAtLocation.overload('android.view.View', 'int', 'int', 'int').implementation = function () {
            let params: string = arguments.length == 0 ? '' : JSON.stringify(arguments)
            log.w(tag, `CALLED -> ${this.toString()}`)
            log.d(tag, `\tPARAMS[${arguments.length}] -> ${params}`)
            isShowPrintStack && Utils.showStacks()
            return this.showAtLocation.apply(this, arguments)
        }
    })

}