@echo off


:: Diretórios
:: save padrão a usar // default save
set SAVE_NAME=mephisto-serie-11

:: default location C:\Users\user\AppData\Roaming\Factorio\saves
set SAVE_DIR=Z:\SteamLibrary\steamapps\common\Factorio\saves
set SETTINGS_NAME=server-settings.json

:: GLOBAL VARS (Do not touch, edit at your own risk.) // não toque , edite por sua conta e risco
set FACTORIO_DIR=%~dp0
set FACTORIO_EXE=%FACTORIO_DIR%bin\x64\factorio.exe
set FACTORIO_DATA_DIR=%FACTORIO_DIR%data
set LOG_DIR=%FACTORIO_DIR%logs
set SETTINGS_FILE=%FACTORIO_DATA_DIR%\%SETTINGS_NAME%

:: Execução
set PRIORITY=high
set RESTART_DELAY=15

:: Garantias (garante que o servidor não crashe ou trave)
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"
if not exist "%SETTINGS_FILE%" (
    copy "%FACTORIO_DATA_DIR%\server-settings.example.json" "%SETTINGS_FILE%"
)
