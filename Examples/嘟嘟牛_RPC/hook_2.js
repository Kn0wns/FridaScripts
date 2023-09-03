Java.perform(function () {
    var RequestUtil = Java.use('com.dodonew.online.http.RequestUtil');
    RequestUtil.encodeDesMap.overload('java.lang.String', 'java.lang.String', 'java.lang.String').implementation = function (a, b, c) {
        console.log('data: ', a);
        console.log('desKey: ', b);
        console.log('desIV: ', c);
        var retval = this.encodeDesMap(a, b, c);
        console.log('retval: ', retval);
        return retval;
    }
    var Utils = Java.use('com.dodonew.online.util.Utils');
    Utils.md5.implementation = function (a) {
        console.log('MD5 string: ', a);
        var retval = this.md5(a);
        console.log(retval);
        return retval;
    }
});
