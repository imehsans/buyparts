# PowerShell script to migrate useHistory to useNavigate in all files

$files = @(
    "src\components\shop\partials\Navber.js",
    "src\components\shop\partials\CartModal.js",
    "src\components\admin\partials\AdminNavber.js",
    "src\components\admin\partials\AdminSidebar.js",
    "src\components\shop\dashboardUser\Sidebar.js",
    "src\components\shop\home\SingleProduct.js",
    "src\components\shop\home\ProductCategoryDropdown.js",
    "src\components\shop\home\ProductByCategory.js",
    "src\components\shop\wishlist\SingleWishProduct.js",
    "src\components\shop\order\CheckoutProducts.js",
    "src\components\shop\productDetails\Submenu.js",
    "src\components\admin\dashboardAdmin\TodaySell.js"
)

foreach ($file in $files) {
    $filePath = Join-Path $PSScriptRoot $file
    if (Test-Path $filePath) {
        Write-Host "Updating $file..." -ForegroundColor Yellow
        
        $content = Get-Content $filePath -Raw
        
        # Replace imports
        $content = $content -replace 'import \{ useHistory, useLocation \}', 'import { useNavigate, useLocation }'
        $content = $content -replace 'import \{ useLocation, useHistory \}', 'import { useLocation, useNavigate }'
        $content = $content -replace 'import \{ useHistory, useParams \}', 'import { useNavigate, useParams }'
        $content = $content -replace 'import \{ useHistory \}', 'import { useNavigate }'
        
        # Replace hook usage
        $content = $content -replace 'const history = useHistory\(\);', 'const navigate = useNavigate();'
        
        # Replace history.push calls
        $content = $content -replace 'history\.push\(', 'navigate('
        
        Set-Content $filePath $content -NoNewline
        Write-Host "✓ Updated $file" -ForegroundColor Green
    }
}

Write-Host "`n✅ All files updated! Restart the dev server." -ForegroundColor Cyan
