@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$f=Join-Path '%~dp0' '.clonex.pid'; if(Test-Path $f){$clonePid=[int](Get-Content $f); Stop-Process -Id $clonePid -Force -ErrorAction SilentlyContinue; Remove-Item $f -Force -ErrorAction SilentlyContinue; Write-Host 'CloneX stopped.'}else{Write-Host 'CloneX is not running.'}"
pause
