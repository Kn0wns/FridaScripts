@echo off

:: 输出提示
echo --------------------------------------------------------------
echo [*] start git clone
echo\
REM pause
 
for /f %%c in (list.txt) do git clone %%c
echo\
echo [*] git clone finish
echo --------------------------------------------------------------
REM pause