export class StringUtils {

    static randomHexStr(count: number) {
        return this.random(count, "1234567890ABCDEF");
    }

    static random(count: number, basestr: string) {
        let res = "";
        for (let i = 0; i < count; i++) {
            res += basestr.charAt(Math.floor(Math.random() * basestr.length));
        }
        return res;
    }

    /**
     * 整数转 IP 字符串
     * @param ipInt
     * @param isHighEndian
     */
    static int2ip (ipInt: number, isHighEndian: boolean) {
        if (isHighEndian) {
            return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) );
        }
        else {
            return ( (ipInt & 255) + '.' + (ipInt>>8 & 255) + '.' + (ipInt>>16 & 255) + '.' + (ipInt>>>24));
        }
    }

    /**
     * IP 字符串转整数
     * @param ip
     * @param isHighEndian
     */
    static ip2int(ip: string, isHighEndian: boolean) {
        if (isHighEndian) {
            return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
        }
        else {
            return ip.split('.').reduce(function(ipInt, octet, idx) { return (parseInt(octet, 10) << idx * 8) + ipInt}, 0) >>> 0;
        }
    }
}