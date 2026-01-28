@echo off

:: Diretórios
set FACTORIO_DIR=%~dp0
set FACTORIO_EXE=%FACTORIO_DIR%bin\x64\factorio.exe
set SAVE_DIR=Z:\SteamLibrary\steamapps\common\Factorio\saves
set SAVE_NAME=mephisto-serie-11
set SETTINGS_FILE=%FACTORIO_DIR%data\server-settings.json
set LOG_DIR=%FACTORIO_DIR%logs

:: Execução
set PRIORITY=high
set RESTART_DELAY=15

:: Garantias
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"
