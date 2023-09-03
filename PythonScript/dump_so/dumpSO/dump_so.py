import os

from ADB_SHELL import adbShell


def fix_so(arch, so_name, base, size):
    SoFixer = ""
    if arch == "arm":
        SoFixer += "windows\SoFixer-Windows-32.exe"
    elif arch == "arm64":
        SoFixer += "windows\SoFixer-Windows-64.exe"

    soruceName = f'{so_name.split(".")[0]}_dump.so'
    fixName = f'{so_name.split(".")[0]}_fix.so'
    command = f"{SoFixer} -m {base} -s {soruceName} -o {fixName} -d"
    print(command)
    os.system(command)



def getSOAddrByName(SOName,buf):
    buf = buf.split('\n')
    addr_start = 0
    addr_end = 0
    flag_start = False
    for eachline in buf:
        item = eachline.split()
        if -1 != eachline.find(SOName):
            if not flag_start:  # 第一次找到
                addr_start = item[0].split('-')[0]
                flag_start = True
            else:
                addr_end = item[0].split('-')[1]

    addrStart = int(addr_start, 16)
    addrEnd = int(addr_end, 16)
    size = addrEnd - addrStart
    return addrStart,size


test = adbShell()
pid = 15220
arch = "arm"
SONAME = "libvdog.so"
test = adbShell()
result = test.adb_server(f'su -c cat /proc/{pid}/maps | grep {SONAME} --context=3')
buf = result[1].decode()
addrStart,size = getSOAddrByName(SONAME, buf)
tempfile = f"/sdcard/temp_{hex(addrStart)}_{SONAME}"
command = f"su -c dd if=/proc/{pid}/mem of={tempfile} skip={addrStart} ibs=1 count={size}"
test.adb_server(command)
dumpCommand = f"adb pull {tempfile} {SONAME.split('.')[0]}_dump.so"
os.system(dumpCommand)

fix_so(arch, SONAME, hex(addrStart), hex(size))