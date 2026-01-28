@echo off
call config.cmd

if not exist "%SAVE_DIR%\%SAVE_NAME%.zip" (
	echo Save nao encontrado.
	pause
	exit /b
)

echo Iniciando save fixo...
start "DEDICATED FIXED FactorioServer" /%PRIORITY% /wait "%FACTORIO_EXE%" ^
--start-server "%SAVE_DIR%\%SAVE_NAME%.zip" ^
--server-settings "%SETTINGS_FILE%"

pause
