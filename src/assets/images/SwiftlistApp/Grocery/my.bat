@echo off
setlocal enabledelayedexpansion

for /d %%f in (*) do (
    set "folderName=%%~nxf"
    set "newFolderName=!folderName: =!"
    if not "!folderName!"=="!newFolderName!" (
        rename "%%f" "!newFolderName!"
    )
)

endlocal
