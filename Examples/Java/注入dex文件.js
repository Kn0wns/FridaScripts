function main(){
    Java.perform(function(){
        Java.openClassFile("/data/local/tmp/xiaojianbang.dex").load();      //本地路径
        var xiaojianbang = Java.use("com.xiaojianbang.test.xiaojianbang");
        var ShufferMap = Java.use("com.xiaojianbang.app.ShufferMap");
        ShufferMap.show.implementation = function(map){
            var retval = xiaojianbang.sayHello(map);
            console.log(retval);
            return retval;
        }

    });
}

setImmediate(main);