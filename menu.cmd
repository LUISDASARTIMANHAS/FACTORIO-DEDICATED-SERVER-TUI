@echo off
setlocal
call config.cmd

:menu
cls
echo ======================================
echo      FACTORIO DEDICATED SERVER
echo      SERVER EXE: %FACTORIO_EXE%
echo      SAVES: %SAVE_DIR%
echo      SERVER SETTINGS: %SETTINGS_FILE%
echo ======================================
echo /evolution Prints info about the alien evolution factor.

echo /help	    Prints a list of available commands, the optional argument can specify the command that should be described.

echo /help      Prints a list of available commands, the optional argument can specify the command that should be described.

echo /players	Prints a list of players in the game. (parameter online/o, it prints only players that are online, count/c prints only count)

echo /admin     Opens the player management GUI.

echo /config	Opens the server configuration GUI.

echo.
echo [1] Iniciar %SAVE_NAME% (save fixo)
echo [2] Iniciar servidor (ultimo save)
echo [3] Watchdog (auto restart)
echo [4] Ver logs
echo [5] Encerrar servidor
echo [0] Sair
echo.
set /p opt=Escolha: 

if "%opt%"=="1" call start_fixed.cmd
if "%opt%"=="2" call start_latest.cmd
if "%opt%"=="3" call watchdog.cmd
if "%opt%"=="4" call logs.cmd
if "%opt%"=="5" call stop.cmd
if "%opt%"=="0" exit /b

goto menu
