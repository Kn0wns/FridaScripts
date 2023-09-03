// @Time    : 2022-05-05 21:16
// @Author  : KKings
// @File    : 延时.js
// @Software: PyCharm

function sleep(time) {
    const timeStamp = new Date().getTime();
    const endTime = timeStamp + time;
    while (true) {
        if (new Date().getTime() > endTime) {
            return;
        }
    }
}