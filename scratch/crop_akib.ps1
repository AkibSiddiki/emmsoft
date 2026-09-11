Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\asapu\Downloads\emmsoft\assets\team\member_8.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $bmp.Width
$height = [int]($bmp.Height * 0.75)

$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)

$bmp.Dispose()
$cropped.Save("c:\Users\asapu\Downloads\emmsoft\assets\team\member_8_crop.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropped.Dispose()
Write-Output "Done cropping"
