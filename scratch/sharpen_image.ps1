Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\asapu\.gemini\antigravity-ide\brain\7d3398ce-9e25-4060-acd4-adf5b8b5d194\.user_uploaded\media_1789105811162.png"
$destPath = "c:\Users\asapu\Downloads\emmsoft\assets\team\effat_ara_new.png"

Write-Output "Source exists: $(Test-Path $srcPath)"
$srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Output "Original size: $($srcImg.Width) x $($srcImg.Height)"
$srcImg.Dispose()
