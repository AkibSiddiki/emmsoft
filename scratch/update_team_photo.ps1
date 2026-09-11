Add-Type -AssemblyName System.Drawing

$sharpImgPath = "C:\Users\asapu\.gemini\antigravity-ide\brain\7d3398ce-9e25-4060-acd4-adf5b8b5d194\effat_ara_sharp_1789105976159.jpg"
$destMember9 = "c:\Users\asapu\Downloads\emmsoft\assets\team\member_9.jpg"
$destEffat = "c:\Users\asapu\Downloads\emmsoft\assets\team\effat_ara.jpg"

$img = [System.Drawing.Bitmap]::FromFile($sharpImgPath)
Write-Output "Image size: $($img.Width) x $($img.Height)"
$img.Dispose()

# Backup existing originals just in case
Copy-Item $destMember9 "$destMember9.bak" -Force
Copy-Item $destEffat "$destEffat.bak" -Force

# Replace member_9.jpg and effat_ara.jpg with the sharp image
Copy-Item $sharpImgPath $destMember9 -Force
Copy-Item $sharpImgPath $destEffat -Force

Write-Output "Successfully updated member_9.jpg and effat_ara.jpg"
