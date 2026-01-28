@echo off
echo Encerrando Factorio...
taskkill /IM factorio.exe /F >nul 2>&1
echo OK
timeout 2
