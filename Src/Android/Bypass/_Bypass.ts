import {UnpinningPlus} from "./UnpinningPlus";
import {multi_unpinning} from "./multi_unpinning";
import {bypass_frida_libc} from "./bypass_frida_libc";
import {bypass_root} from "./bypass_root";
import {bypass_debug_fork} from "./bypass_debug_fork";
import {bypass_debug_exit} from "./bypass_debug_exit";
import {bypass_debug_kill} from "./bypass_debug_kill";
import {bypass_debug_fgets} from "./bypass_debug_fgets";
import {bypass_debug_ptrace_android} from "./bypass_debug_ptrace_android";
import {bypass_frida_maps} from "./bypass_frida_map";
import {Bypass_ssl_flutter} from "./bypass_ssl_flutter";

export namespace Bypass {

    export function anti_debug() {
        bypass_frida_libc();
        bypass_frida_maps();
        bypass_root();
        bypass_debug_ptrace_android();
        bypass_debug_fork();
        bypass_debug_fgets();
        bypass_debug_exit();
        bypass_debug_kill();
    }

    export const bypass_ssl_multi_unpinning = () => {
        multi_unpinning();
    }

    export const bypass_ssl_UnpinningPlus = () => {
        UnpinningPlus();
    }

    export const bypass_ssl_flutter = () => {
        Bypass_ssl_flutter();
    }
}


