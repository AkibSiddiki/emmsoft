Add-Type -AssemblyName System.Drawing

$mahediSharp = "C:\Users\asapu\.gemini\antigravity-ide\brain\7d3398ce-9e25-4060-acd4-adf5b8b5d194\mahedi_shirt_only_1789106233667.jpg"
$destMember7 = "c:\Users\asapu\Downloads\emmsoft\assets\team\member_7.jpg"
$destMahedi = "c:\Users\asapu\Downloads\emmsoft\assets\team\mahedi_hasan.jpg"

Copy-Item $mahediSharp $destMember7 -Force
Copy-Item $mahediSharp $destMahedi -Force

Write-Output "Successfully updated Mahedi Hasan photos (member_7.jpg and mahedi_hasan.jpg)"
