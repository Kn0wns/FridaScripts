// Time    : 2023-03-03 22:54
// Author  : KKings
// File    : jnitrace.js
// Software: WebStorm

/*
 * User guide and more details available here:
 * https://github.com/chame1eon/jnitrace
 */

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
        module.exports=[
            {
                "name": "reserved0",
                "args": [],
                "ret": ""
            },
            {
                "name": "reserved1",
                "args": [],
                "ret": ""
            },
            {
                "name": "reserved2",
                "args": [],
                "ret": ""
            },
            {
                "name": "DestroyJavaVM",
                "args": [
                    "JavaVM*"
                ],
                "ret": "jint"
            },
            {
                "name": "AttachCurrentThread",
                "args": [
                    "JavaVM*",
                    "void**",
                    "void*"
                ],
                "ret": "jint"
            },
            {
                "name": "DetachCurrentThread",
                "args": [
                    "JavaVM*"
                ],
                "ret": "jint"
            },
            {
                "name": "GetEnv",
                "args": [
                    "JavaVM*",
                    "void**",
                    "jint"
                ],
                "ret": "jint"
            },
            {
                "name": "AttachCurrentThreadAsDaemon",
                "args": [
                    "JavaVM*",
                    "void**",
                    "void*"
                ],
                "ret": "jint"
            }
        ]

    },{}],2:[function(require,module,exports){
        module.exports=[
            {
                "name": "reserved0",
                "args": [],
                "ret": ""
            },
            {
                "name": "reserved1",
                "args": [],
                "ret": ""
            },
            {
                "name": "reserved2",
                "args": [],
                "ret": ""
            },
            {
                "name": "reserved3",
                "args": [],
                "ret": ""
            },
            {
                "name": "GetVersion",
                "args": [
                    "JNIEnv*"
                ],
                "ret": "jint"
            },
            {
                "name": "DefineClass",
                "args": [
                    "JNIEnv*",
                    "char*",
                    "jobject",
                    "jbyte*",
                    "jsize"
                ],
                "ret": "jclass"
            },
            {
                "name": "FindClass",
                "args": [
                    "JNIEnv*",
                    "char*"
                ],
                "ret": "jclass"
            },
            {
                "name": "FromReflectedMethod",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jmethodID"
            },
            {
                "name": "FromReflectedField",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jfieldID"
            },
            {
                "name": "ToReflectedMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jboolean"
                ],
                "ret": "jobject"
            },
            {
                "name": "GetSuperclass",
                "args": [
                    "JNIEnv*",
                    "jclass"
                ],
                "ret": "jclass"
            },
            {
                "name": "IsAssignableFrom",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jclass"
                ],
                "ret": "jboolean"
            },
            {
                "name": "ToReflectedField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID",
                    "jboolean"
                ],
                "ret": "jobject"
            },
            {
                "name": "Throw",
                "args": [
                    "JNIEnv*",
                    "jthrowable"
                ],
                "ret": "jint"
            },
            {
                "name": "ThrowNew",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "char*"
                ],
                "ret": "jint"
            },
            {
                "name": "ExceptionOccurred",
                "args": [
                    "JNIEnv*"
                ],
                "ret": "jthrowable"
            },
            {
                "name": "ExceptionDescribe",
                "args": [
                    "JNIEnv*"
                ],
                "ret": "void"
            },
            {
                "name": "ExceptionClear",
                "args": [
                    "JNIEnv*"
                ],
                "ret": "void"
            },
            {
                "name": "FatalError",
                "args": [
                    "JNIEnv*",
                    "char*"
                ],
                "ret": "void"
            },
            {
                "name": "PushLocalFrame",
                "args": [
                    "JNIEnv*",
                    "jint"
                ],
                "ret": "jint"
            },
            {
                "name": "PopLocalFrame",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jobject"
            },
            {
                "name": "NewGlobalRef",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jobject"
            },
            {
                "name": "DeleteGlobalRef",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "void"
            },
            {
                "name": "DeleteLocalRef",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "void"
            },
            {
                "name": "IsSameObject",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jobject"
                ],
                "ret": "jboolean"
            },
            {
                "name": "NewLocalRef",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jobject"
            },
            {
                "name": "EnsureLocalCapacity",
                "args": [
                    "JNIEnv*",
                    "jint"
                ],
                "ret": "jint"
            },
            {
                "name": "AllocObject",
                "args": [
                    "JNIEnv*",
                    "jclass"
                ],
                "ret": "jobject"
            },
            {
                "name": "NewObject",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jobject"
            },
            {
                "name": "NewObjectV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jobject"
            },
            {
                "name": "NewObjectA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jobject"
            },
            {
                "name": "GetObjectClass",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jclass"
            },
            {
                "name": "IsInstanceOf",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass"
                ],
                "ret": "jboolean"
            },
            {
                "name": "GetMethodID",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "char*",
                    "char*"
                ],
                "ret": "jmethodID"
            },
            {
                "name": "CallObjectMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "..."
                ],
                "ret": "jobject"
            },
            {
                "name": "CallObjectMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jobject"
            },
            {
                "name": "CallObjectMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jobject"
            },
            {
                "name": "CallBooleanMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "..."
                ],
                "ret": "jboolean"
            },
            {
                "name": "CallBooleanMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jboolean"
            },
            {
                "name": "CallBooleanMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jboolean"
            },
            {
                "name": "CallByteMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "..."
                ],
                "ret": "jbyte"
            },
            {
                "name": "CallByteMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jbyte"
            },
            {
                "name": "CallByteMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jbyte"
            },
            {
                "name": "CallCharMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "..."
                ],
                "ret": "jchar"
            },
            {
                "name": "CallCharMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jchar"
            },
            {
                "name": "CallCharMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jchar"
            },
            {
                "name": "CallShortMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "..."
                ],
                "ret": "jshort"
            },
            {
                "name": "CallShortMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jshort"
            },
            {
                "name": "CallShortMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jshort"
            },
            {
                "name": "CallIntMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "..."
                ],
                "ret": "jint"
            },
            {
                "name": "CallIntMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jint"
            },
            {
                "name": "CallIntMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jint"
            },
            {
                "name": "CallLongMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "..."
                ],
                "ret": "jlong"
            },
            {
                "name": "CallLongMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jlong"
            },
            {
                "name": "CallLongMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jlong"
            },
            {
                "name": "CallFloatMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "..."
                ],
                "ret": "jfloat"
            },
            {
                "name": "CallFloatMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jfloat"
            },
            {
                "name": "CallFloatMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jfloat"
            },
            {
                "name": "CallDoubleMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "..."
                ],
                "ret": "jdouble"
            },
            {
                "name": "CallDoubleMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jdouble"
            },
            {
                "name": "CallDoubleMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jdouble"
            },
            {
                "name": "CallVoidMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "..."
                ],
                "ret": "void"
            },
            {
                "name": "CallVoidMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "void"
            },
            {
                "name": "CallVoidMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "void"
            },
            {
                "name": "CallNonvirtualObjectMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jobject"
            },
            {
                "name": "CallNonvirtualObjectMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jobject"
            },
            {
                "name": "CallNonvirtualObjectMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jobject"
            },
            {
                "name": "CallNonvirtualBooleanMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jboolean"
            },
            {
                "name": "CallNonvirtualBooleanMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jboolean"
            },
            {
                "name": "CallNonvirtualBooleanMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jboolean"
            },
            {
                "name": "CallNonvirtualByteMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jbyte"
            },
            {
                "name": "CallNonvirtualByteMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jbyte"
            },
            {
                "name": "CallNonvirtualByteMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jbyte"
            },
            {
                "name": "CallNonvirtualCharMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jchar"
            },
            {
                "name": "CallNonvirtualCharMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jchar"
            },
            {
                "name": "CallNonvirtualCharMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jchar"
            },
            {
                "name": "CallNonvirtualShortMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jshort"
            },
            {
                "name": "CallNonvirtualShortMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jshort"
            },
            {
                "name": "CallNonvirtualShortMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jshort"
            },
            {
                "name": "CallNonvirtualIntMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jint"
            },
            {
                "name": "CallNonvirtualIntMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jint"
            },
            {
                "name": "CallNonvirtualIntMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jint"
            },
            {
                "name": "CallNonvirtualLongMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jlong"
            },
            {
                "name": "CallNonvirtualLongMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jlong"
            },
            {
                "name": "CallNonvirtualLongMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jlong"
            },
            {
                "name": "CallNonvirtualFloatMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jfloat"
            },
            {
                "name": "CallNonvirtualFloatMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jfloat"
            },
            {
                "name": "CallNonvirtualFloatMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jfloat"
            },
            {
                "name": "CallNonvirtualDoubleMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jdouble"
            },
            {
                "name": "CallNonvirtualDoubleMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jdouble"
            },
            {
                "name": "CallNonvirtualDoubleMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jdouble"
            },
            {
                "name": "CallNonvirtualVoidMethod",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "void"
            },
            {
                "name": "CallNonvirtualVoidMethodV",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "void"
            },
            {
                "name": "CallNonvirtualVoidMethodA",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "void"
            },
            {
                "name": "GetFieldID",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "char*",
                    "char*"
                ],
                "ret": "jfieldID"
            },
            {
                "name": "GetObjectField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID"
                ],
                "ret": "jobject"
            },
            {
                "name": "GetBooleanField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID"
                ],
                "ret": "jboolean"
            },
            {
                "name": "GetByteField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID"
                ],
                "ret": "jbyte"
            },
            {
                "name": "GetCharField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID"
                ],
                "ret": "jchar"
            },
            {
                "name": "GetShortField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID"
                ],
                "ret": "jshort"
            },
            {
                "name": "GetIntField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID"
                ],
                "ret": "jint"
            },
            {
                "name": "GetLongField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID"
                ],
                "ret": "jlong"
            },
            {
                "name": "GetFloatField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID"
                ],
                "ret": "jfloat"
            },
            {
                "name": "GetDoubleField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID"
                ],
                "ret": "jdouble"
            },
            {
                "name": "SetObjectField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID",
                    "jobject"
                ],
                "ret": "void"
            },
            {
                "name": "SetBooleanField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID",
                    "jboolean"
                ],
                "ret": "void"
            },
            {
                "name": "SetByteField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID",
                    "jbyte"
                ],
                "ret": "void"
            },
            {
                "name": "SetCharField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID",
                    "jchar"
                ],
                "ret": "void"
            },
            {
                "name": "SetShortField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID",
                    "jshort"
                ],
                "ret": "void"
            },
            {
                "name": "SetIntField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "SetLongField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID",
                    "jlong"
                ],
                "ret": "void"
            },
            {
                "name": "SetFloatField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID",
                    "jfloat"
                ],
                "ret": "void"
            },
            {
                "name": "SetDoubleField",
                "args": [
                    "JNIEnv*",
                    "jobject",
                    "jfieldID",
                    "jdouble"
                ],
                "ret": "void"
            },
            {
                "name": "GetStaticMethodID",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "char*",
                    "char*"
                ],
                "ret": "jmethodID"
            },
            {
                "name": "CallStaticObjectMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jobject"
            },
            {
                "name": "CallStaticObjectMethodV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jobject"
            },
            {
                "name": "CallStaticObjectMethodA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jobject"
            },
            {
                "name": "CallStaticBooleanMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jboolean"
            },
            {
                "name": "CallStaticBooleanMethodV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jboolean"
            },
            {
                "name": "CallStaticBooleanMethodA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jboolean"
            },
            {
                "name": "CallStaticByteMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jbyte"
            },
            {
                "name": "CallStaticByteMethodV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jbyte"
            },
            {
                "name": "CallStaticByteMethodA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jbyte"
            },
            {
                "name": "CallStaticCharMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jchar"
            },
            {
                "name": "CallStaticCharMethodV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jchar"
            },
            {
                "name": "CallStaticCharMethodA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jchar"
            },
            {
                "name": "CallStaticShortMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jshort"
            },
            {
                "name": "CallStaticShortMethodV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jshort"
            },
            {
                "name": "CallStaticShortMethodA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jshort"
            },
            {
                "name": "CallStaticIntMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jint"
            },
            {
                "name": "CallStaticIntMethodV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jint"
            },
            {
                "name": "CallStaticIntMethodA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jint"
            },
            {
                "name": "CallStaticLongMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jlong"
            },
            {
                "name": "CallStaticLongMethodV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jlong"
            },
            {
                "name": "CallStaticLongMethodA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jlong"
            },
            {
                "name": "CallStaticFloatMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jfloat"
            },
            {
                "name": "CallStaticFloatMethodV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jfloat"
            },
            {
                "name": "CallStaticFloatMethodA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jfloat"
            },
            {
                "name": "CallStaticDoubleMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "jdouble"
            },
            {
                "name": "CallStaticDoubleMethodV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "jdouble"
            },
            {
                "name": "CallStaticDoubleMethodA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "jdouble"
            },
            {
                "name": "CallStaticVoidMethod",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "..."
                ],
                "ret": "void"
            },
            {
                "name": "CallStaticVoidMethodV",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "va_list"
                ],
                "ret": "void"
            },
            {
                "name": "CallStaticVoidMethodA",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jmethodID",
                    "jvalue*"
                ],
                "ret": "void"
            },
            {
                "name": "GetStaticFieldID",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "char*",
                    "char*"
                ],
                "ret": "jfieldID"
            },
            {
                "name": "GetStaticObjectField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID"
                ],
                "ret": "jobject"
            },
            {
                "name": "GetStaticBooleanField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID"
                ],
                "ret": "jboolean"
            },
            {
                "name": "GetStaticByteField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID"
                ],
                "ret": "jbyte"
            },
            {
                "name": "GetStaticCharField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID"
                ],
                "ret": "jchar"
            },
            {
                "name": "GetStaticShortField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID"
                ],
                "ret": "jshort"
            },
            {
                "name": "GetStaticIntField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID"
                ],
                "ret": "jint"
            },
            {
                "name": "GetStaticLongField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID"
                ],
                "ret": "jlong"
            },
            {
                "name": "GetStaticFloatField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID"
                ],
                "ret": "jfloat"
            },
            {
                "name": "GetStaticDoubleField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID"
                ],
                "ret": "jdouble"
            },
            {
                "name": "SetStaticObjectField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID",
                    "jobject"
                ],
                "ret": "void"
            },
            {
                "name": "SetStaticBooleanField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID",
                    "jboolean"
                ],
                "ret": "void"
            },
            {
                "name": "SetStaticByteField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID",
                    "jbyte"
                ],
                "ret": "void"
            },
            {
                "name": "SetStaticCharField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID",
                    "jchar"
                ],
                "ret": "void"
            },
            {
                "name": "SetStaticShortField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID",
                    "jshort"
                ],
                "ret": "void"
            },
            {
                "name": "SetStaticIntField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "SetStaticLongField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID",
                    "jlong"
                ],
                "ret": "void"
            },
            {
                "name": "SetStaticFloatField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID",
                    "jfloat"
                ],
                "ret": "void"
            },
            {
                "name": "SetStaticDoubleField",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "jfieldID",
                    "jdouble"
                ],
                "ret": "void"
            },
            {
                "name": "NewString",
                "args": [
                    "JNIEnv*",
                    "jchar*",
                    "jsize"
                ],
                "ret": "jstring"
            },
            {
                "name": "GetStringLength",
                "args": [
                    "JNIEnv*",
                    "jstring"
                ],
                "ret": "jsize"
            },
            {
                "name": "GetStringChars",
                "args": [
                    "JNIEnv*",
                    "jstring",
                    "jboolean*"
                ],
                "ret": "jchar"
            },
            {
                "name": "ReleaseStringChars",
                "args": [
                    "JNIEnv*",
                    "jstring",
                    "jchar*"
                ],
                "ret": "void"
            },
            {
                "name": "NewStringUTF",
                "args": [
                    "JNIEnv*",
                    "char*"
                ],
                "ret": "jstring"
            },
            {
                "name": "GetStringUTFLength",
                "args": [
                    "JNIEnv*",
                    "jstring"
                ],
                "ret": "jsize"
            },
            {
                "name": "GetStringUTFChars",
                "args": [
                    "JNIEnv*",
                    "jstring",
                    "jboolean*"
                ],
                "ret": "char*"
            },
            {
                "name": "ReleaseStringUTFChars",
                "args": [
                    "JNIEnv*",
                    "jstring",
                    "char*"
                ],
                "ret": "void"
            },
            {
                "name": "GetArrayLength",
                "args": [
                    "JNIEnv*",
                    "jarray"
                ],
                "ret": "jsize"
            },
            {
                "name": "NewObjectArray",
                "args": [
                    "JNIEnv*",
                    "jsize",
                    "jclass",
                    "jobject"
                ],
                "ret": "jobjectArray"
            },
            {
                "name": "GetObjectArrayElement",
                "args": [
                    "JNIEnv*",
                    "jobjectArray",
                    "jsize"
                ],
                "ret": "jobject"
            },
            {
                "name": "SetObjectArrayElement",
                "args": [
                    "JNIEnv*",
                    "jobjectArray",
                    "jsize",
                    "jobject"
                ],
                "ret": "void"
            },
            {
                "name": "NewBooleanArray",
                "args": [
                    "JNIEnv*",
                    "jsize"
                ],
                "ret": "jbooleanArray"
            },
            {
                "name": "NewByteArray",
                "args": [
                    "JNIEnv*",
                    "jsize"
                ],
                "ret": "jbyteArray"
            },
            {
                "name": "NewCharArray",
                "args": [
                    "JNIEnv*",
                    "jsize"
                ],
                "ret": "jcharArray"
            },
            {
                "name": "NewShortArray",
                "args": [
                    "JNIEnv*",
                    "jsize"
                ],
                "ret": "jshortArray"
            },
            {
                "name": "NewIntArray",
                "args": [
                    "JNIEnv*",
                    "jsize"
                ],
                "ret": "jintArray"
            },
            {
                "name": "NewLongArray",
                "args": [
                    "JNIEnv*",
                    "jsize"
                ],
                "ret": "jlongArray"
            },
            {
                "name": "NewFloatArray",
                "args": [
                    "JNIEnv*",
                    "jsize"
                ],
                "ret": "jfloatArray"
            },
            {
                "name": "NewDoubleArray",
                "args": [
                    "JNIEnv*",
                    "jsize"
                ],
                "ret": "jdoubleArray"
            },
            {
                "name": "GetBooleanArrayElements",
                "args": [
                    "JNIEnv*",
                    "jbooleanArray",
                    "jboolean*"
                ],
                "ret": "jboolean*"
            },
            {
                "name": "GetByteArrayElements",
                "args": [
                    "JNIEnv*",
                    "jbyteArray",
                    "jboolean*"
                ],
                "ret": "jbyte*"
            },
            {
                "name": "GetCharArrayElements",
                "args": [
                    "JNIEnv*",
                    "jcharArray",
                    "jboolean*"
                ],
                "ret": "jchar*"
            },
            {
                "name": "GetShortArrayElements",
                "args": [
                    "JNIEnv*",
                    "jshortArray",
                    "jboolean*"
                ],
                "ret": "jshort*"
            },
            {
                "name": "GetIntArrayElements",
                "args": [
                    "JNIEnv*",
                    "jintArray",
                    "jboolean*"
                ],
                "ret": "jint*"
            },
            {
                "name": "GetLongArrayElements",
                "args": [
                    "JNIEnv*",
                    "jlongArray",
                    "jboolean*"
                ],
                "ret": "jlong*"
            },
            {
                "name": "GetFloatArrayElements",
                "args": [
                    "JNIEnv*",
                    "jfloatArray",
                    "jboolean*"
                ],
                "ret": "jfloat*"
            },
            {
                "name": "GetDoubleArrayElements",
                "args": [
                    "JNIEnv*",
                    "jdoubleArray",
                    "jboolean*"
                ],
                "ret": "jdouble*"
            },
            {
                "name": "ReleaseBooleanArrayElements",
                "args": [
                    "JNIEnv*",
                    "jbooleanArray",
                    "jboolean*",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "ReleaseByteArrayElements",
                "args": [
                    "JNIEnv*",
                    "jbyteArray",
                    "jbyte*",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "ReleaseCharArrayElements",
                "args": [
                    "JNIEnv*",
                    "jcharArray",
                    "jchar*",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "ReleaseShortArrayElements",
                "args": [
                    "JNIEnv*",
                    "jshortArray",
                    "jshort*",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "ReleaseIntArrayElements",
                "args": [
                    "JNIEnv*",
                    "jintArray",
                    "jint*",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "ReleaseLongArrayElements",
                "args": [
                    "JNIEnv*",
                    "jlongArray",
                    "jlong*",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "ReleaseFloatArrayElements",
                "args": [
                    "JNIEnv*",
                    "jfloatArray",
                    "jfloat*",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "ReleaseDoubleArrayElements",
                "args": [
                    "JNIEnv*",
                    "jdoubleArray",
                    "jdouble*",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "GetBooleanArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jbooleanArray",
                    "jsize",
                    "jsize",
                    "jboolean*"
                ],
                "ret": "void"
            },
            {
                "name": "GetByteArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jbyteArray",
                    "jsize",
                    "jsize",
                    "jbyte*"
                ],
                "ret": "void"
            },
            {
                "name": "GetCharArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jcharArray",
                    "jsize",
                    "jsize",
                    "jchar*"
                ],
                "ret": "void"
            },
            {
                "name": "GetShortArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jshortArray",
                    "jsize",
                    "jsize",
                    "jshort*"
                ],
                "ret": "void"
            },
            {
                "name": "GetIntArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jintArray",
                    "jsize",
                    "jsize",
                    "jint*"
                ],
                "ret": "void"
            },
            {
                "name": "GetLongArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jlongArray",
                    "jsize",
                    "jsize",
                    "jlong*"
                ],
                "ret": "void"
            },
            {
                "name": "GetFloatArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jfloatArray",
                    "jsize",
                    "jsize",
                    "jfloat*"
                ],
                "ret": "void"
            },
            {
                "name": "GetDoubleArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jdoubleArray",
                    "jsize",
                    "jsize",
                    "jdouble*"
                ],
                "ret": "void"
            },
            {
                "name": "SetBooleanArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jbooleanArray",
                    "jsize",
                    "jsize",
                    "jboolean*"
                ],
                "ret": "void"
            },
            {
                "name": "SetByteArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jbyteArray",
                    "jsize",
                    "jsize",
                    "jbyte*"
                ],
                "ret": "void"
            },
            {
                "name": "SetCharArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jcharArray",
                    "jsize",
                    "jsize",
                    "jchar*"
                ],
                "ret": "void"
            },
            {
                "name": "SetShortArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jshortArray",
                    "jsize",
                    "jsize",
                    "jshort*"
                ],
                "ret": "void"
            },
            {
                "name": "SetIntArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jintArray",
                    "jsize",
                    "jsize",
                    "jint*"
                ],
                "ret": "void"
            },
            {
                "name": "SetLongArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jlongArray",
                    "jsize",
                    "jsize",
                    "jlong*"
                ],
                "ret": "void"
            },
            {
                "name": "SetFloatArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jfloatArray",
                    "jsize",
                    "jsize",
                    "jfloat*"
                ],
                "ret": "void"
            },
            {
                "name": "SetDoubleArrayRegion",
                "args": [
                    "JNIEnv*",
                    "jdoubleArray",
                    "jsize",
                    "jsize",
                    "jdouble*"
                ],
                "ret": "void"
            },
            {
                "name": "RegisterNatives",
                "args": [
                    "JNIEnv*",
                    "jclass",
                    "JNINativeMethod*",
                    "jint"
                ],
                "ret": "jint"
            },
            {
                "name": "UnregisterNatives",
                "args": [
                    "JNIEnv*",
                    "jclass"
                ],
                "ret": "jint"
            },
            {
                "name": "MonitorEnter",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jint"
            },
            {
                "name": "MonitorExit",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jint"
            },
            {
                "name": "GetJavaVM",
                "args": [
                    "JNIEnv*",
                    "JavaVM**"
                ],
                "ret": "jint"
            },
            {
                "name": "GetStringRegion",
                "args": [
                    "JNIEnv*",
                    "jstring",
                    "jsize",
                    "jsize",
                    "jchar*"
                ],
                "ret": "void"
            },
            {
                "name": "GetStringUTFRegion",
                "args": [
                    "JNIEnv*",
                    "jstring",
                    "jsize",
                    "jsize",
                    "char*"
                ],
                "ret": "void"
            },
            {
                "name": "GetPrimitiveArrayCritical",
                "args": [
                    "JNIEnv*",
                    "jarray",
                    "jboolean*"
                ],
                "ret": "void"
            },
            {
                "name": "ReleasePrimitiveArrayCritical",
                "args": [
                    "JNIEnv*",
                    "jarray",
                    "void*",
                    "jint"
                ],
                "ret": "void"
            },
            {
                "name": "GetStringCritical",
                "args": [
                    "JNIEnv*",
                    "jstring",
                    "jboolean*"
                ],
                "ret": "jchar"
            },
            {
                "name": "ReleaseStringCritical",
                "args": [
                    "JNIEnv*",
                    "jstring",
                    "jchar*"
                ],
                "ret": "void"
            },
            {
                "name": "NewWeakGlobalRef",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jweak"
            },
            {
                "name": "DeleteWeakGlobalRef",
                "args": [
                    "JNIEnv*",
                    "jweak"
                ],
                "ret": "void"
            },
            {
                "name": "ExceptionCheck",
                "args": [
                    "JNIEnv*"
                ],
                "ret": "jboolean"
            },
            {
                "name": "NewDirectByteBuffer",
                "args": [
                    "JNIEnv*",
                    "void*",
                    "jlong"
                ],
                "ret": "jobject"
            },
            {
                "name": "GetDirectBufferAddress",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "void"
            },
            {
                "name": "GetDirectBufferCapacity",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jlong"
            },
            {
                "name": "GetObjectRefType",
                "args": [
                    "JNIEnv*",
                    "jobject"
                ],
                "ret": "jobjectRefType"
            }
        ]

    },{}],3:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const jni_env_interceptor_1 = require("../jni_env_interceptor");
        class JNIEnvInterceptorARM64 extends jni_env_interceptor_1.JNIEnvInterceptor {
            constructor(references, threads, transport) {
                super(references, threads, transport);
                this.stack = NULL;
                this.stackIndex = 0;
                this.grTop = NULL;
                this.vrTop = NULL;
                this.grOffs = 0;
                this.grOffsIndex = 0;
                this.vrOffs = 0;
                this.vrOffsIndex = 0;
            }
            createStubFunction() {
                const stub = Memory.alloc(Process.pageSize);
                Memory.patchCode(stub, Process.pageSize, (code) => {
                    const cw = new Arm64Writer(code, { pc: stub });
                    // ret
                    const RET = 0xd65f03c0;
                    cw.putInstruction(RET);
                });
                return stub;
            }
            buildVaArgParserShellcode(text, data, parser) {
                const DATA_OFFSET = 0x400;
                const BITS_IN_BYTE = 8;
                const HALF = 2;
                const NUM_REGS = 31;
                const NUM_REG_NO_LR = 30;
                text.add(DATA_OFFSET).writePointer(parser);
                Memory.patchCode(text, Process.pageSize, (code) => {
                    const cw = new Arm64Writer(code, { pc: text });
                    // adrp x0, #0
                    const ADRP_X0_0 = 0x90000000;
                    cw.putInstruction(ADRP_X0_0);
                    // back up all registers - just to be safe
                    for (let i = 1; i < NUM_REGS; i++) {
                        let ins = 0xF9000000;
                        // src reg
                        ins += i;
                        const base = 0x408;
                        const offset = base + i * Process.pointerSize;
                        // dst address
                        ins += offset / HALF << BITS_IN_BYTE;
                        // str x<n>, [x0, #<offset>]
                        cw.putInstruction(ins);
                    }
                    // ldr x0, [x0, #0x400]
                    const LDR_X0_X0_400 = 0xF9420000;
                    cw.putInstruction(LDR_X0_X0_400);
                    // blr x0
                    const BLR_X0 = 0xD63F0000;
                    cw.putInstruction(BLR_X0);
                    cw.putPushRegReg("x0", "sp");
                    // adrp x0, #0
                    cw.putInstruction(ADRP_X0_0);
                    // restore all registers - apart from lr and sp
                    for (let i = 1; i < NUM_REG_NO_LR; i++) {
                        let ins = 0xF9400000;
                        // src reg
                        ins += i;
                        const base = 0x408;
                        const offset = base + i * Process.pointerSize;
                        // dst address
                        ins += offset / HALF << BITS_IN_BYTE;
                        // ldr x<n>, [x0, #<offset>]
                        cw.putInstruction(ins);
                    }
                    cw.putPopRegReg("x0", "sp");
                    // blr x0
                    cw.putInstruction(BLR_X0);
                    // adrp x1, #0
                    const ADRP_X1_0 = 0x90000001;
                    cw.putInstruction(ADRP_X1_0);
                    // ldr x2, [x1, #0x4f8]
                    const LDR_X2_X1_4F8 = 0xF9427C22;
                    cw.putInstruction(LDR_X2_X1_4F8);
                    // br x2
                    const BR_X2 = 0xD61F0040;
                    cw.putInstruction(BR_X2);
                    cw.flush();
                });
            }
            setUpVaListArgExtract(vaList) {
                const vrStart = 2;
                const grOffset = 3;
                const vrOffset = 4;
                this.stack = vaList.readPointer();
                this.stackIndex = 0;
                this.grTop = vaList.add(Process.pointerSize).readPointer();
                this.vrTop = vaList.add(Process.pointerSize * vrStart).readPointer();
                this.grOffs = vaList.add(Process.pointerSize * grOffset).readS32();
                this.grOffsIndex = 0;
                this.vrOffs = vaList.add(Process.pointerSize * grOffset + vrOffset).readS32();
                this.vrOffsIndex = 0;
            }
            extractVaListArgValue(method, paramId) {
                const MAX_VR_REG_NUM = 8;
                const VR_REG_SIZE = 2;
                const MAX_GR_REG_NUM = 4;
                let currentPtr = NULL;
                if (method.fridaParams[paramId] === "float" ||
                    method.fridaParams[paramId] === "double") {
                    if (this.vrOffsIndex < MAX_VR_REG_NUM) {
                        currentPtr = this.vrTop
                            .add(this.vrOffs)
                            .add(this.vrOffsIndex * Process.pointerSize * VR_REG_SIZE);
                        this.vrOffsIndex++;
                    }
                    else {
                        currentPtr = this.stack.add(this.stackIndex * Process.pointerSize);
                        this.stackIndex++;
                    }
                }
                else {
                    if (this.grOffsIndex < MAX_GR_REG_NUM) {
                        currentPtr = this.grTop
                            .add(this.grOffs)
                            .add(this.grOffsIndex * Process.pointerSize);
                        this.grOffsIndex++;
                    }
                    else {
                        currentPtr = this.stack.add(this.stackIndex * Process.pointerSize);
                        this.stackIndex++;
                    }
                }
                return currentPtr;
            }
            resetVaListArgExtract() {
                this.stack = NULL;
                this.stackIndex = 0;
                this.grTop = NULL;
                this.vrTop = NULL;
                this.grOffs = 0;
                this.grOffsIndex = 0;
                this.vrOffs = 0;
                this.vrOffsIndex = 0;
            }
        }
        exports.JNIEnvInterceptorARM64 = JNIEnvInterceptorARM64;
        ;
    },{"../jni_env_interceptor":7}],4:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const jni_env_interceptor_1 = require("../jni_env_interceptor");
        const types_1 = require("../../utils/types");
        class JNIEnvInterceptorARM extends jni_env_interceptor_1.JNIEnvInterceptor {
            constructor(references, threads, transport) {
                super(references, threads, transport);
                this.vaList = NULL;
                this.vaListOffset = 0;
            }
            createStubFunction() {
                const stub = Memory.alloc(Process.pageSize);
                Memory.patchCode(stub, Process.pageSize, (code) => {
                    const cw = new ArmWriter(code, { pc: stub });
                    // push { lr }
                    const PUSH_LR = 0xe52de004;
                    cw.putInstruction(PUSH_LR);
                    // pop { pc }
                    const POP_PC = 0xe49df004;
                    cw.putInstruction(POP_PC);
                });
                return stub;
            }
            buildVaArgParserShellcode(text, data, parser) {
                const DATA_OFFSET = 0x400;
                text.add(DATA_OFFSET).writePointer(parser);
                Memory.patchCode(text, Process.pageSize, (code) => {
                    const cw = new ArmWriter(code, { pc: text });
                    // nops for the context interceptor to overwrite
                    cw.putNop();
                    cw.putNop();
                    cw.putNop();
                    cw.putNop();
                    // str r0, [pc, #0x400]
                    const STR_R0_400 = 0xe58f0400;
                    cw.putInstruction(STR_R0_400);
                    // str r1, [pc, #0x400]
                    const STR_R1_400 = 0xe58f1400;
                    cw.putInstruction(STR_R1_400);
                    // str r2, [pc, #0x400]
                    const STR_R2_400 = 0xe58f2400;
                    cw.putInstruction(STR_R2_400);
                    // str r3, [pc, #0x400]
                    const STR_R3_400 = 0xe58f3400;
                    cw.putInstruction(STR_R3_400);
                    // str lr, [pc, #0x400]
                    const STR_LR_400 = 0xe58fe400;
                    cw.putInstruction(STR_LR_400);
                    // ldr r0, [pc, #0x3e4]
                    const LDR_R0_3E4 = 0xe59f03d4;
                    cw.putInstruction(LDR_R0_3E4);
                    // blx r0
                    const BLX_R0 = 0xe12fff30;
                    cw.putInstruction(BLX_R0);
                    // ldr r1, [pc, 0x3e0]
                    const LDR_R1_3E0 = 0xe59f13e8;
                    cw.putInstruction(LDR_R1_3E0);
                    // ldr r2, [pc, 0x3e0]
                    const LDR_R2_3E0 = 0xe59f23e8;
                    cw.putInstruction(LDR_R2_3E0);
                    // ldr r3, [pc, 0x3e0]
                    const LDR_R3_3E0 = 0xe59f33e8;
                    cw.putInstruction(LDR_R3_3E0);
                    //blx r0
                    cw.putInstruction(BLX_R0);
                    // ldr r1, [pc, #0x3e4]
                    const LDR_R1_3E4 = 0xe59f13e4;
                    cw.putInstruction(LDR_R1_3E4);
                    // bx r1
                    const BX_R1 = 0xe12fff11;
                    cw.putInstruction(BX_R1);
                    cw.flush();
                });
            }
            setUpVaListArgExtract(vaList) {
                this.vaList = vaList;
                this.vaListOffset = 0;
            }
            extractVaListArgValue(method, paramId) {
                const currentPtr = this.vaList.add(this.vaListOffset);
                this.vaListOffset += types_1.Types.sizeOf(method.fridaParams[paramId]);
                return currentPtr;
            }
            resetVaListArgExtract() {
                this.vaList = NULL;
                this.vaListOffset = 0;
            }
        }
        exports.JNIEnvInterceptorARM = JNIEnvInterceptorARM;
    },{"../../utils/types":17,"../jni_env_interceptor":7}],5:[function(require,module,exports){
        "use strict";
        var __importDefault = (this && this.__importDefault) || function (mod) {
            return (mod && mod.__esModule) ? mod : { "default": mod };
        };
        Object.defineProperty(exports, "__esModule", { value: true });
        const java_vm_json_1 = __importDefault(require("../data/java_vm.json"));
        class JavaVM {
            constructor() {
                this._methods = java_vm_json_1.default;
            }
            get methods() {
                return this._methods;
            }
            static getInstance() {
                if (JavaVM.instance === undefined) {
                    JavaVM.instance = new JavaVM();
                }
                return JavaVM.instance;
            }
        }
        exports.JavaVM = JavaVM;
    },{"../data/java_vm.json":1}],6:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const java_vm_1 = require("./java_vm");
        const types_1 = require("../utils/types");
        const method_data_1 = require("../utils/method_data");
        const JAVA_VM_INDEX = 0;
        const COPY_ARRAY_INDEX = 0;
        const JNI_OK = 0;
        const JNI_ENV_INDEX = 1;
        class JavaVMInterceptor {
            constructor(references, threads, transport, jniEnvInterceptor) {
                this.references = references;
                this.threads = threads;
                this.transport = transport;
                this.jniEnvInterceptor = jniEnvInterceptor;
                this.shadowJavaVM = NULL;
            }
            isInitialised() {
                return !this.shadowJavaVM.isNull();
            }
            get() {
                return this.shadowJavaVM;
            }
            create() {
                const javaVMOffset = 3;
                const javaVMLength = 8;
                const javaVM = this.threads.getJavaVM();
                const newJavaVMStruct = Memory.alloc(Process.pointerSize * javaVMLength);
                this.references.add(newJavaVMStruct);
                const newJavaVM = Memory.alloc(Process.pointerSize);
                newJavaVM.writePointer(newJavaVMStruct);
                for (let i = javaVMOffset; i < javaVMLength; i++) {
                    const offset = i * Process.pointerSize;
                    const javaVMStruct = javaVM.readPointer();
                    const methodAddr = javaVMStruct.add(offset).readPointer();
                    const callback = this.createJavaVMIntercept(i, methodAddr);
                    const trampoline = this.jniEnvInterceptor.createStubFunction();
                    this.references.add(trampoline);
                    // ensure the CpuContext will be populated
                    Interceptor.replace(trampoline, callback);
                    newJavaVMStruct.add(offset).writePointer(trampoline);
                }
                this.shadowJavaVM = newJavaVM;
                return newJavaVM;
            }
            createJavaVMIntercept(id, methodAddr) {
                const self = this;
                const method = java_vm_1.JavaVM.getInstance().methods[id];
                const fridaArgs = method.args.map((a) => types_1.Types.convertNativeJTypeToFridaType(a));
                const fridaRet = types_1.Types.convertNativeJTypeToFridaType(method.ret);
                const nativeFunction = new NativeFunction(methodAddr, fridaRet, fridaArgs);
                const nativeCallback = new NativeCallback(function () {
                    const threadId = this.threadId;
                    const javaVM = self.threads.getJavaVM();
                    let localArgs = [].slice.call(arguments);
                    let jniEnv = NULL;
                    localArgs[JAVA_VM_INDEX] = javaVM;
                    const clonedArgs = localArgs.slice(COPY_ARRAY_INDEX);
                    const ret = nativeFunction.apply(null, localArgs);
                    const data = new method_data_1.MethodData(method, clonedArgs, ret);
                    self.transport.reportJavaVMCall(data, this.context);
                    if (method.name === "GetEnv" ||
                        method.name === "AttachCurrentThread" ||
                        method.name === "AttachCurrentThreadAsDaemon") {
                        if (ret === JNI_OK) {
                            self.threads.setJNIEnv(threadId, localArgs[JNI_ENV_INDEX].readPointer());
                        }
                        if (!self.jniEnvInterceptor.isInitialised()) {
                            jniEnv = self.jniEnvInterceptor.create();
                        }
                        else {
                            jniEnv = self.jniEnvInterceptor.get();
                        }
                        localArgs[JNI_ENV_INDEX].writePointer(jniEnv);
                    }
                    return ret;
                }, fridaRet, fridaArgs);
                this.references.add(nativeCallback);
                return nativeCallback;
            }
        }
        exports.JavaVMInterceptor = JavaVMInterceptor;
        ;
    },{"../utils/method_data":15,"../utils/types":17,"./java_vm":5}],7:[function(require,module,exports){
        "use strict";
        var __importDefault = (this && this.__importDefault) || function (mod) {
            return (mod && mod.__esModule) ? mod : { "default": mod };
        };
        Object.defineProperty(exports, "__esModule", { value: true });
        const types_1 = require("../utils/types");
        const java_method_1 = require("../utils/java_method");
        const method_data_1 = require("../utils/method_data");
        const config_1 = require("../utils/config");
        const jni_env_json_1 = __importDefault(require("../data/jni_env.json"));
        const TYPE_NAME_START = 0;
        const TYPE_NAME_END = -1;
        const COPY_ARRAY_INDEX = 0;
        const JNI_ENV_INDEX = 0;
        class JNIEnvInterceptor {
            constructor(references, threads, transport) {
                this.shadowJNIEnv = NULL;
                this.methods = {};
                this.fastMethodLookup = {};
                this.vaArgsBacktraces = {};
                this.references = references;
                this.threads = threads;
                this.transport = transport;
                this.javaVMInterceptor = null;
                this.vaArgsBacktraces = {};
            }
            isInitialised() {
                return !this.shadowJNIEnv.equals(NULL);
            }
            get() {
                return this.shadowJNIEnv;
            }
            create() {
                const END_INDEX = 1;
                const threadId = Process.getCurrentThreadId();
                const jniEnv = this.threads.getJNIEnv(threadId);
                const jniEnvOffset = 4;
                const jniEnvLength = 232;
                const newJNIEnvStruct = Memory.alloc(Process.pointerSize * jniEnvLength);
                this.references.add(newJNIEnvStruct);
                const newJNIEnv = Memory.alloc(Process.pointerSize);
                newJNIEnv.writePointer(newJNIEnvStruct);
                this.references.add(newJNIEnv);
                for (let i = jniEnvOffset; i < jniEnvLength; i++) {
                    const method = jni_env_json_1.default[i];
                    const offset = i * Process.pointerSize;
                    const jniEnvStruct = jniEnv.readPointer();
                    const methodAddr = jniEnvStruct.add(offset).readPointer();
                    if (method.args[method.args.length - END_INDEX] === "...") {
                        const callback = this.createJNIVarArgIntercept(i, methodAddr);
                        const trampoline = this.createStubFunction();
                        this.references.add(trampoline);
                        // ensure the CpuContext will be populated
                        Interceptor.replace(trampoline, callback);
                        newJNIEnvStruct.add(offset).writePointer(trampoline);
                    }
                    else {
                        const callback = this.createJNIIntercept(i, methodAddr);
                        const trampoline = this.createStubFunction();
                        this.references.add(trampoline);
                        // ensure the CpuContext will be populated
                        Interceptor.replace(trampoline, callback);
                        newJNIEnvStruct.add(offset).writePointer(trampoline);
                    }
                }
                this.shadowJNIEnv = newJNIEnv;
                return newJNIEnv;
            }
            setJavaVMInterceptor(javaVMInterceptor) {
                this.javaVMInterceptor = javaVMInterceptor;
            }
            createStubFunction() {
                return new NativeCallback(() => { }, 'void', []);
            }
            createJNIVarArgIntercept(id, methodPtr) {
                const self = this;
                const method = jni_env_json_1.default[id];
                const text = Memory.alloc(Process.pageSize);
                const data = Memory.alloc(Process.pageSize);
                this.references.add(text);
                this.references.add(data);
                const vaArgsCallback = this.createJNIVarArgInitialCallback(method, methodPtr);
                this.references.add(vaArgsCallback);
                self.buildVaArgParserShellcode(text, data, vaArgsCallback);
                const config = config_1.Config.getInstance();
                Interceptor.attach(text, function () {
                    let backtraceType = Backtracer.ACCURATE;
                    if (config.backtrace === "fuzzy") {
                        backtraceType = config.backtrace;
                    }
                    self.vaArgsBacktraces[this.threadId] =
                        Thread.backtrace(this.context, backtraceType);
                });
                return text;
            }
            addJavaArgsForJNIIntercept(method, args) {
                const LAST_INDEX = -1;
                const FIRST_INDEX = 0;
                const METHOD_ID_INDEX = 2;
                const lastParamType = method.args.slice(LAST_INDEX)[FIRST_INDEX];
                if (!["va_list", "jvalue*"].includes(lastParamType)) {
                    return args.slice(COPY_ARRAY_INDEX);
                }
                const clonedArgs = args.slice(COPY_ARRAY_INDEX);
                const midPtr = args[METHOD_ID_INDEX];
                const javaMethod = this.methods[midPtr.toString()];
                const nativeJTypes = javaMethod.nativeParams;
                const readPtr = args.slice(LAST_INDEX)[FIRST_INDEX];
                if (lastParamType === "va_list") {
                    this.setUpVaListArgExtract(readPtr);
                }
                const UNION_SIZE = 8;
                for (let i = 0; i < nativeJTypes.length; i++) {
                    const type = types_1.Types.convertNativeJTypeToFridaType(nativeJTypes[i]);
                    let val;
                    if (lastParamType === "va_list") {
                        const currentPtr = this.extractVaListArgValue(javaMethod, i);
                        val = this.readValue(currentPtr, type, true);
                    }
                    else {
                        val = this.readValue(readPtr.add(UNION_SIZE * i), type);
                    }
                    clonedArgs.push(val);
                }
                if (lastParamType === "va_list") {
                    this.resetVaListArgExtract();
                }
                return clonedArgs;
            }
            handleGetMethodResult(args, ret) {
                const SIG_INDEX = 3;
                const signature = args[SIG_INDEX].readCString();
                if (signature !== null) {
                    const methodSig = new java_method_1.JavaMethod(signature);
                    this.methods[ret.toString()] = methodSig;
                }
            }
            handleGetJavaVM(args, ret) {
                if (this.javaVMInterceptor !== null) {
                    const JNI_OK = 0;
                    const JAVA_VM_INDEX = 1;
                    if (ret === JNI_OK) {
                        const javaVMPtr = args[JAVA_VM_INDEX];
                        this.threads.setJavaVM(javaVMPtr.readPointer());
                        let javaVM;
                        if (!this.javaVMInterceptor.isInitialised()) {
                            javaVM = this.javaVMInterceptor.create();
                        }
                        else {
                            javaVM = this.javaVMInterceptor.get();
                        }
                        javaVMPtr.writePointer(javaVM);
                    }
                }
            }
            handleRegisterNatives(args) {
                const METHOD_INDEX = 2;
                const SIZE_INDEX = 3;
                const JNI_METHOD_SIZE = 3;
                const self = this;
                const methods = args[METHOD_INDEX];
                const size = args[SIZE_INDEX];
                for (let i = 0; i < size * JNI_METHOD_SIZE; i += JNI_METHOD_SIZE) {
                    const methodsPtr = methods;
                    const namePtr = methodsPtr
                        .add(i * Process.pointerSize)
                        .readPointer();
                    const name = namePtr.readCString();
                    const sigOffset = 1;
                    const sigPtr = methodsPtr
                        .add((i + sigOffset) * Process.pointerSize)
                        .readPointer();
                    const sig = sigPtr.readCString();
                    const addrOffset = 2;
                    const addr = methodsPtr
                        .add((i + addrOffset) * Process.pointerSize)
                        .readPointer();
                    if (name === null || sig === null) {
                        continue;
                    }
                    Interceptor.attach(addr, {
                        onEnter(args) {
                            const check = name + sig;
                            const config = config_1.Config.getInstance();
                            const EMPTY_ARRAY_LEN = 0;
                            if (config.includeExport.length > EMPTY_ARRAY_LEN) {
                                const included = config.includeExport.filter((i) => check.includes(i));
                                if (included.length === EMPTY_ARRAY_LEN) {
                                    return;
                                }
                            }
                            if (config.excludeExport.length > EMPTY_ARRAY_LEN) {
                                const excluded = config.excludeExport.filter((e) => check.includes(e));
                                if (excluded.length > EMPTY_ARRAY_LEN) {
                                    return;
                                }
                            }
                            if (!self.threads.hasJNIEnv(this.threadId)) {
                                self.threads.setJNIEnv(this.threadId, args[JNI_ENV_INDEX]);
                            }
                            args[JNI_ENV_INDEX] = self.shadowJNIEnv;
                        }
                    });
                }
            }
            handleJNIInterceptResult(method, args, ret) {
                const name = method.name;
                if (["GetMethodID", "GetStaticMethodID"].includes(name)) {
                    this.handleGetMethodResult(args, ret);
                }
                else if (method.name === "GetJavaVM") {
                    this.handleGetJavaVM(args, ret);
                }
                else if (method.name === "RegisterNatives") {
                    this.handleRegisterNatives(args);
                }
            }
            createJNIIntercept(id, methodPtr) {
                const self = this;
                const METHOD_ID_INDEX = 2;
                const method = jni_env_json_1.default[id];
                const paramTypes = method.args.map((t) => types_1.Types.convertNativeJTypeToFridaType(t));
                const retType = types_1.Types.convertNativeJTypeToFridaType(method.ret);
                const nativeFunction = new NativeFunction(methodPtr, retType, paramTypes);
                const nativeCallback = new NativeCallback(function () {
                    const threadId = this.threadId;
                    const jniEnv = self.threads.getJNIEnv(threadId);
                    const args = [].slice.call(arguments);
                    args[JNI_ENV_INDEX] = jniEnv;
                    const clonedArgs = self.addJavaArgsForJNIIntercept(method, args);
                    const ret = nativeFunction.apply(null, args);
                    let jmethod = undefined;
                    if (args.length !== clonedArgs.length) {
                        const key = args[METHOD_ID_INDEX].toString();
                        jmethod = self.methods[key];
                    }
                    const data = new method_data_1.MethodData(method, clonedArgs, ret, jmethod);
                    self.transport.reportJNIEnvCall(data, this.context);
                    self.handleJNIInterceptResult(method, args, ret);
                    return ret;
                }, retType, paramTypes);
                this.references.add(nativeCallback);
                return nativeCallback;
            }
            createJNIVarArgMainCallback(method, methodPtr, initialparamTypes, mainParamTypes, retType) {
                const self = this;
                const mainCallback = new NativeCallback(function () {
                    const METHOD_ID_INDEX = 2;
                    const threadId = this.threadId;
                    const args = [].slice.call(arguments);
                    const jniEnv = self.threads.getJNIEnv(threadId);
                    const key = args[METHOD_ID_INDEX].toString();
                    const jmethod = self.methods[key];
                    args[JNI_ENV_INDEX] = jniEnv;
                    const ret = new NativeFunction(methodPtr, retType, initialparamTypes).apply(null, args);
                    const data = new method_data_1.MethodData(method, args, ret, jmethod);
                    self.transport.reportJNIEnvCall(data, self.vaArgsBacktraces[this.threadId]);
                    delete self.vaArgsBacktraces[this.threadId];
                    return ret;
                }, retType, mainParamTypes);
                return mainCallback;
            }
            createJNIVarArgInitialCallback(method, methodPtr) {
                const self = this;
                const vaArgsCallback = new NativeCallback(function () {
                    const METHOD_ID_INDEX = 2;
                    const methodId = arguments[METHOD_ID_INDEX];
                    const javaMethod = self.methods[methodId];
                    if (self.fastMethodLookup[methodId] !== undefined) {
                        return self.fastMethodLookup[methodId];
                    }
                    const originalParams = method.args
                        .slice(TYPE_NAME_START, TYPE_NAME_END)
                        .map((t) => types_1.Types.convertNativeJTypeToFridaType(t));
                    const callbackParams = originalParams.slice(COPY_ARRAY_INDEX);
                    originalParams.push("...");
                    javaMethod.fridaParams.forEach((p) => {
                        callbackParams.push(p === "float" ? "double" : p);
                        originalParams.push(p);
                    });
                    const retType = types_1.Types.convertNativeJTypeToFridaType(method.ret);
                    const mainCallback = self.createJNIVarArgMainCallback(method, methodPtr, originalParams, callbackParams, retType);
                    self.references.add(mainCallback);
                    self.fastMethodLookup[methodId] = mainCallback;
                    return mainCallback;
                }, "pointer", ["pointer", "pointer", "pointer"]);
                return vaArgsCallback;
            }
            readValue(currentPtr, type, extend) {
                let val = NULL;
                if (type === "char") {
                    val = currentPtr.readS8();
                }
                else if (type === "int16") {
                    val = currentPtr.readS16();
                }
                else if (type === "uint16") {
                    val = currentPtr.readU16();
                }
                else if (type === "int") {
                    val = currentPtr.readS32();
                }
                else if (type === "int64") {
                    val = currentPtr.readS64();
                }
                else if (type === "float") {
                    if (extend === true) {
                        val = currentPtr.readDouble();
                    }
                    else {
                        val = currentPtr.readFloat();
                    }
                }
                else if (type === "double") {
                    val = currentPtr.readDouble();
                }
                else if (type === "pointer") {
                    val = currentPtr.readPointer();
                }
                return val;
            }
        }
        exports.JNIEnvInterceptor = JNIEnvInterceptor;
        ;
    },{"../data/jni_env.json":2,"../utils/config":13,"../utils/java_method":14,"../utils/method_data":15,"../utils/types":17}],8:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class JNIThreadManager {
            constructor() {
                this.threads = {};
                this.shadowJavaVM = NULL;
            }
            getJavaVM() {
                return this.shadowJavaVM;
            }
            hasJavaVM() {
                return !this.shadowJavaVM.isNull();
            }
            setJavaVM(javaVM) {
                this.shadowJavaVM = javaVM;
            }
            getJNIEnv(threadId) {
                if (this.threads[threadId] !== undefined) {
                    return this.threads[threadId];
                }
                else {
                    return NULL;
                }
            }
            hasJNIEnv(threadId) {
                return !this.getJNIEnv(threadId).isNull();
            }
            setJNIEnv(threadId, jniEnv) {
                this.createEntry(threadId, jniEnv);
            }
            needsJNIEnvUpdate(threadId, jniEnv) {
                const entry = this.getEntry(threadId);
                if (entry === undefined || !entry.equals(jniEnv)) {
                    return true;
                }
                return false;
            }
            createEntry(threadId, jniEnv) {
                this.threads[threadId] = jniEnv;
            }
            getEntry(threadId) {
                return this.threads[threadId];
            }
        }
        exports.JNIThreadManager = JNIThreadManager;
        ;
    },{}],9:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const jni_env_interceptor_1 = require("../jni_env_interceptor");
        class JNIEnvInterceptorX64 extends jni_env_interceptor_1.JNIEnvInterceptor {
            constructor(references, threads, transport) {
                super(references, threads, transport);
                this.grOffset = 0;
                this.grOffsetStart = 0;
                this.fpOffset = 0;
                this.fpOffsetStart = 0;
                this.overflowPtr = NULL;
                this.dataPtr = NULL;
            }
            buildVaArgParserShellcode(text, data, parser) {
                Memory.patchCode(text, Process.pageSize, (code) => {
                    const cw = new X86Writer(code, { pc: text });
                    const XMM_INC_VALUE = 8;
                    const SKIP_FIRST_REG = 1;
                    const XMM_MOV_INS_1 = 0x66;
                    const XMM_MOV_INS_2 = 0x48;
                    const XMM_MOV_INS_3 = 0x0f;
                    const XMM_MOV_TO_INS_4 = 0x7e;
                    const XMM_MOV_INS_5 = 0xc7;
                    const regs = [
                        "rdi", "rsi", "rdx", "rcx", "r8", "r9", "rax",
                        "rbx", "r10", "r11", "r12", "r13", "r14", "r15",
                        "xmm0", "xmm1", "xmm2", "xmm3", "xmm4", "xmm5",
                        "xmm6", "xmm7"
                    ];
                    let dataOffset = 0;
                    let xmmOffset = 0;
                    for (let i = 0; i < regs.length; i++) {
                        cw.putMovNearPtrReg(data.add(dataOffset), "rdi");
                        dataOffset += Process.pointerSize;
                        if (i < regs.length - SKIP_FIRST_REG) {
                            if (regs[i + SKIP_FIRST_REG].includes("xmm")) {
                                cw.putU8(XMM_MOV_INS_1);
                                cw.putU8(XMM_MOV_INS_2);
                                cw.putU8(XMM_MOV_INS_3);
                                cw.putU8(XMM_MOV_TO_INS_4);
                                cw.putU8(XMM_MOV_INS_5 + xmmOffset * XMM_INC_VALUE);
                                xmmOffset++;
                            }
                            else {
                                cw.putMovRegReg("rdi", regs[i + SKIP_FIRST_REG]);
                            }
                        }
                    }
                    xmmOffset--;
                    cw.putPopReg("rdi");
                    cw.putMovNearPtrReg(data.add(dataOffset), "rdi");
                    dataOffset += Process.pointerSize;
                    cw.putCallAddress(parser);
                    cw.putMovNearPtrReg(data.add(dataOffset), "rax");
                    dataOffset += Process.pointerSize;
                    const REG_SIZE = 2;
                    const END_INDEX = 1;
                    const SKIP_FIRST_COPY = 0;
                    const FIRST_ELEM_INDEX = 0;
                    const XMM_MOV_FROM_INS_4 = 0x6e;
                    let regRestoreOffset = dataOffset - Process.pointerSize * REG_SIZE;
                    for (let i = regs.length - END_INDEX; i >= FIRST_ELEM_INDEX; i--) {
                        regRestoreOffset = i * Process.pointerSize;
                        cw.putMovRegNearPtr("rdi", data.add(regRestoreOffset));
                        if (i > SKIP_FIRST_COPY) {
                            if (regs[i].includes("xmm")) {
                                cw.putU8(XMM_MOV_INS_1);
                                cw.putU8(XMM_MOV_INS_2);
                                cw.putU8(XMM_MOV_INS_3);
                                cw.putU8(XMM_MOV_FROM_INS_4);
                                cw.putU8(XMM_MOV_INS_5 + xmmOffset * XMM_INC_VALUE);
                                xmmOffset--;
                            }
                            else {
                                cw.putMovRegReg(regs[i], "rdi");
                            }
                        }
                    }
                    cw.putMovNearPtrReg(data.add(dataOffset), "rdi");
                    const rdiBackup = dataOffset;
                    dataOffset += Process.pointerSize;
                    const cbAddressOffset = rdiBackup - Process.pointerSize;
                    cw.putMovRegNearPtr("rdi", data.add(cbAddressOffset));
                    cw.putMovNearPtrReg(data.add(dataOffset), "r13");
                    const r13Backup = dataOffset;
                    cw.putMovRegReg("r13", "rdi");
                    cw.putMovRegNearPtr("rdi", data.add(rdiBackup));
                    cw.putCallReg("r13");
                    cw.putMovRegNearPtr("r13", data.add(r13Backup));
                    const retAddressOffset = cbAddressOffset - Process.pointerSize;
                    cw.putJmpNearPtr(data.add(retAddressOffset));
                    cw.flush();
                });
            }
            setUpVaListArgExtract(vaList) {
                const FP_OFFSET = 4;
                const DATA_OFFSET = 2;
                this.grOffset = vaList.readU32();
                this.grOffsetStart = this.grOffset;
                this.fpOffset = vaList.add(FP_OFFSET).readU32();
                this.fpOffsetStart = this.fpOffset;
                this.overflowPtr = vaList.add(Process.pointerSize).readPointer();
                this.dataPtr = vaList.add(Process.pointerSize * DATA_OFFSET)
                    .readPointer();
            }
            extractVaListArgValue(method, paramId) {
                const FP_REG_SIZE = 2;
                const MAX_GR_REG_NUM = 2;
                const MAX_FP_REG_NUM = 14;
                const OFFSET = 1;
                let currentPtr = NULL;
                if (method.fridaParams[paramId] === "float" ||
                    method.fridaParams[paramId] === "double") {
                    const fpDelta = this.fpOffset - this.fpOffsetStart;
                    if (fpDelta / Process.pointerSize < MAX_FP_REG_NUM) {
                        currentPtr = this.dataPtr.add(this.fpOffset);
                        this.fpOffset += Process.pointerSize * FP_REG_SIZE;
                    }
                    else {
                        const reverseId = method.fridaParams.length - paramId - OFFSET;
                        currentPtr = this.overflowPtr.add(reverseId * Process.pointerSize);
                    }
                }
                else {
                    const grDelta = this.grOffset - this.grOffsetStart;
                    if (grDelta / Process.pointerSize < MAX_GR_REG_NUM) {
                        currentPtr = this.dataPtr.add(this.grOffset);
                        this.grOffset += Process.pointerSize;
                    }
                    else {
                        const reverseId = method.fridaParams.length - paramId - OFFSET;
                        currentPtr = this.overflowPtr.add(reverseId * Process.pointerSize);
                    }
                }
                return currentPtr;
            }
            resetVaListArgExtract() {
                this.grOffset = 0;
                this.grOffsetStart = 0;
                this.fpOffset = 0;
                this.fpOffsetStart = 0;
                this.overflowPtr = NULL;
                this.dataPtr = NULL;
            }
        }
        exports.JNIEnvInterceptorX64 = JNIEnvInterceptorX64;
        ;
    },{"../jni_env_interceptor":7}],10:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const jni_env_interceptor_1 = require("../jni_env_interceptor");
        const types_1 = require("../../utils/types");
        class JNIEnvInterceptorX86 extends jni_env_interceptor_1.JNIEnvInterceptor {
            constructor(references, threads, transport) {
                super(references, threads, transport);
                this.vaList = NULL;
                this.vaListOffset = 0;
            }
            buildVaArgParserShellcode(text, data, parser) {
                const DATA_OFFSET = 0x400;
                text.add(DATA_OFFSET).writePointer(parser);
                Memory.patchCode(text, Process.pageSize, (code) => {
                    const cw = new X86Writer(code, { pc: text });
                    const dataOffset = DATA_OFFSET + Process.pointerSize;
                    cw.putPopReg("eax");
                    cw.putMovNearPtrReg(text.add(dataOffset + Process.pointerSize), "eax");
                    cw.putCallAddress(parser);
                    cw.putCallReg("eax");
                    cw.putJmpNearPtr(text.add(dataOffset + Process.pointerSize));
                    cw.flush();
                });
            }
            setUpVaListArgExtract(vaList) {
                this.vaList = vaList;
                this.vaListOffset = 0;
            }
            extractVaListArgValue(method, paramId) {
                let currentPtr = this.vaList.add(this.vaListOffset);
                this.vaListOffset += types_1.Types.sizeOf(method.fridaParams[paramId]);
                return currentPtr;
            }
            resetVaListArgExtract() {
                this.vaList = NULL;
                this.vaListOffset = 0;
            }
        }
        exports.JNIEnvInterceptorX86 = JNIEnvInterceptorX86;
        ;
    },{"../../utils/types":17,"../jni_env_interceptor":7}],11:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const reference_manager_1 = require("./utils/reference_manager");
        const config_1 = require("./utils/config");
        const data_transport_1 = require("./transport/data_transport");
        const jni_env_interceptor_x86_1 = require("./jni/x86/jni_env_interceptor_x86");
        const jni_env_interceptor_x64_1 = require("./jni/x64/jni_env_interceptor_x64");
        const jni_env_interceptor_arm_1 = require("./jni/arm/jni_env_interceptor_arm");
        const jni_env_interceptor_arm64_1 = require("./jni/arm64/jni_env_interceptor_arm64");
        const java_vm_interceptor_1 = require("./jni/java_vm_interceptor");
        const jni_thread_manager_1 = require("./jni/jni_thread_manager");
        const IS_IN_REPL = true;
        const JNI_ENV_INDEX = 0;
        const JAVA_VM_INDEX = 0;
        const LIB_TRACK_FIRST_INDEX = 0;
        const threads = new jni_thread_manager_1.JNIThreadManager();
        const references = new reference_manager_1.ReferenceManager();
        const transport = new data_transport_1.DataTransport(threads);
        let jniEnvInterceptor = undefined;
        if (Process.arch === "ia32") {
            jniEnvInterceptor = new jni_env_interceptor_x86_1.JNIEnvInterceptorX86(references, threads, transport);
        }
        else if (Process.arch === "x64") {
            jniEnvInterceptor = new jni_env_interceptor_x64_1.JNIEnvInterceptorX64(references, threads, transport);
        }
        else if (Process.arch === "arm") {
            jniEnvInterceptor = new jni_env_interceptor_arm_1.JNIEnvInterceptorARM(references, threads, transport);
        }
        else if (Process.arch === "arm64") {
            jniEnvInterceptor = new jni_env_interceptor_arm64_1.JNIEnvInterceptorARM64(references, threads, transport);
        }
        if (jniEnvInterceptor === undefined) {
            throw new Error(Process.arch + " currently unsupported, please file an issue.");
        }
        const javaVMInterceptor = new java_vm_interceptor_1.JavaVMInterceptor(references, threads, transport, jniEnvInterceptor);
        jniEnvInterceptor.setJavaVMInterceptor(javaVMInterceptor);
        let config = config_1.Config.getInstance();
        const trackedLibs = {};
        const libBlacklist = {};
        function checkLibrary(path) {
            const EMPTY_ARRAY_LENGTH = 0;
            const ONE_ELEMENT_ARRAY_LENGTH = 1;
            let willFollowLib = false;
            if (!IS_IN_REPL && !config_1.Config.initialised()) {
                const op = recv("config", (message) => {
                    config = config_1.Config.getInstance(message.payload.libraries, message.payload.backtrace, message.payload.show_data, message.payload.include, message.payload.exclude, message.payload.include_export, message.payload.exclude_export, message.payload.env, message.payload.vm);
                });
                op.wait();
            }
            if (config.libsToTrack.length === ONE_ELEMENT_ARRAY_LENGTH) {
                if (config.libsToTrack[LIB_TRACK_FIRST_INDEX] === "*") {
                    willFollowLib = true;
                }
            }
            if (!willFollowLib) {
                willFollowLib = config.libsToTrack.filter((l) => path.includes(l)).length > EMPTY_ARRAY_LENGTH;
            }
            if (willFollowLib) {
                send({
                    type: "tracked_library",
                    library: path
                });
            }
            return willFollowLib;
        }
        function interceptJNIOnLoad(jniOnLoadAddr) {
            return Interceptor.attach(jniOnLoadAddr, {
                onEnter(args) {
                    let shadowJavaVM = NULL;
                    const javaVM = ptr(args[JAVA_VM_INDEX].toString());
                    if (!threads.hasJavaVM()) {
                        threads.setJavaVM(javaVM);
                    }
                    if (!javaVMInterceptor.isInitialised()) {
                        shadowJavaVM = javaVMInterceptor.create();
                    }
                    else {
                        shadowJavaVM = javaVMInterceptor.get();
                    }
                    args[JAVA_VM_INDEX] = shadowJavaVM;
                }
            });
        }
        function interceptJNIFunction(jniFunctionAddr) {
            return Interceptor.attach(jniFunctionAddr, {
                onEnter(args) {
                    if (jniEnvInterceptor === undefined) {
                        return;
                    }
                    const threadId = this.threadId;
                    const jniEnv = ptr(args[JNI_ENV_INDEX].toString());
                    let shadowJNIEnv = NULL;
                    threads.setJNIEnv(threadId, jniEnv);
                    if (!jniEnvInterceptor.isInitialised()) {
                        shadowJNIEnv = jniEnvInterceptor.create();
                    }
                    else {
                        shadowJNIEnv = jniEnvInterceptor.get();
                    }
                    args[JNI_ENV_INDEX] = shadowJNIEnv;
                }
            });
        }
        const dlopenRef = Module.findExportByName(null, "dlopen");
        const dlsymRef = Module.findExportByName(null, "dlsym");
        const dlcloseRef = Module.findExportByName(null, "dlclose");
        if (dlopenRef !== null && dlsymRef !== null && dlcloseRef !== null) {
            const HANDLE_INDEX = 0;
            const dlopen = new NativeFunction(dlopenRef, 'pointer', ['pointer', 'int']);
            Interceptor.replace(dlopen, new NativeCallback((filename, mode) => {
                const path = filename.readCString();
                const retval = dlopen(filename, mode);
                if (checkLibrary(path)) {
                    trackedLibs[retval.toString()] = true;
                }
                else {
                    libBlacklist[retval.toString()] = true;
                }
                return retval;
            }, 'pointer', ['pointer', 'int']));
            const dlsym = new NativeFunction(dlsymRef, "pointer", ["pointer", "pointer"]);
            Interceptor.attach(dlsym, {
                onEnter(args) {
                    const SYMBOL_INDEX = 1;
                    this.handle = ptr(args[HANDLE_INDEX].toString());
                    if (libBlacklist[this.handle]) {
                        return;
                    }
                    this.symbol = args[SYMBOL_INDEX].readCString();
                },
                onLeave(retval) {
                    if (retval.isNull() || libBlacklist[this.handle]) {
                        return;
                    }
                    const EMPTY_ARRAY_LEN = 0;
                    if (config.includeExport.length > EMPTY_ARRAY_LEN) {
                        const included = config.includeExport.filter((i) => this.symbol.includes(i));
                        if (included.length === EMPTY_ARRAY_LEN) {
                            return;
                        }
                    }
                    if (config.excludeExport.length > EMPTY_ARRAY_LEN) {
                        const excluded = config.excludeExport.filter((e) => this.symbol.includes(e));
                        if (excluded.length > EMPTY_ARRAY_LEN) {
                            return;
                        }
                    }
                    if (trackedLibs[this.handle] === undefined) {
                        // Android 7 and above miss the initial dlopen call.
                        // Give it another chance in dlsym.
                        const mod = Process.findModuleByAddress(retval);
                        if (mod !== null && checkLibrary(mod.path)) {
                            trackedLibs[this.handle] = true;
                        }
                    }
                    if (trackedLibs[this.handle] !== undefined) {
                        const symbol = this.symbol;
                        if (symbol === "JNI_OnLoad") {
                            interceptJNIOnLoad(ptr(retval.toString()));
                        }
                        else if (symbol.startsWith("Java_") === true) {
                            interceptJNIFunction(ptr(retval.toString()));
                        }
                    }
                    else {
                        let name = config.libsToTrack[HANDLE_INDEX];
                        if (name !== "*") {
                            const mod = Process.findModuleByAddress(retval);
                            if (mod === null) {
                                return;
                            }
                            name = mod.name;
                        }
                        if (config.libsToTrack.includes(name) || name === "*") {
                            interceptJNIFunction(ptr(retval.toString()));
                        }
                    }
                }
            });
            const dlclose = new NativeFunction(dlcloseRef, "int", ["pointer"]);
            Interceptor.attach(dlclose, {
                onEnter(args) {
                    const handle = args[HANDLE_INDEX].toString();
                    if (trackedLibs[handle]) {
                        this.handle = handle;
                    }
                },
                onLeave(retval) {
                    if (this.handle !== undefined) {
                        if (retval.isNull()) {
                            delete trackedLibs[this.handle];
                        }
                    }
                }
            });
        }
        if (IS_IN_REPL) {
            console.error("Welcome to jnitrace. Tracing is running...");
            console.warn("NOTE: the recommended way to run this module is using the " +
                "python wrapper. It provides nicely formated coloured output " +
                "in the form of frida-trace. To get jnitrace run " +
                "'pip install jnitrace' or go to " +
                "'https://github.com/chame1eon/jnitrace'");
        }
    },{"./jni/arm/jni_env_interceptor_arm":4,"./jni/arm64/jni_env_interceptor_arm64":3,"./jni/java_vm_interceptor":6,"./jni/jni_thread_manager":8,"./jni/x64/jni_env_interceptor_x64":9,"./jni/x86/jni_env_interceptor_x86":10,"./transport/data_transport":12,"./utils/config":13,"./utils/reference_manager":16}],12:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const types_1 = require("../utils/types");
        const config_1 = require("../utils/config");
        const JNI_OK = 0;
        const TYPE_NAME_START = 0;
        const TYPE_NAME_END = -1;
        const SKIP_ENV_INDEX = 1;
        const EMPTY_ARRAY_LEN = 0;
        class NativeMethodJSONContainer {
            constructor(name, sig, addr) {
                this.name = name;
                this.sig = sig;
                this.addr = addr;
            }
        }
        ;
        /* eslint-disable @typescript-eslint/camelcase */
        class DataJSONContainer {
            constructor(value, data, dataIndex) {
                const RET_INDEX = -1;
                this.value = value;
                if (data !== null) {
                    if (!(data instanceof ArrayBuffer)) {
                        this.data = data;
                    }
                }
                if (dataIndex !== undefined) {
                    if (dataIndex === RET_INDEX) {
                        this.has_data = true;
                    }
                    else {
                        this.data_for = dataIndex;
                    }
                }
            }
            getMetadata() {
                return this.metadata;
            }
            setMetadata(metadata) {
                this.metadata = metadata;
            }
        }
        ;
        class BacktraceJSONContainer {
            constructor(address, module, symbol) {
                this.address = address;
                this.module = module;
                this.symbol = symbol;
            }
        }
        ;
        class RecordJSONContainer {
            constructor(callType, method, args, ret, threadId, timestamp, javaParams, backtrace) {
                this.type = "trace_data";
                this.call_type = callType;
                this.method = method;
                this.args = args;
                this.ret = ret;
                this.thread_id = threadId;
                this.timestamp = timestamp;
                this.java_params = javaParams;
                this.backtrace = backtrace;
            }
        }
        ;
        /* eslint-enable @typescript-eslint/camelcase */
        class DataTransport {
            constructor(threads) {
                this.threads = threads;
                this.start = Date.now();
                this.byteArraySizes = {};
                this.jobjects = {};
                this.jfieldIDs = {};
                this.jmethodIDs = {};
            }
            reportJavaVMCall(data, context) {
                const config = config_1.Config.getInstance();
                const outputArgs = [];
                const outputRet = new DataJSONContainer(data.ret, null);
                const javaVM = this.threads.getJavaVM();
                if (!config.vm || this.shouldIgnoreMethod(data)) {
                    return;
                }
                outputArgs.push(new DataJSONContainer(javaVM, null));
                const sendData = this.addJavaVMArgs(data, outputArgs);
                this.sendToHost("JavaVM", data, outputArgs, outputRet, sendData, context);
            }
            reportJNIEnvCall(data, context) {
                const RET_INDEX = 0;
                const config = config_1.Config.getInstance();
                const threadId = Process.getCurrentThreadId();
                const outputArgs = [];
                const outputRet = [];
                const jniEnv = this.threads.getJNIEnv(threadId);
                this.updateState(data);
                outputArgs.push(new DataJSONContainer(jniEnv, null));
                let sendData = null;
                const argData = this.addJNIEnvArgs(data, outputArgs);
                const retData = this.addJNIEnvRet(data, outputRet);
                if (argData !== null && retData === null) {
                    sendData = argData;
                }
                else if (argData == null && retData !== null) {
                    sendData = retData;
                }
                this.enrichTraceData(data, outputArgs, outputRet);
                if (!config.env || this.shouldIgnoreMethod(data)) {
                    return;
                }
                this.sendToHost("JNIEnv", data, outputArgs, outputRet[RET_INDEX], sendData, context);
            }
            updateArrayLengths(data, isGet) {
                const JARRAY_INDEX = 1;
                if (isGet) {
                    this.byteArraySizes[data.args[JARRAY_INDEX].toString()]
                        = data.ret;
                }
                else { //isSet
                    this.byteArraySizes[data.ret.toString()]
                        = data.args[JARRAY_INDEX];
                }
            }
            updateMethodIDs(data) {
                const NAME_INDEX = 2;
                const SIG_INDEX = 3;
                const methodID = data.ret.toString();
                const name = data.args[NAME_INDEX].readCString();
                const sig = data.args[SIG_INDEX].readCString();
                if (name !== null && sig !== null) {
                    this.jmethodIDs[methodID] = name + sig;
                }
            }
            updateFieldIDs(data) {
                const NAME_INDEX = 2;
                const SIG_INDEX = 3;
                const fieldID = data.ret.toString();
                const name = data.args[NAME_INDEX].readCString();
                const sig = data.args[SIG_INDEX].readCString();
                if (name !== null && sig !== null) {
                    this.jfieldIDs[fieldID] = name + ":" + sig;
                }
            }
            updateClassIDs(data) {
                const NAME_INDEX = 1;
                const jclass = data.ret.toString();
                const name = data.args[NAME_INDEX].readCString();
                if (name !== null) {
                    this.jobjects[jclass] = name;
                }
            }
            updateObjectIDsFromRefs(data, isCreate) {
                const OBJECT_INDEX = 1;
                if (isCreate) {
                    const newRef = data.ret.toString();
                    const oldRef = data.args[OBJECT_INDEX].toString();
                    if (this.jobjects[oldRef] !== undefined) {
                        this.jobjects[newRef] = this.jobjects[oldRef];
                    }
                }
                else {
                    const jobject = data.args[OBJECT_INDEX].toString();
                    delete this.jobjects[jobject];
                }
            }
            updateObjectIDsFromClass(data) {
                const OBJECT_INDEX = 1;
                const jobject = data.args[OBJECT_INDEX].toString();
                const jclass = data.ret.toString();
                if (this.jobjects[jobject] !== undefined) {
                    this.jobjects[jclass] = jobject;
                }
            }
            updateObjectIDsFromCall(data) {
                const TYPE_START = 1;
                const TYPE_END = -1;
                const LAST_CALL_INDEX = 3;
                const CALL_PTRS_OFFSET = 5;
                if (data.javaMethod !== undefined) {
                    let start = 4;
                    const lastArg = data.method.args[LAST_CALL_INDEX];
                    if (["jvalue*", "va_list"].includes(lastArg)) {
                        start = CALL_PTRS_OFFSET;
                    }
                    for (let i = start; i < data.args.length; i++) {
                        const arg = data.args[i].toString();
                        if (this.jobjects[arg] !== undefined) {
                            // skip where we have an existing class name
                            continue;
                        }
                        const nativeJType = data.javaMethod.nativeParams[i - start];
                        if (types_1.Types.isComplexObjectType(nativeJType)) {
                            this.jobjects[arg] = nativeJType.slice(TYPE_START, TYPE_END);
                        }
                    }
                    if (data.method.name.includes("Object")) {
                        if (this.jobjects[data.ret.toString()] === undefined) {
                            this.jobjects[data.ret.toString()]
                                = data.javaMethod.ret.slice(TYPE_START, TYPE_END);
                        }
                    }
                }
            }
            updateState(data) {
                const name = data.method.name;
                if (name === "GetArrayLength") {
                    this.updateArrayLengths(data, true);
                }
                else if (name.startsWith("New") && name.endsWith("Array")) {
                    this.updateArrayLengths(data, false);
                }
                else if (["GetMethodID", "GetStaticMethodID"].includes(name)) {
                    this.updateMethodIDs(data);
                }
                else if (["GetFieldID", "GetStaticFieldID"].includes(name)) {
                    this.updateFieldIDs(data);
                }
                else if (["FindClass", "DefineClass"].includes(name)) {
                    this.updateClassIDs(data);
                }
                else if (name.startsWith("New") && name.endsWith("GlobalRef")) {
                    this.updateObjectIDsFromRefs(data, true);
                }
                else if (name.startsWith("Delete") && name.endsWith("GlobalRef")) {
                    this.updateObjectIDsFromRefs(data, false);
                }
                else if (name === "GetObjectClass") {
                    this.updateObjectIDsFromClass(data);
                }
                else if (name.startsWith("Call")) {
                    this.updateObjectIDsFromCall(data);
                }
            }
            shouldIgnoreMethod(data) {
                const config = config_1.Config.getInstance();
                const include = config.include;
                const exclude = config.exclude;
                const name = data.method.name;
                if (include.length > EMPTY_ARRAY_LEN) {
                    const included = include.filter((i) => new RegExp(i).test(name));
                    if (included.length === EMPTY_ARRAY_LEN) {
                        return true;
                    }
                }
                if (exclude.length > EMPTY_ARRAY_LEN) {
                    const excluded = exclude.filter((e) => new RegExp(e).test(name));
                    if (excluded.length > EMPTY_ARRAY_LEN) {
                        return true;
                    }
                }
                return false;
            }
            enrichSingleItem(type, key, item) {
                if (types_1.Types.isComplexObjectType(type)) {
                    if (this.jobjects[key] !== undefined) {
                        item.setMetadata(this.jobjects[key]);
                    }
                }
                else if (type === "jmethodID") {
                    if (this.jmethodIDs[key] !== undefined) {
                        item.setMetadata(this.jmethodIDs[key]);
                    }
                }
                else if (type === "jfieldID") {
                    if (this.jfieldIDs[key] !== undefined) {
                        item.setMetadata(this.jfieldIDs[key]);
                    }
                }
            }
            enrichTraceData(data, args, ret) {
                const ONLY_RET = 0;
                let i = 0;
                for (; i < data.method.args.length; i++) {
                    if (["jvalue*, va_list"].includes(data.method.args[i])) {
                        i++;
                        continue;
                    }
                    else if (data.method.args[i] === "...") {
                        break;
                    }
                    this.enrichSingleItem(data.method.args[i], data.args[i].toString(), args[i]);
                }
                const OFFSET = i;
                for (; i < args.length; i++) {
                    if (data.javaMethod !== undefined) {
                        this.enrichSingleItem(data.javaMethod.nativeParams[i - OFFSET], data.args[i].toString(), args[i]);
                    }
                }
                if (data.ret !== undefined) {
                    this.enrichSingleItem(data.method.ret, data.ret.toString(), ret[ONLY_RET]);
                }
            }
            addDefinceClassArgs(data, outputArgs) {
                const CLASS_NAME_INDEX = 1;
                const OBJECT_INDEX = 2;
                const BUF_INDEX = 3;
                const LEN_INDEX = 4;
                const name = data.getArgAsPtr(CLASS_NAME_INDEX).readCString();
                outputArgs.push(new DataJSONContainer(data.args[CLASS_NAME_INDEX], name));
                outputArgs.push(new DataJSONContainer(data.args[OBJECT_INDEX], null));
                const buf = data.getArgAsPtr(BUF_INDEX);
                const len = data.getArgAsNum(LEN_INDEX);
                const classData = buf.readByteArray(len);
                outputArgs.push(new DataJSONContainer(data.args[BUF_INDEX], null, BUF_INDEX));
                outputArgs.push(new DataJSONContainer(data.args[LEN_INDEX], null));
                return classData;
            }
            addFindClassArgs(data, outputArgs) {
                const CLASS_NAME_INDEX = 1;
                const name = data.getArgAsPtr(CLASS_NAME_INDEX).readCString();
                outputArgs.push(new DataJSONContainer(data.args[CLASS_NAME_INDEX], name));
            }
            addThrowNewArgs(data, outputArgs) {
                const CLASS_INDEX = 1;
                const MESSAGE_INDEX = 2;
                const message = data.getArgAsPtr(MESSAGE_INDEX).readCString();
                outputArgs.push(new DataJSONContainer(data.args[CLASS_INDEX], null));
                outputArgs.push(new DataJSONContainer(data.args[MESSAGE_INDEX], message));
            }
            addFatalErrorArgs(data, outputArgs) {
                const MESSAGE_INDEX = 1;
                const message = data.getArgAsPtr(MESSAGE_INDEX).readCString();
                outputArgs.push(new DataJSONContainer(data.args[MESSAGE_INDEX], message));
            }
            addGetGenericIDArgs(data, outputArgs) {
                const CLASS_INDEX = 1;
                const NAME_INDEX = 2;
                const SIG_INDEX = 3;
                const name = data.getArgAsPtr(NAME_INDEX).readCString();
                const sig = data.getArgAsPtr(SIG_INDEX).readCString();
                outputArgs.push(new DataJSONContainer(data.args[CLASS_INDEX], null));
                outputArgs.push(new DataJSONContainer(data.args[NAME_INDEX], name));
                outputArgs.push(new DataJSONContainer(data.args[SIG_INDEX], sig));
            }
            addNewStringArgs(data, outputArgs) {
                const BUF_INDEX = 1;
                const LEN_INDEX = 2;
                const buf = data.getArgAsPtr(BUF_INDEX);
                const len = data.getArgAsNum(LEN_INDEX);
                const unicode = buf.readByteArray(len);
                outputArgs.push(new DataJSONContainer(data.args[BUF_INDEX], null, BUF_INDEX));
                outputArgs.push(new DataJSONContainer(data.args[LEN_INDEX], null));
                return unicode;
            }
            addGetGenericBufferArgs(data, outputArgs) {
                const JARRAY_INDEX = 1;
                const BUF_INDEX = 2;
                outputArgs.push(new DataJSONContainer(data.args[JARRAY_INDEX], null));
                if (!data.getArgAsPtr(BUF_INDEX).isNull()) {
                    outputArgs.push(new DataJSONContainer(data.args[BUF_INDEX], data.getArgAsPtr(BUF_INDEX).readS8()));
                }
                else {
                    outputArgs.push(new DataJSONContainer(data.args[BUF_INDEX], null));
                }
            }
            addReleaseCharsArgs(data, outputArgs) {
                const JSTIRNG_INDEX = 2;
                const UNICODE_BUF_INDEX = 2;
                const unicode = data.getArgAsPtr(UNICODE_BUF_INDEX).readCString();
                outputArgs.push(new DataJSONContainer(data.args[JSTIRNG_INDEX], null));
                outputArgs.push(new DataJSONContainer(data.args[UNICODE_BUF_INDEX], unicode));
            }
            addGetGenericBufferRegionArgs(data, outputArgs) {
                const LAST_ARG_OFFSET = 1;
                const LEN_INDEX = 3;
                const BUF_INDEX = 4;
                const type = data.method.args[BUF_INDEX]
                    .slice(TYPE_NAME_START, TYPE_NAME_END);
                const nType = types_1.Types.convertNativeJTypeToFridaType(type);
                const size = types_1.Types.sizeOf(nType);
                const buf = data.getArgAsPtr(BUF_INDEX);
                const len = data.getArgAsNum(LEN_INDEX);
                const region = buf.readByteArray(len * size);
                const loopLen = data.args.length - LAST_ARG_OFFSET;
                for (let i = SKIP_ENV_INDEX; i < loopLen; i++) {
                    outputArgs.push(new DataJSONContainer(data.args[i], null));
                }
                outputArgs.push(new DataJSONContainer(data.args[data.args.length - LAST_ARG_OFFSET], null, data.args.length - LAST_ARG_OFFSET));
                return region;
            }
            addNewStringUTFArgs(data, outputArgs) {
                const CHAR_PTR_INDEX = 1;
                const utf = data.getArgAsPtr(CHAR_PTR_INDEX).readUtf8String();
                outputArgs.push(new DataJSONContainer(data.args[CHAR_PTR_INDEX], utf));
            }
            addRegisterNativesArgs(data, outputArgs) {
                const JCLASS_INDEX = 1;
                const METHODS_PTR_INDEX = 2;
                const SIZE_INDEX = 3;
                const JNI_METHOD_SIZE = 3;
                const size = data.getArgAsNum(SIZE_INDEX);
                const natives = [];
                outputArgs.push(new DataJSONContainer(data.args[JCLASS_INDEX], null));
                for (let i = 0; i < size * JNI_METHOD_SIZE; i += JNI_METHOD_SIZE) {
                    const methodsPtr = data.getArgAsPtr(METHODS_PTR_INDEX);
                    const namePtr = methodsPtr
                        .add(i * Process.pointerSize)
                        .readPointer();
                    const name = namePtr.readCString();
                    const sigOffset = 1;
                    const sigPtr = methodsPtr
                        .add((i + sigOffset) * Process.pointerSize)
                        .readPointer();
                    const sig = sigPtr.readCString();
                    const addrOffset = 2;
                    const addr = methodsPtr
                        .add((i + addrOffset) * Process.pointerSize)
                        .readPointer();
                    natives.push(new NativeMethodJSONContainer({
                        value: namePtr.toString(),
                        data: name
                    }, {
                        value: sigPtr.toString(),
                        data: sig
                    }, {
                        value: addr.toString()
                    }));
                }
                outputArgs.push(new DataJSONContainer(data.args[METHODS_PTR_INDEX], natives));
                outputArgs.push(new DataJSONContainer(data.args[SIZE_INDEX], null));
            }
            addGetJavaVMArgs(data, outputArgs) {
                const JAVAVM_INDEX = 1;
                outputArgs.push(new DataJSONContainer(data.args[JAVAVM_INDEX], data.getArgAsPtr(JAVAVM_INDEX).readPointer()));
            }
            addReleaseStringCriticalArgs(data, outputArgs) {
                const JSTRING_INDEX = 1;
                const JCHAR_PTR_INDEX = 2;
                outputArgs.push(new DataJSONContainer(data.args[JSTRING_INDEX], null));
                outputArgs.push(new DataJSONContainer(data.args[JCHAR_PTR_INDEX], data.getArgAsPtr(JSTRING_INDEX).readCString()));
            }
            addReleaseElementsArgs(data, outputArgs) {
                const BYTE_ARRAY_INDEX = 1;
                const BUFFER_PTR_INDEX = 2;
                const SKIP_ENV_INDEX = 1;
                const byteArrayArg = data.method.args[BYTE_ARRAY_INDEX];
                const type = byteArrayArg.slice(TYPE_NAME_START, TYPE_NAME_END);
                const nType = types_1.Types.convertNativeJTypeToFridaType(type);
                const size = types_1.Types.sizeOf(nType);
                const buf = data.getArgAsPtr(BUFFER_PTR_INDEX);
                const byteArray = data.getArgAsPtr(BYTE_ARRAY_INDEX).toString();
                const len = this.byteArraySizes[byteArray];
                let region = null;
                if (len !== undefined) {
                    region = buf.readByteArray(len * size);
                }
                for (let i = SKIP_ENV_INDEX; i < data.args.length; i++) {
                    const arg = data.args[i];
                    let dataFor = undefined;
                    if (i === BUFFER_PTR_INDEX) {
                        dataFor = i;
                    }
                    outputArgs.push(new DataJSONContainer(arg, null, dataFor));
                }
                return region;
            }
            addGenericArgs(data, outputArgs) {
                for (let i = 1; i < data.args.length; i++) {
                    outputArgs.push(new DataJSONContainer(data.args[i], null));
                }
            }
            addJNIEnvArgs(data, outputArgs) {
                const name = data.method.name;
                if (name === "DefineClass") {
                    return this.addDefinceClassArgs(data, outputArgs);
                }
                else if (name === "FindClass") {
                    this.addFindClassArgs(data, outputArgs);
                }
                else if (name === "ThrowNew") {
                    this.addThrowNewArgs(data, outputArgs);
                }
                else if (name === "FatalError") {
                    this.addFatalErrorArgs(data, outputArgs);
                }
                else if (name.endsWith("ID")) {
                    this.addGetGenericIDArgs(data, outputArgs);
                }
                else if (name === "NewString") {
                    return this.addNewStringArgs(data, outputArgs);
                }
                else if (name.startsWith("Get") && name.endsWith("Chars") ||
                    name.startsWith("Get") && name.endsWith("Elements") ||
                    name.startsWith("Get") && name.endsWith("ArrayCritical") ||
                    name === "GetStringCritical") {
                    this.addGetGenericBufferArgs(data, outputArgs);
                }
                else if (name.startsWith("Release") && name.endsWith("Chars")) {
                    this.addReleaseCharsArgs(data, outputArgs);
                }
                else if (name.endsWith("Region")) {
                    return this.addGetGenericBufferRegionArgs(data, outputArgs);
                }
                else if (name === "NewStringUTF") {
                    this.addNewStringUTFArgs(data, outputArgs);
                }
                else if (name === "RegisterNatives") {
                    this.addRegisterNativesArgs(data, outputArgs);
                }
                else if (name === "GetJavaVM") {
                    this.addGetJavaVMArgs(data, outputArgs);
                }
                else if (name === "ReleaseStringCritical") {
                    this.addReleaseStringCriticalArgs(data, outputArgs);
                }
                else if (name.startsWith("Release") && name.endsWith("Elements") ||
                    name.startsWith("Release") && name.endsWith("ArrayCritical")) {
                    return this.addReleaseElementsArgs(data, outputArgs);
                }
                else {
                    this.addGenericArgs(data, outputArgs);
                }
                return null;
            }
            addJNIEnvRet(data, outputRet) {
                const RET_INDEX = -1;
                const ENVPTR_ARG_INDEX = 1;
                const name = data.method.name;
                if (name.startsWith("Get") && name.endsWith("Elements") ||
                    name.startsWith("Get") && name.endsWith("ArrayCritical")) {
                    const key = data.args[ENVPTR_ARG_INDEX].toString();
                    if (this.byteArraySizes[key] !== undefined) {
                        const type = data.method.ret.slice(TYPE_NAME_START, TYPE_NAME_END);
                        const nType = types_1.Types.convertNativeJTypeToFridaType(type);
                        const size = types_1.Types.sizeOf(nType);
                        const buf = data.ret;
                        const len = this.byteArraySizes[data.getArgAsPtr(ENVPTR_ARG_INDEX).toString()];
                        outputRet.push(new DataJSONContainer(data.ret, null, RET_INDEX));
                        return buf.readByteArray(len * size);
                    }
                }
                outputRet.push(new DataJSONContainer(data.ret, null));
                return null;
            }
            addAttachCurrentThreadArgs(data, outputArgs) {
                const ENV_ARG_INDEX = 1;
                const ARGS_ARG_INDEX = 2;
                const JINT_SIZE = 4;
                const argStructSize = types_1.Types.sizeOf("pointer") +
                    types_1.Types.sizeOf("pointer") +
                    JINT_SIZE;
                const threadId = Process.getCurrentThreadId();
                const env = data.args[ENV_ARG_INDEX];
                let envData = null;
                if (data.ret === JNI_OK) {
                    envData = this.threads.getJNIEnv(threadId);
                }
                else if (!data.getArgAsPtr(ENV_ARG_INDEX).isNull()) {
                    envData = data.getArgAsPtr(ENV_ARG_INDEX).readPointer();
                }
                outputArgs.push(new DataJSONContainer(env, envData));
                const argValue = data.args[ARGS_ARG_INDEX];
                if (!data.getArgAsPtr(ARGS_ARG_INDEX).isNull()) {
                    outputArgs.push(new DataJSONContainer(argValue, null, ARGS_ARG_INDEX));
                    return data
                        .getArgAsPtr(ARGS_ARG_INDEX)
                        .readByteArray(argStructSize);
                }
                else {
                    outputArgs.push(new DataJSONContainer(argValue, null));
                }
                return null;
            }
            addGetEnvArgs(data, outputArgs) {
                const ENV_ARG_INDEX = 1;
                const VERSION_ARG_INDEX = 2;
                const threadId = Process.getCurrentThreadId();
                const env = data.args[ENV_ARG_INDEX];
                let binData = null;
                if (data.ret === JNI_OK) {
                    binData = this.threads.getJNIEnv(threadId);
                }
                else if (!data.getArgAsPtr(ENV_ARG_INDEX).isNull()) {
                    binData = data.getArgAsPtr(ENV_ARG_INDEX).readPointer();
                }
                outputArgs.push(new DataJSONContainer(env, binData));
                outputArgs.push(new DataJSONContainer(data.args[VERSION_ARG_INDEX], null));
            }
            addJavaVMArgs(data, outputArgs) {
                const name = data.method.name;
                if (name.startsWith("AttachCurrentThread")) {
                    return this.addAttachCurrentThreadArgs(data, outputArgs);
                }
                else if (name === "GetEnv") {
                    this.addGetEnvArgs(data, outputArgs);
                }
                return null;
            }
            createBacktrace(context, type) {
                let bt = context;
                if (!(bt instanceof Array)) {
                    let backtraceType = null;
                    if (type === "fuzzy") {
                        backtraceType = Backtracer.FUZZY;
                    }
                    else {
                        backtraceType = Backtracer.ACCURATE;
                    }
                    bt = Thread.backtrace(context, backtraceType);
                }
                return bt.map((addr) => {
                    return new BacktraceJSONContainer(addr, Process.findModuleByAddress(addr), DebugSymbol.fromAddress(addr));
                });
            }
            sendToHost(type, data, args, ret, sendData, context) {
                const config = config_1.Config.getInstance();
                const jParams = data.jParams;
                let backtrace = undefined;
                if (config.backtrace !== "none") {
                    backtrace = this.createBacktrace(context, config.backtrace);
                }
                const output = new RecordJSONContainer(type, data.method, args, ret, Process.getCurrentThreadId(), Date.now() - this.start, jParams, backtrace);
                send(output, sendData);
            }
        }
        exports.DataTransport = DataTransport;
        ;
    },{"../utils/config":13,"../utils/types":17}],13:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class Config {
            constructor(libsToTrack = ["*"], backtrace = "accurate", showData = true, include = [], exclude = [], includeExport = [], excludeExport = [], env = true, vm = true) {
                this._libsToTrack = libsToTrack;
                this._backtrace = backtrace;
                this._showData = showData;
                this._include = include;
                this._exclude = exclude;
                this._includeExport = includeExport;
                this._excludeExport = excludeExport;
                this._env = env;
                this._vm = vm;
                this._hostInitialised = false;
            }
            get libsToTrack() {
                return this._libsToTrack;
            }
            get backtrace() {
                return this._backtrace;
            }
            get showData() {
                return this._showData;
            }
            get include() {
                return this._include;
            }
            get exclude() {
                return this._exclude;
            }
            get includeExport() {
                return this._includeExport;
            }
            get excludeExport() {
                return this._excludeExport;
            }
            get env() {
                return this._env;
            }
            get vm() {
                return this._vm;
            }
            static initialised() {
                if (Config.instance === undefined) {
                    return false;
                }
                else {
                    return Config.instance._hostInitialised;
                }
            }
            static getInstance(libsToTrack, backtrace, showData, include, exclude, includeExport, excludeExport, env, vm) {
                if (libsToTrack !== undefined &&
                    backtrace !== undefined &&
                    showData !== undefined &&
                    include !== undefined &&
                    exclude !== undefined &&
                    includeExport !== undefined &&
                    excludeExport !== undefined &&
                    env !== undefined &&
                    vm !== undefined) {
                    Config.instance = new Config(libsToTrack, backtrace, showData, include, exclude, includeExport, excludeExport, env, vm);
                    Config.instance._hostInitialised = true;
                }
                else if (Config.instance === undefined) {
                    Config.instance = new Config();
                }
                return Config.instance;
            }
        }
        exports.Config = Config;
        ;
    },{}],14:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const types_1 = require("./types");
        const SEMI_COLON_OFFSET = 1;
        class JavaMethod {
            constructor(signature) {
                const primitiveTypes = ["B", "S", "I", "J", "F", "D", "C", "Z", "V"];
                let isArray = false;
                let isRet = false;
                const jParamTypes = [];
                let jRetType = "unknown";
                for (var i = 0; i < signature.length; i++) {
                    if (signature.charAt(i) === "(") {
                        continue;
                    }
                    if (signature.charAt(i) === ")") {
                        isRet = true;
                        continue;
                    }
                    if (signature.charAt(i) === "[") {
                        isArray = true;
                        continue;
                    }
                    let jtype = "unknown";
                    if (primitiveTypes.includes(signature.charAt(i))) {
                        jtype = signature.charAt(i);
                    }
                    else if (signature.charAt(i) === "L") {
                        var end = signature.indexOf(";", i) + SEMI_COLON_OFFSET;
                        jtype = signature.substring(i, end);
                        i = end - SEMI_COLON_OFFSET;
                    }
                    //TODO DELETE
                    if (isArray) {
                        jtype = "[" + jtype;
                    }
                    if (!isRet) {
                        jParamTypes.push(jtype);
                    }
                    else {
                        jRetType = jtype;
                    }
                    isArray = false;
                }
                this.signature = signature;
                this._params = jParamTypes;
                this._ret = jRetType;
            }
            get params() {
                return this._params;
            }
            get nativeParams() {
                const nativeParams = [];
                this._params.forEach((p) => {
                    const nativeJType = types_1.Types.convertJTypeToNativeJType(p);
                    nativeParams.push(nativeJType);
                });
                return nativeParams;
            }
            get fridaParams() {
                const fridaParams = [];
                this._params.forEach((p) => {
                    const nativeJType = types_1.Types.convertJTypeToNativeJType(p);
                    const fridaType = types_1.Types.convertNativeJTypeToFridaType(nativeJType);
                    fridaParams.push(fridaType);
                });
                return fridaParams;
            }
            get ret() {
                return this._ret;
            }
            get fridaRet() {
                const jTypeRet = types_1.Types.convertJTypeToNativeJType(this._ret);
                return types_1.Types.convertNativeJTypeToFridaType(jTypeRet);
            }
        }
        exports.JavaMethod = JavaMethod;
        ;
    },{"./types":17}],15:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class MethodData {
            constructor(method, args, ret, jmethod) {
                this._method = method;
                this._jmethod = jmethod;
                this._args = args;
                this._ret = ret;
                if (jmethod === undefined) {
                    this._jparams = [];
                }
                else {
                    this._jparams = jmethod.nativeParams;
                }
            }
            ;
            get method() {
                return this._method;
            }
            get javaMethod() {
                return this._jmethod;
            }
            get args() {
                return this._args;
            }
            ;
            getArgAsPtr(i) {
                return this._args[i];
            }
            getArgAsNum(i) {
                return this._args[i];
            }
            get jParams() {
                return this._jparams;
            }
            ;
            get ret() {
                return this._ret;
            }
            ;
        }
        exports.MethodData = MethodData;
        ;
    },{}],16:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class ReferenceManager {
            constructor() {
                this.references = {};
            }
            add(ref) {
                this.references[ref.toString()] = ref;
            }
            release(ref) {
                if (this.references[ref.toString()] !== undefined) {
                    delete this.references[ref.toString()];
                }
            }
        }
        exports.ReferenceManager = ReferenceManager;
        ;
    },{}],17:[function(require,module,exports){
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const ARRAY_TYPE_INDEX = 1;
        const TYPE_SIZE_64_BIT = 8;
        const TYPE_SIZE_CHAR = 1;
        const Types = {
            isComplexObjectType(type) {
                const JOBJECT = [
                    "jobject",
                    "jclass",
                    "jweak"
                ];
                return JOBJECT.includes(type);
            },
            sizeOf(type) {
                if (type === "double" || type === "float" || type === "int64") {
                    return TYPE_SIZE_64_BIT;
                }
                else if (type === "char") {
                    return TYPE_SIZE_CHAR;
                }
                else {
                    return Process.pointerSize;
                }
            },
            convertNativeJTypeToFridaType(jtype) {
                if (jtype.endsWith("*")) {
                    return "pointer";
                }
                if (jtype === "va_list") {
                    return "pointer";
                }
                if (jtype === "jmethodID") {
                    return "pointer";
                }
                if (jtype === "jfieldID") {
                    return "pointer";
                }
                if (jtype === "va_list") {
                    return "va_list";
                }
                if (jtype === "jweak") {
                    jtype = "jobject";
                }
                if (jtype === "jthrowable") {
                    jtype = "jobject";
                }
                if (jtype.includes("Array")) {
                    jtype = "jarray";
                }
                if (jtype === "jarray") {
                    jtype = "jobject";
                }
                if (jtype === "jstring") {
                    jtype = "jobject";
                }
                if (jtype === "jclass") {
                    jtype = "jobject";
                }
                if (jtype === "jobject") {
                    return "pointer";
                }
                if (jtype === "jsize") {
                    jtype = "jint";
                }
                if (jtype === "jdouble") {
                    return "double";
                }
                if (jtype === "jfloat") {
                    return "float";
                }
                if (jtype === "jchar") {
                    return "uint16";
                }
                if (jtype === "jboolean") {
                    return "char";
                }
                if (jtype === "jlong") {
                    return "int64";
                }
                if (jtype === "jint") {
                    return "int";
                }
                if (jtype === "jshort") {
                    return "int16";
                }
                if (jtype === "jbyte") {
                    return "char";
                }
                return jtype;
            },
            convertJTypeToNativeJType(jtype) {
                let result = "";
                let isArray = false;
                if (jtype.startsWith("[")) {
                    isArray = true;
                    jtype = jtype.substring(ARRAY_TYPE_INDEX);
                }
                if (jtype === "B") {
                    result += "jbyte";
                }
                else if (jtype === "S") {
                    result += "jshort";
                }
                else if (jtype === "I") {
                    result += "jint";
                }
                else if (jtype === "J") {
                    result += "jlong";
                }
                else if (jtype === "F") {
                    result += "jfloat";
                }
                else if (jtype === "D") {
                    result += "jdouble";
                }
                else if (jtype === "C") {
                    result += "jchar";
                }
                else if (jtype === "Z") {
                    result += "jboolean";
                }
                else if (jtype.startsWith("L")) {
                    if (jtype === "Ljava/lang/String;") {
                        result += "jstring";
                    }
                    else if (jtype === "Ljava/lang/Class;") {
                        result += "jclass";
                    }
                    else {
                        result += "jobject";
                    }
                }
                if (isArray) {
                    if (result === "jstring") {
                        result = "jobject";
                    }
                    result += "Array";
                }
                return result;
            }
        };
        exports.Types = Types;
    },{}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqbml0cmFjZS9zcmMvZGF0YS9qYXZhX3ZtLmpzb24iLCJqbml0cmFjZS9zcmMvZGF0YS9qbmlfZW52Lmpzb24iLCJqbml0cmFjZS9zcmMvam5pL2FybTY0L2puaV9lbnZfaW50ZXJjZXB0b3JfYXJtNjQudHMiLCJqbml0cmFjZS9zcmMvam5pL2FybS9qbmlfZW52X2ludGVyY2VwdG9yX2FybS50cyIsImpuaXRyYWNlL3NyYy9qbmkvamF2YV92bS50cyIsImpuaXRyYWNlL3NyYy9qbmkvamF2YV92bV9pbnRlcmNlcHRvci50cyIsImpuaXRyYWNlL3NyYy9qbmkvam5pX2Vudl9pbnRlcmNlcHRvci50cyIsImpuaXRyYWNlL3NyYy9qbmkvam5pX3RocmVhZF9tYW5hZ2VyLnRzIiwiam5pdHJhY2Uvc3JjL2puaS94NjQvam5pX2Vudl9pbnRlcmNlcHRvcl94NjQudHMiLCJqbml0cmFjZS9zcmMvam5pL3g4Ni9qbmlfZW52X2ludGVyY2VwdG9yX3g4Ni50cyIsImpuaXRyYWNlL3NyYy9tYWluLnRzIiwiam5pdHJhY2Uvc3JjL3RyYW5zcG9ydC9kYXRhX3RyYW5zcG9ydC50cyIsImpuaXRyYWNlL3NyYy91dGlscy9jb25maWcudHMiLCJqbml0cmFjZS9zcmMvdXRpbHMvamF2YV9tZXRob2QudHMiLCJqbml0cmFjZS9zcmMvdXRpbHMvbWV0aG9kX2RhdGEudHMiLCJqbml0cmFjZS9zcmMvdXRpbHMvcmVmZXJlbmNlX21hbmFnZXIudHMiLCJqbml0cmFjZS9zcmMvdXRpbHMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxckVBLGdFQUEyRDtBQVEzRCxNQUFNLHNCQUF1QixTQUFRLHVDQUFpQjtJQVVsRCxZQUNJLFVBQTRCLEVBQzVCLE9BQXlCLEVBQ3pCLFNBQXdCO1FBRXhCLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FB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TyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDcEIsT0FBTyxPQUFPLENBQUM7U0FDbEI7UUFDRCxJQUFJLEtBQUssS0FBSyxPQUFPLEVBQUU7WUFDbkIsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0QseUJBQXlCLENBQUMsS0FBYTtRQUNuQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXBCLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ2YsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUM3QztRQUVELElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtZQUNmLE1BQU0sSUFBSSxPQUFPLENBQUM7U0FDckI7YUFBTSxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7WUFDdEIsTUFBTSxJQUFJLFFBQVEsQ0FBQztTQUN0QjthQUFNLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtZQUN0QixNQUFNLElBQUksTUFBTSxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxPQUFPLENBQUM7U0FDckI7YUFBTSxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7WUFDdEIsTUFBTSxJQUFJLFFBQVEsQ0FBQztTQUN0QjthQUFNLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtZQUN0QixNQUFNLElBQUksU0FBUyxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxPQUFPLENBQUM7U0FDckI7YUFBTSxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7WUFDdEIsTUFBTSxJQUFJLFVBQVUsQ0FBQztTQUN4QjthQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QixJQUFJLEtBQUssS0FBSyxvQkFBb0IsRUFBRTtnQkFDaEMsTUFBTSxJQUFJLFNBQVMsQ0FBQzthQUN2QjtpQkFBTSxJQUFHLEtBQUssS0FBSyxtQkFBbUIsRUFBRTtnQkFDckMsTUFBTSxJQUFJLFFBQVEsQ0FBQzthQUN0QjtpQkFBTTtnQkFDSCxNQUFNLElBQUksU0FBUyxDQUFDO2FBQ3ZCO1NBQ0o7UUFFRCxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDdEIsTUFBTSxHQUFHLFNBQVMsQ0FBQzthQUN0QjtZQUNELE1BQU0sSUFBSSxPQUFPLENBQUM7U0FDckI7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0osQ0FBQztBQUVPLHNCQUFLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIifQ==
