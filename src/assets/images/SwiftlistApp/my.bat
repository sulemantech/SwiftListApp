@echo off
setlocal enabledelayedexpansion

rem Change directory to the one specified as the first argument
cd /d "%~1"

rem Function to remove spaces from file names and directory names
for /f "delims=" %%f in ('dir /b /s /a-d') do (
    set "fileName=%%~nxf"
    set "newFileName=!fileName: =!"
    if not "!fileName!"=="!newFileName!" (
        rename "%%f" "!newFileName!"
    )
)

for /f "delims=" %%d in ('dir /b /s /ad') do (
    set "dirName=%%~nxd"
    set "newDirName=!dirName: =!"
    if not "!dirName!"=="!newDirName!" (
        ren "%%d" "!newDirName!"
    )
)

echo Spaces removed from all file and folder names.
endlocal
pause
