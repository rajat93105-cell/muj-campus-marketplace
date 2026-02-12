$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    name        = "Test User"
    email       = "test.script@muj.manipal.edu"
    password    = "password123"
    hostelBlock = "B1"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Headers $headers -Body $body
    Write-Host "✅ Success! Server responded:"
    $response | Format-List
}
catch {
    Write-Host "❌ Error:" $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "Response Body:" $reader.ReadToEnd()
    }
}
