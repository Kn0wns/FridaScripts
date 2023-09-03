#! /bin/sh
#进程名字可修改
#脚本逻辑 -> 存在端口 pass 不存在则检查小红书在不在 在就注入 否则-f启动或者点击方式启动 然后循环
#用frida加载androidAsync.dex在APP跑了个http服务对外提供接口，PORT是http服务监听的端口，用的是frida-inject注入js
#如果是frida-server那么可以改为用ps判断frida-server在不在
#启动命令 sh -T- data/local/tmp/daemon.sh

PORT=45459
CURRENT_WINDOW_COUNT=0
PRO_NAME=com.xingin.xhs
PRO_ACTIVITY=com.xingin.xhs.index.v2.IndexActivityV2
FRIDA_INJECT=/data/local/tmp/fi14213
SCRIPT_PATH=/data/local/tmp/server.js

while true;
do
    # 检查注入的脚本的端口有没有
    PORTNUM=`netstat -tunlp | grep ${PRO_NAME} | grep -w ${PORT} | grep -v grep |wc -l`
    # 存在端口 说明注入OK 等待3s后再次检查
    if [ "${PORTNUM}" -ge "1" ];then
        echo "server.js is listening on ${PORT}"
    # 不存在 则检查APP在不在
    elif [ "${PORTNUM}" -eq "0" ];then
        # 获取APP进程数量
        NUM=`ps -ef | grep -w ${PRO_NAME} | grep -v grep |wc -l`
        # APP进程大于0 注入脚本 并输出结果
        if [ "${NUM}" -gt "0" ];then
            CURRENT_PRO_WINDOW=`dumpsys window windows | grep ${PRO_NAME} | grep -E 'mCurrentFocus' | wc -l`
            if [ "${CURRENT_PRO_WINDOW}" -eq "0" ];then
                # 大于0 但是不在前台 杀掉全部进程 两次确保杀死 打开APP
                NOTHING=`ps -ef | grep ${PRO_NAME} | grep -v "grep ${PRO_NAME}" | tr -s ' ' | cut -d ' ' -f2 | xargs kill -9`
                NOTHING=`ps -ef | grep ${PRO_NAME} | grep -v "grep ${PRO_NAME}" | tr -s ' ' | cut -d ' ' -f2 | xargs kill -9`
                NOTHING=`am start -n ${PRO_NAME}/${PRO_ACTIVITY}`
                echo "sleep 5s"
                sleep 5s
            fi
            echo "${PRO_NAME} is alive, start inject server.js"
            NOTHING=`setsid ${FRIDA_INJECT} -n ${PRO_NAME} -s ${SCRIPT_PATH} -e`
            echo "inject end"
        else
            echo "${PRO_NAME} is dead, start app and inject server.js"
            NOTHING=`am start -n ${PRO_NAME}/${PRO_ACTIVITY}`
            echo "sleep 3s"
            sleep 3s
            NOTHING=`setsid ${FRIDA_INJECT} -n ${PRO_NAME} -s ${SCRIPT_PATH} -e`
            echo "inject end"
        fi
        echo "sleep 3s"
        sleep 3s
    fi
    CURRENT_PRO_WINDOW=`dumpsys window windows | grep ${PRO_NAME} | grep -E 'mCurrentFocus' | wc -l`
    if [ "${CURRENT_PRO_WINDOW}" -eq "0" ];then
        # 计数
        let CURRENT_WINDOW_COUNT++
        echo "Current window is not ${PRO_NAME}"
    else
        CURRENT_WINDOW_COUNT=0
    fi
    if [ "${CURRENT_WINDOW_COUNT}" -eq "3" ];then
        # 连续三次 也就是15s内当前界面不是APP 那么就打开APP
        NOTHING=`am start -n ${PRO_NAME}/${PRO_ACTIVITY}`
    fi
    echo "sleep 5s"
    sleep 5s
done

exit 0