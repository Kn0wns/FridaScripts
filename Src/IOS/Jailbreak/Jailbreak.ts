import { FSLog } from "../../FSLogger";

export namespace Jailbreak {
    const NO = ptr(0);
    const canOpenURL = ["cydia", "activator", "filza", "sileo", "undecimus", "zbra"]
    const tpLibs = ["Substrate", "cycript", "frida", "SSLKillSwitch2", "SSLKillSwitch", "SubstrateLoader"]

    export function try_bypass() {
        let tag = try_bypass.name
        let resolver = new ApiResolver('objc');
        ['jailbreak', 'jailB', 'Jailb', 'JailB'].forEach(v => {
            for (const enumerateMatch of resolver.enumerateMatches(`*[* *${v}*]`)) {
                let funcName = enumerateMatch.name;
                let funcAddr = enumerateMatch.address;
                FSLog.d(tag, 'funcName=' + funcName + ' funcAddr=' + funcAddr);
                Interceptor.attach(funcAddr || NULL, {
                    onLeave: function (retval) {
                        if (retval.toInt32() === 1) {
                            retval.replace(NO);
                            FSLog.d(tag, 'jailbreak: ' + funcName + ' retval=' + retval);
                        }
                    }
                });
            }
        });
    }

    export function bypassAll() {
        hook_fileExistsAtPath();
        hook_writeToFile();
        hook_canOpenURL();
        hook_fork();
        hook_stat();
        hook_stat64();
        hook_fopen();
        hook_open();
        hook_lstat();
        hook_access();
        hook_statfs()

        hook_getenv();
        hook_NSClassFromString();
        hook_dyld_get_image_name();
        hook_ptrace();
        hook_sysctl();
        hook_strstr();

        hook_AppInfo();
        hook_FileAndFolderPathDetection();

        'use strict';

        // Hook FileManager.default.destinationOfSymbolicLink(atPath:) method
        var sel = ObjC.selector("destinationOfSymbolicLinkAtURL:error:")
        // Interceptor.attach(Module.findExportByName("Foundation", "destinationOfSymbolicLinkAtURL:error:")||NULL, {
        Interceptor.attach(sel, {
            onEnter: function (args) {
                // Get the path argument
                var path = new ObjC.Object(args[2]).toString();

                // Check if the path matches any of the paths to be checked
                var pathsToCheck = [
                    "/var/lib/undecimus/apt",
                    "/Applications",
                    "/Library/Ringtones",
                    "/Library/Wallpaper",
                    "/usr/arm-apple-darwin9",
                    "/usr/include",
                    "/usr/libexec",
                    "/usr/share"
                ];

                if (pathsToCheck.indexOf(path) >= 0) {
                    // Return a fake result to bypass the original check
                    args[3] = ObjC.classes.NSString.stringWithString_("fake_destination");
                }
            }
        });


        // hook_getpid(); //慎用‼感觉这个也没啥用
    }

    /**
     * hook FileAndFolderPathDetection 类下方法 路径文件判断
     * [detection checkPathByNSFileManager:path]：使用 NSFileManager 对象对路径进行检查，可能涉及文件是否存在、权限等方面的检查。
     * [detection checkPathByAccess:path]：使用 access 函数对路径进行访问检查，判断是否具有读写权限。
     * [detection checkPathByStat:path]：使用 stat 函数对路径进行信息查询，例如获取文件的大小、修改时间等。
     * [detection checkPathByLstat:path]：使用 lstat 函数对路径进行信息查询，类似于 stat，但会解析符号链接指向的真实文件信息。
     * [detection checkPathByStatfs:path]：使用 statfs 函数对文件系统进行查询，判断路径所在的文件系统类型和属性。
     * [detection checkPathByOpen:path]：使用 open 函数尝试打开路径对应的文件。
     * [detection checkPathByFopen:path]：使用 fopen 函数尝试打开路径对应的文件。
     */
    function hook_FileAndFolderPathDetection() {
        let tag = hook_FileAndFolderPathDetection.name
        const className = 'FileAndFolderPathDetection';
        const classObj = ObjC.classes[className];
        if (classObj) {
            const methodList = classObj.$ownMethods;  // 只获取当前类的方法
            methodList.forEach(methodName => {
                const hook = ObjC.classes[className][methodName].implementation;
                Interceptor.attach(hook, {
                    onEnter: function (args) {
                        this.path = new ObjC.Object(args[2]).toString();
                    },
                    onLeave: function (retval) {
                        if (jailbreakPaths.includes(this.path)) {
                            FSLog.d(tag, `${className}.${methodName}: ${this.path} retval: ${retval} -> 0`);
                            if (retval.toInt32() > 0) {
                                retval.replace(NO);
                            }
                        }
                    }
                });
            });
        }
    }

    /**
     * hook AppInfo 类下方法 获取已安装应用列表替换为空
     */
    function hook_AppInfo() {
        let tag = hook_AppInfo.name
        let AppInfo = ObjC.classes.AppInfo;

        if (AppInfo) {
            let fetchApps = AppInfo['- fetchApps'].implementation;
            let listInstalledApps = AppInfo['- listInstalledApps'].implementation;
            hook(fetchApps, 'fetchApps');
            hook(listInstalledApps, 'listInstalledApps');
        }

        function hook(address: NativePointer, fetchApps1: string) {
            Interceptor.attach(address, {
                onLeave: function (retval) {
                    FSLog.d(tag, `hook: AppInfo.${fetchApps1} retval= `);
                    // FSLog.d(tag, `hook: AppInfo.${fetchApps1} retval= ${new ObjC.Object(retval)}`);
                    retval.replace(ObjC.classes.NSArray['new']())
                }
            });
        }
    }


