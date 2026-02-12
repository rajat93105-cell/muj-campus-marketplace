$headers = @{ "Content-Type" = "application/json" }
$loginBody = @{ email = "postman.user@muj.manipal.edu"; password = "password123" } | ConvertTo-Json

# 1. Login
Write-Host "--- 1. Login to get Token ---" -ForegroundColor Cyan
try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Headers $headers -Body $loginBody
    $token = $loginResponse.token
    Write-Host "✅ Login Successful." -ForegroundColor Green
}
catch {
    Write-Host "❌ Login Failed. Error: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# 2. Add Product
Write-Host "`n--- 2. Add Product (Protected) ---" -ForegroundColor Cyan
$productBody = @{
    title       = "Engineering Maths Book"
    description = "Almost new condition"
    price       = 500
    category    = "Books"
    condition   = "Used"
    hostelBlock = "Block 17"
    imageUrl    = "https://example.com/book.jpg"
} | ConvertTo-Json

$authHeaders = @{ "Content-Type" = "application/json"; "Authorization" = "Bearer $token" }

try {
    $productResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method Post -Headers $authHeaders -Body $productBody
    Write-Host "✅ Product Added Successfully." -ForegroundColor Green
    Write-Host "Product ID: $($productResponse._id)" -ForegroundColor Gray
    Write-Host "Title: $($productResponse.title)" -ForegroundColor Gray
    Write-Host "Seller ID: $($productResponse.seller)" -ForegroundColor Gray
}
catch {
    Write-Host "❌ Add Product Failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "Response: $($reader.ReadToEnd())" -ForegroundColor Red
    }
}

# 3. Get All Products
Write-Host "`n--- 3. Get All Products (Public) ---" -ForegroundColor Cyan
try {
    $products = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method Get
    Write-Host "✅ Get Products Successful." -ForegroundColor Green
    Write-Host "Count: $($products.Count)" -ForegroundColor Gray
    if ($products.Count -gt 0) {
        $p = $products[0]
        Write-Host "First Product: $($p.title) - ₹$($p.price)" -ForegroundColor Gray
        Write-Host "Seller Name: $($p.seller.name)" -ForegroundColor Gray
        Write-Host "Seller Block: $($p.seller.hostelBlock)" -ForegroundColor Gray
    }
}
catch {
    Write-Host "❌ Get Products Failed: $($_.Exception.Message)" -ForegroundColor Red
}
