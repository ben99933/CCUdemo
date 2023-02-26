@echo off
set URL=http://localhost:3000/
set FLAG=0

REM 檢查瀏覽器是否已開啟網頁
for /f "tokens=2 delims==" %%a in ('wmic process list /format:list ^| find "CommandLine" ^| find "chrome.exe" ^| find "%URL%"') do set FLAG=1

REM 如果已經開啟則重新整理網頁，否則開啟網頁
if %FLAG%==1 (
    start chrome.exe %URL%
    ping 127.0.0.1 -n 3 > nul
    start chrome.exe --new-window --new-tab %URL%
) else (
    start chrome.exe %URL%
)

REM 啟動 npm
start nodemon "--exc npm start"