    /**
     * hook fileExistsAtPath 方法 檢測文件是否存在
     */
    function hook_fileExistsAtPath() {
        let tag = hook_fileExistsAtPath.name
        Interceptor.attach(ObjC.classes.NSFileManager["- fileExistsAtPath:"].implementation, {
            onEnter: function (args) {
                this.path = new ObjC.Object(args[2]).toString();
            },
            onLeave: function (retval) {
                if (jailbreakPaths.includes(this.path)) {
                    FSLog.d(tag, `fileExistsAtPath: ${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            },
        });

        // -[NSFileManager fileExistsAtPath:isDirectory:]
        Interceptor.attach(ObjC.classes.NSFileManager["- fileExistsAtPath:isDirectory:"].implementation, {
            onEnter: function (args) {
                this.path = new ObjC.Object(args[2]).toString();
            },
            onLeave: function (retval) {
                if (jailbreakPaths.includes(this.path)) {
                    FSLog.d(tag, `fileExistsAtPath:isDirectory: ${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            },
        });
    }

    /**
     * hook canOpenURL 方法 檢測是否可以打开某个URL
     */
    function hook_canOpenURL() {
        let tag = hook_canOpenURL.name
        Interceptor.attach(ObjC.classes.UIApplication["- canOpenURL:"].implementation, {
            onEnter: function (args) {
                this.path = new ObjC.Object(args[2]).toString().split(":")[0].toLowerCase();
            },
            onLeave(retval) {
                if (canOpenURL.includes(this.path)) {
                    FSLog.d(tag, `canOpenURL: ${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        });

        let LSCanOpenURLManager = ObjC.classes._LSCanOpenURLManager;
        let canOpenURL2 = LSCanOpenURLManager["- canOpenURL:publicSchemes:privateSchemes:XPCConnection:error:"].implementation
        Interceptor.attach(canOpenURL2, {
            onEnter: function (args) {
                this.path = new ObjC.Object(args[2]).toString().split(":")[0].toLowerCase();
            },
            onLeave(retval) {
                if (canOpenURL.includes(this.path)) {
                    FSLog.d(tag, `canOpenURL2: ${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        });
    }

    /**
     * hook canOpenURL 方法 檢測是否可以打开某个URL
     */
    function hook_openURL() {
        let tag = hook_openURL.name
        Interceptor.attach(ObjC.classes.UIApplication["- openURL:"].implementation, {
            onEnter: function (args) {
                this.path = new ObjC.Object(args[2]).toString().split(":")[0].toLowerCase();
            },
            onLeave(retval) {
                if (canOpenURL.includes(this.path)) {
                    FSLog.d(tag, `openURL: ${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        });
    }

    /**
     * hook writeToFile 方法 检测是否可以写入文件
     */
    function hook_writeToFile() {
        let keyword = ['root', 'jb', '/', 'private']
        let tag = hook_writeToFile.name
        let hook = ObjC.classes.NSString["- writeToFile:atomically:encoding:error:"];
        Interceptor.attach(hook.implementation, {
            onEnter: function (args) {
                this.error = args[5];
                this.path = new ObjC.Object(args[2]).toString();
            },
            onLeave: function (retval) {
                keyword.forEach(v => {
                    if (this.path.includes(v)) {
                        FSLog.d(tag, `writeToFile: ${this.path} retval: ${retval} -> 0x0`);
                        // @ts-ignore
                        Memory.writePointer(this.error, ObjC.classes.NSError.alloc());
                    }
                });
            }
        });
    }

    /**
     * hook _dyld_get_image_name 方法 检测动态库注入
     * @private
     */
    function hook_dyld_get_image_name() {
        let tag = hook_dyld_get_image_name.name
        let cheek_paths = ["/Library/MobileSubstrate/MobileSubstrate.dylib",]
        // let NSString = ObjC.classes.NSString;
        // let true_path = NSString.stringWithString_("/System/Library/Frameworks/Intents.framework/Intents");
        let true_path = Memory.allocUtf8String("/System/Library/Frameworks/Intents.framework/Intents");
        let dyld_get_image_name = Module.findExportByName(null, "_dyld_get_image_name") || NULL;
        Interceptor.attach(dyld_get_image_name, {
            onEnter: function (args) {
                this.idx = args[0].toInt32();
            }, onLeave: function (retval) {
                let retStr = retval.readCString() || "";
                if (cheek_paths.includes(retStr)) {
                    FSLog.d(tag, `_dyld_get_image_name: (${this.idx}) ${retStr} => ${true_path}`);
                    retval.replace(true_path);
                }
            }
        })
    }

    /**
     * hook stat 方法 检测文件路径以及是否是路径链接
     * 越狱后有些文件会被移动，但这个文件路径又必须存在，所以可能会创一个文件链接到原来的路径
     * @private
     */
    function hook_lstat() {
        let tag = hook_lstat.name
        let stat = Module.findExportByName('libSystem.B.dylib', 'lstat') || NULL;
        Interceptor.attach(stat, {
            onEnter: function (args) {
                this.path = args[0].readUtf8String();
            },
            onLeave: function (retval) {
                if (jailbreakPaths.includes(this.path)) {
                    FSLog.d(tag, `${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        });
    }

    /**
     * hook fork 方法 检测是否可以创建子进程
     */
    function hook_fork() {
        let tag = hook_fork.name
        let fork = Module.findExportByName(null, 'fork') || NULL;
        Interceptor.attach(fork, {
            onLeave: function (retval) {
                FSLog.d(tag, `fork: ${retval} -> 0x0`);
                if (retval.toInt32() > 0) {
                    // retval.replace(NO);
                }
            }
        })
    }


    /**
     * hook stat 方法 检测文件路径以及是否是路径链接
     */
    function hook_stat() {
        let tag = hook_stat.name
        let stat = Module.findExportByName('libSystem.B.dylib', 'stat');
        Interceptor.attach(stat || NULL, {
            onEnter: function (args) {
                // args[0] 是 stat 方法的第一个参数，通常是文件路径
                // args[1] 是 stat 方法的第二个参数，这里可以添加其他参数的处理
                this.path = args[0].readUtf8String();
            },
            onLeave: function (retval) {
                if (jailbreakPaths.includes(this.path)) {
                    FSLog.d(tag, `${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        });
    }

    /**
     * hook stat64 方法 检测文件路径以及是否是路径链接
     */
    function hook_stat64() {
        let tag = hook_stat64.name
        let stat64 = Module.findExportByName('libSystem.B.dylib', 'stat64');
        Interceptor.attach(stat64 || NULL, {
            onEnter: function (args) {
                // args[0] 是 stat 方法的第一个参数，通常是文件路径
                // args[1] 是 stat 方法的第二个参数，这里可以添加其他参数的处理
                this.path = args[0].readUtf8String();
            },
            onLeave: function (retval) {
                if (jailbreakPaths.includes(this.path)) {
                    FSLog.d(tag, `${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        });
    }


    /**
     * hook fopen 方法 打开文件
     */
    function hook_fopen() {
        let tag = hook_fopen.name
        let fopen = Module.findExportByName(null, 'fopen') || NULL;
        Interceptor.attach(fopen, {
            onEnter: function (args) {
                this.path = args[0].readCString();
            },
            onLeave(retval) {
                if (jailbreakPaths.includes(this.path)) {
                    FSLog.d(tag, `${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        })
    }

    /**
     * hook fopen 方法 打开文件
     */
    function hook_open() {
        let tag = hook_open.name
        let open = Module.findExportByName(null, 'open') || NULL;
        Interceptor.attach(open, {
            onEnter: function (args) {
                this.path = args[0].readCString();
            },
            onLeave(retval) {
                if (jailbreakPaths.includes(this.path)) {
                    FSLog.d(tag, `${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        })
    }

    /**
     * hook access 方法
     */
    function hook_access() {
        let tag = hook_access.name
        let access = Module.findExportByName(null, 'access') || NULL;
        Interceptor.attach(access, {
            onEnter: function (args) {
                this.path = args[0].readCString();
            },
            onLeave(retval) {
                if (jailbreakPaths.includes(this.path)) {
                    FSLog.d(tag, `${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        })
    }

    /**
     * hook statfs 方法
     */
    function hook_statfs() {
        let tag = hook_statfs.name
        let statfs = Module.findExportByName(null, 'statfs') || NULL;
        Interceptor.attach(statfs, {
            onEnter: function (args) {
                this.path = args[0].readCString();
            },
            onLeave(retval) {
                if (jailbreakPaths.includes(this.path)) {
                    FSLog.d(tag, `${this.path} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        })
    }


    /**
     * hook getenv 方法 获取环境变量
     * @private
     */
    function hook_getenv() {
        let tag = hook_getenv.name
        let getenv = Module.findExportByName(null, "getenv") || NULL;
        Interceptor.attach(getenv, {
            onEnter: function (args) {
                this.env = args[0].readCString()
            },
            onLeave: function (retval) {
                if (this.env == "DYLD_INSERT_LIBRARIES") {
                    FSLog.d(tag, `getenv: ${this.env} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        })
    }

    /**
     * hook ptrace 方法 检测是否被调试
     */
    function hook_ptrace() {
        let tag = hook_ptrace.name
        let ptrace = Module.findExportByName(null, 'ptrace') || NULL;
        Interceptor.attach(ptrace, {
            onEnter: function (args) {
                args[0] = ptr(-1)
                FSLog.d(tag, `ptrace: ` + args[0]);
            }
        });
    }

    /**
     * hook getppid 方法 获取父进程id
     * @private
     */
    function hook_getpid() {
        let tag = hook_getpid.name
        let getpid = Module.findExportByName(null, "getpid") || NULL;
        Interceptor.attach(getpid || NULL, {
            onLeave: function (retval) {
                FSLog.d(tag, `getppid: ${retval.toInt32()} -> 1`);
                retval.replace(ptr(1))
            }
        })
    }

    /**
     * hook sysctl 方法 Module.findExportByName(null, "getppid")
     */
    function hook_sysctl() {
        let tag = hook_sysctl.name
        let sysctl = Module.findExportByName(null, 'sysctl') || NULL;
        Interceptor.attach(sysctl, {
            onEnter: function (args) {
                // @ts-ignore
                this.info = this.context.x2;
            },
            onLeave: function (retval) {
                const pointer01 = this.info.add(32)
                const pointerFlag = pointer01.readInt() & 0x800;
                if (pointerFlag === 0x800) {
                    FSLog.d(hook_sysctl.name, `__sysctl: ${retval} > __sysctl was called and was disabled`);
                    pointer01.writeInt(0)
                }
            }
        })
    }

    /**
     * hook strstr 方法 字符串匹配
     */
    function hook_strstr() {
        let tag = hook_strstr.name
        let strstr = Module.findExportByName(null, 'strstr') || NULL;
        Interceptor.attach(strstr, {
            onEnter: function (args) {
                this.lib = args[1].readUtf8String();
            },
            onLeave: function (retval) {
                if (tpLibs.includes(this.lib)) {
                    FSLog.d(tag, `strstr: ${this.lib} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        });
    }

    /**
     * hook NSClassFromString 方法 检测越狱常用类
     * @private
     */
    function hook_NSClassFromString() {
        let tag = hook_NSClassFromString.name
        let target_class = ["HBPreferences"];
        let hook = Module.findExportByName('Foundation', 'NSClassFromString') || NULL
        Interceptor.attach(hook, {
            onEnter: function (args) {
                this.clz = new ObjC.Object(args[0]).toString()
            },
            onLeave: function (retval) {
                if (target_class.includes(this.clz)) {
                    FSLog.d(tag, `NSClassFromString: ${this.clz} retval: ${retval} -> 0x0`);
                    if (retval.toInt32() > 0) {
                        retval.replace(NO);
                    }
                }
            }
        })
    }


    function checkPath(path: string) {
        if (path == null) return true;
        if (path.startsWith('/let/mobile/Containers')) return true;
        if (path.startsWith('/let/containers')) return true;
        if (path.startsWith('/let/mobile/Library')) return true;
        if (path.startsWith('/let/db')) return true;
        if (path.startsWith('/private/let/mobile')) return true;
        if (path.startsWith('/private/let/containers')) return true;
        if (path.startsWith('/private/let/mobile/Library')) return true;
        if (path.startsWith('/private/let/db')) return true;
        if (path.startsWith('/System')) return true;
        if (path.startsWith('/Library/Preferences')) return true;
        if (path.startsWith('/Library/Managed')) return true;
        if (path.startsWith('/usr')) return true;
        if (path.startsWith('/dev')) return true;
        if (path == '/AppleInternal') return true;
        if (path == '/etc/hosts') return true;
        if (path == '/Library') return true;
        if (path == '/let') return true;
        if (path == '/private/let') return true;
        if (path == '/private') return true;
        if (path == '/') return true;
        if (path == '/let/mobile') return true;
        return path.includes('/containers/Bundle/Application')
    }

    const jailbreakPaths = [
        "/.HFS",
        "/.Trashes",
        "/.ba",
        "/.file",
        "/.mb",
        "/Applications",
        "/Applications/AXUIViewService.app",
        "/Applications/AccountAuthenticationDialog.app",
        "/Applications/ActivityMessagesApp.app",
        "/Applications/AdPlatformsDiagnostics.app",
        "/Applications/AppStore.app",
        "/Applications/AskPermissionUI.app",
        "/Applications/BusinessExtensionsWrapper.app",
        "/Applications/CTCarrierSpaceAuth.app",
        "/Applications/Camera.app",
        "/Applications/CheckerBoard.app",
        "/Applications/CompassCalibrationViewService.app",
        "/Applications/ContinuityCamera.app",
        "/Applications/CoreAuthUI.app",
        "/Applications/DDActionsService.app",
        "/Applications/DNDBuddy.app",
        "/Applications/DataActivation.app",
        "/Applications/DemoApp.app",
        "/Applications/Diagnostics.app",
        "/Applications/DiagnosticsService.app",
        "/Applications/FTMInternal-4.app",
        "/Applications/Family.app",
        "/Applications/Feedback",
        "/Applications/FieldTest.app",
        "/Applications/FindMyiPhone.app",
        "/Applications/FunCameraShapes.app",
        "/Applications/FunCameraText.app",
        "/Applications/GameCenterUIService.app",
        "/Applications/HashtagImages.app",
        "/Applications/Health.app",
        "/Applications/HealthPrivacyService.app",
        "/Applications/HomeUIService.app",
        "/Applications/InCallService.app",
        "/Applications/Magnifier.app",
        "/Applications/MailCompositionService.app",
        "/Applications/MessagesViewService.app",
        "/Applications/MobilePhone.app",
        "/Applications/MobileSMS.app",
        '/Applications/Flex.app',
        '/Applications/DumpDecrypter.app',
        "/Applications/MobileSafari.app",
        "/Applications/MobileSlideShow.app",
        '/Applications/SubstituteSettings.app',
        "/Applications/MobileTimer.app",
        "/Applications/MusicUIService.app",
        "/Applications/Passbook.app",
        "/Applications/PassbookUIService.app",
        "/Applications/palera1n.app",
        "/Applications/PhotosViewService.app",
        "/Applications/PreBoard.app",
        "/Applications/Preferences.app",
        "/Applications/Print",
        "/Applications/SIMSetupUIService.app",
        "/Applications/SLGoogleAuth.app",
        "/Applications/SLYahooAuth.app",
        "/Applications/SafariViewService.app",
        "/Applications/ScreenSharingViewService.app",
        "/Applications/ScreenshotServicesService.app",
        "/Applications/Setup.app",
        "/Applications/SharedWebCredentialViewService.app",
        "/Applications/SharingViewService.app",
        "/Applications/SiriViewService.app",
        "/Applications/SoftwareUpdateUIService.app",
        "/Applications/StoreDemoViewService.app",
        "/Applications/StoreKitUIService.app",
        "/Applications/TrustMe.app",
        "/Applications/Utilities",
        "/Applications/VideoSubscriberAccountViewService.app",
        "/Applications/WLAccessService.app",
        "/Applications/Web.app",
        "/Applications/WebApp1.app",
        "/Applications/WebContentAnalysisUI.app",
        "/Applications/WebSheet.app",
        "/Applications/iAdOptOut.app",
        "/Applications/iCloud.app",
        "/Developer",
        "/Library",
        "/Library/Application",
        "/Library/Audio",
        "/Library/Caches",
        "/Library/Caches/cy-",
        "/Library/Filesystems",
        "/Library/Frameworks",
        "/Library/Frameworks/Cephei.framework/Cephei",
        "/Library/Frameworks/CydiaSubstrate.framework/CydiaSubstrate",
        "/Library/Internet",
        "/Library/Keychains",
        "/Library/LaunchAgents",
        "/Library/LaunchDaemons",
        "/Library/Logs",
        "/Library/Managed",
        "/Library/MobileDevice",
        "/Library/MobileSubstrate",
        "/Library/MobileSubstrate/DynamicLibraries/0Shadow.dylib",
        "/Library/MusicUISupport",
        "/Library/PreferenceBundles",
        "/Library/Preferences",
        "/Library/Printers",
        "/Library/Ringtones",
        "/Library/SnowBoard",
        "/Library/Themes",
        "/Library/TweakInject",
        "/Library/Updates",
        "/Library/Wallpaper",
        "/System",
        "/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation",
        "/System/Library/Frameworks/Foundation.framework/Foundation",
        "/System/Library/PreferenceBundles/AppList.bundle",
        "/User/Library/Preferences",
        "/bin",
        "/bin/df",
        "/bin/ps",
        "/cores",
        "/dev",
        "/dev/dlci.",
        "/dev/kmem",
        "/dev/mem",
        "/dev/vn0",
        "/dev/vn1",
        "/etc",
        "/etc/asl",
        "/etc/asl.conf",
        "/etc/fstab",
        "/etc/group",
        "/etc/hosts",
        "/etc/hosts.equiv",
        "/etc/master.passwd",
        "/etc/networks",
        "/etc/notify.conf",
        "/etc/passwd",
        "/etc/ppp",
        "/etc/protocols",
        "/etc/racoon",
        "/etc/services",
        "/etc/ttys",
        "/lib",
        "/mnt",
        "/private",
        "/private/etc",
        "/private/system_data",
        "/private/var",
        "/private/var/containers/Bundle/Application",
        "/private/var/mobile/Containers/Bundle/Application",
        "/private/xarts",
        "/sbin",
        "/sbin/fsck",
        "/sbin/launchd",
        "/sbin/mount",
        "/sbin/pfctl",
        "/tmp",
        "/tmp/Substrate",
        "/tmp/amfid_payload.alive",
        "/tmp/amfidebilitate.out",
        "/tmp/com.apple",
        "/tmp/cydia.log",
        "/tmp/jailbreakd.pid",
        "/tmp/org.coolstar",
        "/tmp/slide.txt",
        "/tmp/substrate",
        "/tmp/syslog",
        "/usr",
        "/usr/bin",
        "/usr/bin/DumpBasebandCrash",
        "/usr/bin/PerfPowerServicesExtended",
        "/usr/bin/abmlite",
        "/usr/bin/brctl",
        "/usr/bin/footprint",
        "/usr/bin/hidutil",
        "/usr/bin/hpmdiagnose",
        "/usr/bin/kbdebug",
        "/usr/bin/powerlogHelperd",
        "/usr/bin/sysdiagnose",
        "/usr/bin/tailspin",
        "/usr/bin/taskinfo",
        "/usr/bin/vm_stat",
        "/usr/bin/zprint",
        "/usr/include",
        "/usr/lib",
        "/usr/lib/FDRSealingMap.plist",
        "/usr/lib/TweakInject",
        "/usr/lib/apt",
        "/usr/lib/bash",
        "/usr/lib/bbmasks",
        "/usr/lib/cycript",
        "/usr/lib/dyld",
        "/usr/lib/lib%@.dylib",
        "/usr/lib/libCRFSuite",
        "/usr/lib/libDHCPServer",
        "/usr/lib/libMatch",
        "/usr/lib/libSubstitrate",
        "/usr/lib/libSystem",
        "/usr/lib/libSystem.B.dylib",
        "/usr/lib/libarchive",
        "/usr/lib/libbsm",
        "/usr/lib/libbz2",
        "/usr/lib/libc",
        "/usr/lib/libc++",
        "/usr/lib/libc++.1.dylib",
        "/usr/lib/libcharset",
        "/usr/lib/libcurses",
        "/usr/lib/libdbm",
        "/usr/lib/libdl",
        "/usr/lib/libeasyperf",
        "/usr/lib/libedit",
        "/usr/lib/libexslt",
        "/usr/lib/libextension",
        "/usr/lib/libform",
        "/usr/lib/libiconv",
        "/usr/lib/libicucore",
        "/usr/lib/libinfo",
        "/usr/lib/libipsec",
        "/usr/lib/liblzma",
        "/usr/lib/libm",
        "/usr/lib/libmecab",
        "/usr/lib/libmis.dylib",
        "/usr/lib/libncurses",
        "/usr/lib/libobjc",
        "/usr/lib/libobjc.A.dylib",
        "/usr/lib/libpcap",
        "/usr/lib/libperfcheck",
        "/usr/lib/libpmsample",
        "/usr/lib/libpoll",
        "/usr/lib/libproc",
        "/usr/lib/libpthread",
        "/usr/lib/libresolv",
        "/usr/lib/librpcsvc",
        "/usr/lib/libsandbox",
        "/usr/lib/libsqlite3",
        "/usr/lib/libstdc++",
        "/usr/lib/libsubstitute",
        "/usr/lib/libsubstitute.dylib",
        "/usr/lib/libsubstrate",
        "/usr/lib/libtidy",
        "/usr/lib/libutil",
        "/usr/lib/libxml2",
        "/usr/lib/libxslt",
        "/usr/lib/libz",
        "/usr/lib/log",
        "/usr/lib/substrate",
        "/usr/lib/system",
        "/usr/lib/tweaks",
        "/usr/lib/updaters",
        "/usr/lib/xpc",
        "/usr/libexec",
        "/usr/libexec/BackupAgent",
        "/usr/libexec/BackupAgent2",
        "/usr/libexec/CrashHousekeeping",
        "/usr/libexec/DataDetectorsSourceAccess",
        "/usr/libexec/FSTaskScheduler",
        "/usr/libexec/FinishRestoreFromBackup",
        "/usr/libexec/IOAccelMemoryInfoCollector",
        "/usr/libexec/IOMFB_bics_daemon",
        "/usr/libexec/Library",
        "/usr/libexec/MobileGestaltHelper",
        "/usr/libexec/MobileStorageMounter",
        "/usr/libexec/NANDTaskScheduler",
        "/usr/libexec/OTATaskingAgent",
        "/usr/libexec/PowerUIAgent",
        "/usr/libexec/PreboardService",
        "/usr/libexec/ProxiedCrashCopier",
        "/usr/libexec/PurpleReverseProxy",
        "/usr/libexec/ReportMemoryException",
        "/usr/libexec/SafariCloudHistoryPushAgent",
        "/usr/libexec/SidecarRelay",
        "/usr/libexec/SyncAgent",
        "/usr/libexec/UserEventAgent",
        "/usr/libexec/addressbooksyncd",
        "/usr/libexec/adid",
        "/usr/libexec/adprivacyd",
        "/usr/libexec/adservicesd",
        "/usr/libexec/afcd",
        "/usr/libexec/airtunesd",
        "/usr/libexec/amfid",
        "/usr/libexec/asd",
        "/usr/libexec/assertiond",
        "/usr/libexec/atc",
        "/usr/libexec/atwakeup",
        "/usr/libexec/backboardd",
        "/usr/libexec/biometrickitd",
        "/usr/libexec/bootpd",
        "/usr/libexec/bulletindistributord",
        "/usr/libexec/captiveagent",
        "/usr/libexec/cc_fips_test",
        "/usr/libexec/checkpointd",
        "/usr/libexec/cloudpaird",
        "/usr/libexec/com.apple.automation.defaultslockdownserviced",
        "/usr/libexec/companion_proxy",
        "/usr/libexec/configd",
        "/usr/libexec/corecaptured",
        "/usr/libexec/coreduetd",
        "/usr/libexec/crash_mover",
        "/usr/libexec/dasd",
        "/usr/libexec/demod",
        "/usr/libexec/demod_helper",
        "/usr/libexec/dhcpd",
        "/usr/libexec/diagnosticd",
        "/usr/libexec/diagnosticextensionsd",
        "/usr/libexec/dmd",
        "/usr/libexec/dprivacyd",
        "/usr/libexec/dtrace",
        "/usr/libexec/duetexpertd",
        "/usr/libexec/eventkitsyncd",
        "/usr/libexec/fdrhelper",
        "/usr/libexec/findmydeviced",
        "/usr/libexec/finish_demo_restore",
        "/usr/libexec/fmfd",
        "/usr/libexec/fmflocatord",
        "/usr/libexec/fseventsd",
        "/usr/libexec/ftp-proxy",
        "/usr/libexec/gamecontrollerd",
        "/usr/libexec/gamed",
        "/usr/libexec/gpsd",
        "/usr/libexec/hangreporter",
        "/usr/libexec/hangtracerd",
        "/usr/libexec/heartbeatd",
        "/usr/libexec/hostapd",
        "/usr/libexec/idamd",
        "/usr/libexec/init_data_protection",
        "/usr/libexec/installd",
        "/usr/libexec/ioupsd",
        "/usr/libexec/keybagd",
        "/usr/libexec/languageassetd",
        "/usr/libexec/locationd",
        "/usr/libexec/lockdownd",
        "/usr/libexec/logd",
        "/usr/libexec/lsd",
        "/usr/libexec/lskdd",
        "/usr/libexec/lskdmsed",
        "/usr/libexec/magicswitchd",
        "/usr/libexec/mc_mobile_tunnel",
        "/usr/libexec/microstackshot",
        "/usr/libexec/misagent",
        "/usr/libexec/misd",
        "/usr/libexec/mmaintenanced",
        "/usr/libexec/mobile_assertion_agent",
        "/usr/libexec/mobile_diagnostics_relay",
        "/usr/libexec/mobile_house_arrest",
        "/usr/libexec/mobile_installation_proxy",
        "/usr/libexec/mobile_obliterator",
        "/usr/libexec/mobile_storage_proxy",
        "/usr/libexec/mobileactivationd",
        "/usr/libexec/mobileassetd",
        "/usr/libexec/mobilewatchdog",
        "/usr/libexec/mtmergeprops",
        "/usr/libexec/nanomediaremotelinkagent",
        "/usr/libexec/nanoregistryd",
        "/usr/libexec/nanoregistrylaunchd",
        "/usr/libexec/neagent",
        "/usr/libexec/nehelper",
        "/usr/libexec/nesessionmanager",
        "/usr/libexec/networkserviceproxy",
        "/usr/libexec/nfcd",
        "/usr/libexec/nfrestore_service",
        "/usr/libexec/nlcd",
        "/usr/libexec/notification_proxy",
        "/usr/libexec/nptocompaniond",
        "/usr/libexec/nsurlsessiond",
        "/usr/libexec/nsurlstoraged",
        "/usr/libexec/online-auth-agent",
        "/usr/libexec/oscard",
        "/usr/libexec/pcapd",
        "/usr/libexec/pcsstatus",
        "/usr/libexec/pfd",
        "/usr/libexec/pipelined",
        "/usr/libexec/pkd",
        "/usr/libexec/pkreporter",
        "/usr/libexec/ptpd",
        "/usr/libexec/rapportd",
        "/usr/libexec/replayd",
        "/usr/libexec/resourcegrabberd",
        "/usr/libexec/rolld",
        "/usr/libexec/routined",
        "/usr/libexec/rtbuddyd",
        "/usr/libexec/rtcreportingd",
        "/usr/libexec/safarifetcherd",
        "/usr/libexec/screenshotsyncd",
        "/usr/libexec/security-sysdiagnose",
        "/usr/libexec/securityd",
        "/usr/libexec/securityuploadd",
        "/usr/libexec/seld",
        "/usr/libexec/seputil",
        "/usr/libexec/sharingd",
        "/usr/libexec/signpost_reporter",
        "/usr/libexec/silhouette",
        "/usr/libexec/siriknowledged",
        "/usr/libexec/smcDiagnose",
        "/usr/libexec/splashboardd",
        "/usr/libexec/springboardservicesrelay",
        "/usr/libexec/streaming_zip_conduit",
        "/usr/libexec/swcd",
        "/usr/libexec/symptomsd",
        "/usr/libexec/symptomsd-helper",
        "/usr/libexec/sysdiagnose_helper",
        "/usr/libexec/sysstatuscheck",
        "/usr/libexec/tailspind",
        "/usr/libexec/timed",
        "/usr/libexec/tipsd",
        "/usr/libexec/topicsmap.db",
        "/usr/libexec/transitd",
        "/usr/libexec/trustd",
        "/usr/libexec/tursd",
        "/usr/libexec/tzd",
        "/usr/libexec/tzinit",
        "/usr/libexec/tzlinkd",
        "/usr/libexec/videosubscriptionsd",
        "/usr/libexec/wapic",
        "/usr/libexec/wcd",
        "/usr/libexec/webbookmarksd",
        "/usr/libexec/webinspectord",
        "/usr/libexec/wifiFirmwareLoader",
        "/usr/libexec/wifivelocityd",
        "/usr/libexec/xpcproxy",
        "/usr/libexec/xpcroleaccountd",
        "/usr/local",
        "/usr/local/bin",
        "/usr/local/lib",
        "/usr/local/standalone",
        "/usr/sbin",
        "/usr/sbin/BTAvrcp",
        "/usr/sbin/BTLEServer",
        "/usr/sbin/BTMap",
        "/usr/sbin/BTPbap",
        "/usr/sbin/BlueTool",
        "/usr/sbin/WiFiNetworkStoreModel.momd",
        "/usr/sbin/WirelessRadioManagerd",
        "/usr/sbin/absd",
        "/usr/sbin/addNetworkInterface",
        "/usr/sbin/applecamerad",
        "/usr/sbin/aslmanager",
        "/usr/sbin/bluetoothd",
        "/usr/sbin/cfprefsd",
        "/usr/sbin/ckksctl",
        "/usr/sbin/distnoted",
        "/usr/sbin/fairplayd.H2",
        "/usr/sbin/filecoordinationd",
        "/usr/sbin/ioreg",
        "/usr/sbin/ipconfig",
        "/usr/sbin/mDNSResponder",
        "/usr/sbin/mDNSResponderHelper",
        "/usr/sbin/mediaserverd",
        "/usr/sbin/notifyd",
        "/usr/sbin/nvram",
        "/usr/sbin/pppd",
        "/usr/sbin/racoon",
        "/usr/sbin/rtadvd",
        "/usr/sbin/scutil",
        "/usr/sbin/spindump",
        "/usr/sbin/syslogd",
        "/usr/sbin/wifid",
        "/usr/sbin/wirelessproxd",
        "/usr/share",
        "/usr/share/CSI",
        "/usr/share/com.apple.languageassetd",
        "/usr/share/firmware",
        "/usr/share/icu",
        "/usr/share/langid",
        "/usr/share/locale",
        "/usr/share/mecabra",
        "/usr/share/misc",
        "/usr/share/progressui",
        "/usr/share/tokenizer",
        "/usr/share/zoneinfo",
        "/usr/share/zoneinfo.default",
        "/usr/standalone",
        "/var",
        "/var/.DocumentRevisions",
        "/var/.fseventsd",
        "/var/.overprovisioning_file",
        "/var/Keychains",
        "/var/Managed",
        "/var/MobileAsset",
        "/var/MobileDevice",
        "/var/MobileSoftwareUpdate",
        "/var/audit",
        "/var/backups",
        "/var/buddy",
        "/var/containers",
        "/var/containers/Bundle",
        "/var/containers/Bundle/Application",
        "/var/containers/Bundle/Framework",
        "/var/containers/Bundle/PluginKitPlugin",
        "/var/containers/Bundle/VPNPlugin",
        "/var/containers/Bundle/dylibs",
        "/var/containers/Bundle/tweaksupport",
        "/var/cores",
        "/var/db",
        "/var/db/stash",
        "/var/ea",
        "/var/empty",
        "/var/folders",
        "/var/hardware",
        "/var/installd",
        "/var/internal",
        "/var/keybags",
        "/var/lib",
        "/var/lib/dpkg/info",
        "/var/local",
        "/var/lock",
        "/var/log",
        "/var/log/asl",
        "/var/log/com.apple.xpc.launchd",
        "/var/log/corecaptured.log",
        "/var/log/ppp",
        "/var/log/ppp.log",
        "/var/log/racoon.log",
        "/var/log/sa",
        "/var/logs",
        "/var/mobile",
        "/var/mobile/Applications",
        "/var/mobile/Containers",
        "/var/mobile/Containers/Bundle/Application",
        "/var/mobile/Containers/Data",
        "/var/mobile/Containers/Data/Application",
        "/var/mobile/Containers/Data/InternalDaemon",
        "/var/mobile/Containers/Data/PluginKitPlugin",
        "/var/mobile/Containers/Data/TempDir",
        "/var/mobile/Containers/Data/VPNPlugin",
        "/var/mobile/Containers/Data/XPCService",
        "/var/mobile/Containers/Shared",
        "/var/mobile/Containers/Shared/AppGroup",
        "/var/mobile/Documents",
        "/var/mobile/Downloads",
        "/var/mobile/Library",
        "/var/mobile/Library/Caches",
        "/var/mobile/Library/Caches/.com.apple",
        "/var/mobile/Library/Caches/ACMigrationLock",
        "/var/mobile/Library/Caches/AccountMigrationInProgress",
        "/var/mobile/Library/Caches/AdMob",
        "/var/mobile/Library/Caches/BTAvrcp",
        "/var/mobile/Library/Caches/Checkpoint.plist",
        "/var/mobile/Library/Caches/CloudKit",
        "/var/mobile/Library/Caches/DateFormats.plist",
        "/var/mobile/Library/Caches/FamilyCircle",
        "/var/mobile/Library/Caches/GameKit",
        "/var/mobile/Library/Caches/GeoServices",
        "/var/mobile/Library/Caches/MappedImageCache",
        "/var/mobile/Library/Caches/OTACrashCopier",
        "/var/mobile/Library/Caches/PassKit",
        "/var/mobile/Library/Caches/Snapshots",
        "/var/mobile/Library/Caches/Snapshots/com.apple",
        "/var/mobile/Library/Caches/TelephonyUI",
        "/var/mobile/Library/Caches/Weather",
        "/var/mobile/Library/Caches/cache",
        "/var/mobile/Library/Caches/ckkeyrolld",
        "/var/mobile/Library/Caches/com.apple",
        "/var/mobile/Library/Caches/rtcreportingd",
        "/var/mobile/Library/Caches/sharedCaches",
        "/var/mobile/Library/ControlCenter",
        "/var/mobile/Library/ControlCenter/ModuleConfiguration.plist",
        "/var/mobile/Library/Cydia",
        "/var/mobile/Library/Logs/Cydia",
        "/var/mobile/Library/Preferences",
        "/var/mobile/Library/Preferences/.GlobalPreferences.plist",
        "/var/mobile/Library/Preferences/UITextInputContextIdentifiers.plist",
        "/var/mobile/Library/Preferences/Wallpaper.png",
        "/var/mobile/Library/Preferences/ckkeyrolld.plist",
        "/var/mobile/Library/Preferences/com.apple.",
        "/var/mobile/Library/Preferences/nfcd.plist",
        "/var/mobile/Library/SBSettings",
        "/var/mobile/Library/Sileo",
        "/var/mobile/Media",
        "/var/mobile/MobileSoftwareUpdate",
        "/var/msgs",
        "/var/networkd",
        "/var/preferences",
        "/var/root",
        "/var/run",
        "/var/run/asl_input",
        "/var/run/configd.pid",
        "/var/run/fudinit",
        "/var/run/lockbot",
        "/var/run/lockdown",
        "/var/run/lockdown.sock",
        "/var/run/lockdown_first_run",
        "/var/run/mDNSResponder",
        "/var/run/pppconfd",
        "/var/run/printd",
        "/var/run/syslog",
        "/var/run/syslog.pid",
        "/var/run/utmpx",
        "/var/run/vpncontrol.sock",
        "/var/spool",
        "/var/staged_system_apps",
        "/var/tmp",
        "/var/vm",
        "/var/wireless",
        "/private/jailbreak.txt",
        "/.bootstrapped_electra",
        "/.cydia_no_stash",
        "/.installed_unc0ver",
        "/Applications/Cydia.app",
        "/Applications/FakeCarrier.app",
        "/Applications/Icy.app",
        "/Applications/IntelliScreen.app",
        "/Applications/MxTube.app",
        "/Applications/RockApp.app",
        "/Applications/SBSettings.app",
        "/Applications/Sileo.app",
        "/Applications/Snoop-itConfig.app",
        "/Applications/WinterBoard.app",
        "/Applications/blackra1n.app",
        '/private/var/binpack/Applications/loader.app',
        "/Library/MobileSubstrate/CydiaSubstrate.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/LiveClock.plist",
        "/Library/MobileSubstrate/DynamicLibraries/Veency.plist",
        "/Library/MobileSubstrate/MobileSubstrate.dylib",
        "/Library/PreferenceBundles/ABypassPrefs.bundle",
        "/Library/PreferenceBundles/FlyJBPrefs.bundle",
        "/Library/PreferenceBundles/LibertyPref.bundle",
        "/Library/PreferenceBundles/ShadowPreferences.bundle",
        "/System/Library/LaunchDaemons/com.ikey.bbot.plist",
        "/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
        "/bin/bash",
        "/bin/sh",
        "/etc/apt",
        "/etc/apt/sources.list.d/electra.list",
        "/etc/apt/sources.list.d/sileo.sources",
        "/etc/apt/undecimus/undecimus.list",
        "/etc/ssh/sshd_config",
        "/jb/amfid_payload.dylib",
        "/jb/jailbreakd.plist",
        "/jb/libjailbreak.dylib",
        "/jb/lzma",
        "/jb/offsets.plist",
        "/private/etc/apt",
        "/private/etc/dpkg/origins/debian",
        "/private/etc/ssh/sshd_config",
        "/private/var/Users/",
        "/private/var/cache/apt/",
        "/private/var/lib/apt",
        "/private/var/lib/cydia",
        "/private/var/log/syslog",
        "/private/var/mobile/Library/SBSettings/Themes",
        "/private/var/stash",
        "/private/var/tmp/cydia.log",
        "/var/tmp/cydia.log",
        "/usr/bin/cycript",
        "/usr/bin/sshd",
        "/usr/lib/libcycript.dylib",
        "/usr/lib/libhooker.dylib",
        "/usr/lib/libjailbreak.dylib",
        "/usr/libexec/cydia",
        "/usr/libexec/cydia/firmware.sh",
        "/usr/libexec/sftp-server",
        "/usr/libexec/ssh-keysign",
        "/usr/local/bin/cycript",
        "/usr/sbin/frida-server",
        "/usr/sbin/sshd",
        "/usr/share/jailbreak/injectme.plist",
        "/var/binpack",
        "/var/cache/apt",
        "/var/checkra1n.dmg",
        "/var/lib/apt",
        "/var/lib/cydia",
        "/var/lib/dpkg/info/mobilesubstrate.md5sums",
        "/var/log/apt",
        "/var/lib/undecimus/apt",
        "/usr/arm-apple-darwin9",
        "/usr/lib/Cephei.framework/Cephei",
        "/Applications/SBSetttings.app",
        "/Applications/Terminal.app",
        "/Applications/Pirni.app",
        "/Applications/iFile.app",
        "/Applications/iProtect.app",
        "/Applications/Backgrounder.app",
        "/Applications/biteSMS.app",
        "/Library/MobileSubstrate/DynamicLibraries/SBSettings.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/SBSettings.plist",
        "/System/Library/LaunchDaemons/com.saurik.Cy@dia.Startup.plist",
        "/System/Library/LaunchDaemons/com.bigboss.sbsettingsd.plist",
        "/System/Library/PreferenceBundles/CydiaSettings.bundle",
        "/etc/profile.d/terminal.sh",
        "/private/var/root/Media/Cydia",
        "/private/var/lib/dpkg/info/cydia-sources.list",
        "/private/var/lib/dpkg/info/cydia.list",
        "/private/etc/profile.d/terminal.sh",
        "/usr/bin/ssh",
        "/var/log/syslog",
        "/var/lib/dpkg/info/cydia-sources.list",
        "/var/lib/dpkg/info/cydia.list",
        "/var/lib/dpkg/info/mobileterminal.list",
        "/var/lib/dpkg/info/mobileterminal.postinst",
        "/User/Library/SBSettings",
        "/usr/bin/sbsettingsd",
        "/usr/share/icu/icudt68l.dat",
        "activator://package/com.example.package",
        "cydia://package/com.example.package",
        "filza://package/com.example.package",
        "sileo://package/com.example.package",
        "/var/db/timezone/icutz",
        "/var/db/timezone/icutz/icutz44l.dat",
        "dropbear_rsa_host_key",
        "Library/LaunchDaemons/dropbear.plist",
        "/Library/dpkg/info/kjc.checkra1n.mobilesubstraterepo.list",
        "/Systetem/Library/LaunchDaemons/com.ikey.bbot.plist",
        "/bin/su",
        "/etc/apt/preferences.d/checkra1n",
        "/pguntether",
        "/private/var/lib/apt/",
        "/usr/binsshd",
        "/usr/lib/frida",
        "/usr/lib/frida/frida-agent.dylib",
        "/var/mobile/Media/.evasi0n7_installed",
        "/var/root/.bash_history",
        "/private/etc/apt/trusted.gpg.d/*",
        "/private/etc/apt/sources.list.d/procursus.sources",
        "/private/etc/apt/sources.list.d/sileo.sources",
        "/Applications/crackerxi.app",
        "/etc/alternatives/sh",
        "/etc/apt/",
        "/etc/apt/sources.list.d/cydia.list",
        "/etc/apt/sources.list.d/sileo.sourcs",
        "/jb/offsets.plists",
        "/Library/MobileSubstrate/DynamicLibraries/*",
        "/private/var/cache/apt",
        "/private/var/tmp/frida-*.dylib",
        "/private/var/Users",
        "/usr/libexec/sshd-keygen-wrapper",
        "/var/lib/dpkg/info/mobilesubstrate.dylib",
        "/var/mobile/Library/Caches/com.saurik.Cydia/sources.list",
        "/Library/MobileSubstrate/DynamicLibraries/Choicy.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/afc2dService.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/afc2dSupport.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/AppSyncUnified-FrontBoard.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/AppSyncUnified-installd.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/ChoicySB.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/dygz.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/LiveClock.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/MobileSafety.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/PreferenceLoader.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/RocketBootstrap.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/Veency.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/xCon.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/zorro.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/zzzzHeiBaoLib.dylib",
        "/Library/MobileSubstrate/DynamicLibraries/",
        "/usr/lib/libsubstrate.dylib/SSLKillSwitch2.dylib",
        "/usr/lib/libsubstrate.dylib/SSLKillSwitch2.plist",
        "/usr/lib/CepheiUI.framework/CepheiUI",
        "/usr/lib/substrate/SubstrateInserter.dylib",
        "/usr/lib/substrate/SubstrateLoader.dylib",
        "/usr/lib/substrate/SubstrateBootstrap.dylib",
        "/Library/MobileSubstrate/",
        "/Library/PreferenceBundles/SubstitutePrefs.bundle/",
        "/Library/PreferenceBundles/SubstitutePrefs.bundle/Info.plist",
        "/Library/PreferenceBundles/SubstitutePrefs.bundle/SubstitutePrefs",
        "/Library/PreferenceLoader/Preferences/SubstituteSettings.plist",
        "/private/etc/alternatives/sh",
        "/private/etc/apt/preferences.d/checkra1n",
        "/private/etc/apt/preferences.d/cydia",
        "/private/etc/clutch.conf",
        "/private/etc/clutch_cracked.plist",
        "/private/etc/rc.d/substitute-launcher",
        "/private/var/cache/clutch.plist",
        "/private/var/cache/clutch_cracked.plist",
        "/private/var/db/stash",
        "/private/var/evasi0n",
        "/private/var/lib/dpkg/",
        "/private/var/mobile/Library/Filza/",
        "/private/var/mobile/Library/Filza/pasteboard.plist",
        "/private/var/mobile/Library/Cydia/",
        "/private/var/mobile/Library/Preferences/com.ex.substitute.plist",
        "/private/var/mobile/Library/SBSettingsThemes/",
        "/private/var/MobileSoftwareUpdate/mnt1/System/Library/PrivateFrameworks/DictionaryServices.framework/SubstituteCharacters.plist",
        "/private/var/root/Documents/Cracked/",
        "/System/Library/PrivateFrameworks/DictionaryServices.framework/SubstituteCharacters.plist",
        "/usr/bin/scp",
        "/usr/bin/sftp",
        "/usr/bin/ssh-add",
        "/usr/bin/ssh-agent",
        "/usr/bin/ssh-keygen",
        "/usr/bin/ssh-keyscan",
        "/usr/bin/sinject",
        "/usr/include/substrate.h",
        "/usr/lib/cycript0.9/",
        "/usr/lib/cycript0.9/com/",
        "/usr/lib/cycript0.9/com/saurik/",
        "/usr/lib/cycript0.9/com/saurik/substrate/",
        "/usr/lib/cycript0.9/com/saurik/substrate/MS.cy",
        "/usr/libexec/filza/Filza",
        "/usr/libexec/substituted",
        "/usr/libexec/sinject-vpa",
        "/usr/lib/substrate/",
        "/usr/libexec/cydia/",
        "/usr/libexec/substrate",
        "/usr/libexec/substrated",
        "/var/cache/apt/",
        "/var/cache/clutch.plist",
        "/var/cache/clutch_cracked.plist",
        "/var/evasi0n",
        "/var/lib/apt/",
        "/var/lib/cydia/",
        "/var/lib/dpkg/",
        "/var/mobile/Library/Filza/",
        "/var/mobile/Library/Filza/pasteboard.plist",
        "/var/mobile/Library/Cydia/",
        "/var/mobile/Library/Preferences/com.ex.substitute.plist",
        "/var/mobile/Library/SBSettingsThemes/",
        "/var/MobileSoftwareUpdate/mnt1/System/Library/PrivateFrameworks/DictionaryServices.framework/SubstituteCharacters.plist",
        "/var/root/Documents/Cracked/",
        "/var/stash",
        "/Library/Activator",
        "/Library/Flipswitch",
        "/Library/dpkg/",
        "/Library/Frameworks/CydiaSubstrate.framework/",
        "/Library/Frameworks/CydiaSubstrate.framework/Headers/",
        "/Library/Frameworks/CydiaSubstrate.framework/Headers/CydiaSubstrate.h",
        "/Library/Frameworks/CydiaSubstrate.framework/Info.plist",
        "/Library/LaunchDaemons/ai.akemi.asu_inject.plist",
        "/Library/LaunchDaemons/com.openssh.sshd.plist",
        "/Library/LaunchDaemons/com.rpetrich.rocketbootstrapd.plist",
        "/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
        "/Library/LaunchDaemons/com.tigisoftware.filza.helper.plist",
        "/Library/LaunchDaemons/dhpdaemon.plist",
        "/Library/LaunchDaemons/re.frida.server.plist",
        "/Library/MobileSubstrate/DynamicLibraries/Choicy.plist",
        '/var/mobile/Library/Preferences/ABPattern',
        '/usr/lib/ABDYLD.dylib',
        '/usr/lib/ABSubLoader.dylib',
        '/Library/PreferenceBundles/Cephei.bundle',
        '/Library/PreferenceBundles/SubstitutePrefs.bundle',
        '/Library/PreferenceBundles/libhbangprefs.bundle',
        '/var/binpack/Applications/loader.app',
        '/Applications/FlyJB.app',
        '/Applications/Zebra.app',
        '/Library/BawAppie/ABypass',
        '/Library/MobileSubstrate/DynamicLibraries/SSLKillSwitch2.plist',
        '/Library/MobileSubstrate/DynamicLibraries/PreferenceLoader.plist',
        '/Library/MobileSubstrate/DynamicLibraries',
        '/var/mobile/Library/Preferences/me.jjolano.shadow.plist',
    ]
}