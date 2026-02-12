$job = Start-Job -ScriptBlock { 
    Set-Location "c:\Users\RAJAT SINGH\OneDrive\Desktop\rajats project\muj-campus-marketplace\backend"
    node server.js 
}
Write-Host "Server started in background job. Waiting 10 seconds..."
Start-Sleep -Seconds 10

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000" -UseBasicParsing
    Write-Host "Server responded with:" $response.Content
} catch {
    Write-Host "Request failed:" $_.Exception.Message
} finally {
    Stop-Job $job
    Remove-Job $job
    Write-Host "Server job stopped."
}
