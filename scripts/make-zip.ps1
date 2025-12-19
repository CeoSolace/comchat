$ErrorActionPreference = 'Stop'
$ZipName = "community-chat-platform.zip"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$Root = Join-Path $Root '..'
Set-Location $Root
if (Test-Path $ZipName) {
  Remove-Item $ZipName
}
Add-Type -AssemblyName 'System.IO.Compression.FileSystem'
[System.IO.Compression.ZipFile]::CreateFromDirectory($Root, $ZipName)
return
# TODO: Add signature generation