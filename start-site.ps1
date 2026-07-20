$ErrorActionPreference = 'Stop'
$url = 'http://127.0.0.1:4173/'
$node = (Get-Command node -ErrorAction Stop).Source
Start-Process -FilePath $node -ArgumentList "`"$PSScriptRoot\server.js`"" -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
Start-Sleep -Milliseconds 1200
Start-Process $url
Write-Host "CloneX local site started: $url"
