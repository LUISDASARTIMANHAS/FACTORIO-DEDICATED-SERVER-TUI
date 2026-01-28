@echo off
call config.cmd

echo Iniciando ultimo save...
start "DEDICATED LAST SAVE FactorioServer" /%PRIORITY% /wait "%FACTORIO_EXE%" ^
--start-server-load-latest ^
--server-settings "%SETTINGS_FILE%"

pause
