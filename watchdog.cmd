@echo off
call config.cmd
setlocal EnableDelayedExpansion

echo Watchdog ativo (CTRL+C para parar)

:loop
set TIMESTAMP=%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set LOG_FILE=%LOG_DIR%\server_%TIMESTAMP%.log

start "DEDICATED WATCHDOG FactorioServer" /%PRIORITY% /wait "%FACTORIO_EXE%" ^
--start-server-load-latest ^
--server-settings "%SETTINGS_FILE%" ^
>> "%LOG_FILE%" 2>&1

echo Servidor caiu. Reiniciando em %RESTART_DELAY%s...
timeout /t %RESTART_DELAY% >nul
goto loop
