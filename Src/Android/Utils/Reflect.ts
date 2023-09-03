import {Utils} from "./Utils";

export namespace Reflect {
    /**
     * 获取目标类下的所有字段:字段名、类型、字段值
     * @param Clz 类名
     */
    export const getReflectFields = (Clz: any) => {
        const clazz = Java.use("java.lang.Class");
        const ReflectClz = Java.cast(Clz.getClass(), clazz);
        const fields = ReflectClz.getDeclaredFields();  // 反射获取所有字段
        return fields.map((field: { getType: () => any; getName: () => any; get: (arg0: any) => any; }) => {
            const type = field.getType();
            const name = field.getName();
            let value = field.get(Clz);
            if (type.indexOf(`[B`) !== -1) {
                // [*]      class [B content = [B@f5c94a1
                // "<instance: java.lang.Object, $className: [B>"
                let byteArray = Java.array('byte', value)
                value = Utils.ByteString(byteArray).base64()
            }
            return `${type} ${name} = ${value}`
        })
    }


    /**
     * 获取目标类下的所有方法 FIXME
     * @param Clz
     */
    export const getReflectMethods = (Clz: any) => {
        let clazz = Java.use("java.lang.Class");
        const ReflectClz = Java.cast(Clz.getClass(), clazz);

        // // 获取该类的所有公共方法(包含父类的)，得到的是一个数组
        // var methods = ReflectClz.getMethods();
        //
        // // 获取该类所有的私有方法(不包含父类)，得到的是一个数组
        // var methods = ReflectClz.getDeclaredMethods();
        //
        // // 通过名称获取该类的公共方法
        // var method = ReflectClz.getMethod("方法名", 参数类型)
        //
        // // 通过名称获取该类的私有方法
        // var method = ReflectClz.getDeclaredMethod("方法名", 参数类型)
    }
} 