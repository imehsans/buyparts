const fs = require('fs');
const path = require('path');

// All files that need fixing
const filesToFix = [
  { path: 'src/components/shop/partials/CartModal.js', instances: 3 },
  { path: 'src/components/admin/partials/AdminSidebar.js', instances: 5 },
  { path: 'src/components/shop/dashboardUser/Sidebar.js', instances: 6 },
  { path: 'src/components/shop/home/SingleProduct.js', instances: 2 },
  { path: 'src/components/shop/home/ProductCategoryDropdown.js', instances: 2 },
  { path: 'src/components/shop/home/ProductByCategory.js', instances: 10 },
  { path: 'src/components/shop/wishlist/SingleWishProduct.js', instances: 2 },
  { path: 'src/components/shop/order/CheckoutProducts.js', instances: 4 },
  { path: 'src/components/shop/productDetails/Submenu.js', instances: 2 },
  { path: 'src/components/admin/dashboardAdmin/TodaySell.js', instances: 2 },
];

function fixFile(relativePath) {
  const fullPath = path.join(__dirname, relativePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${relativePath}`);
    return false;
  }

  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // Check if already fixed
    if (content.includes('useNavigate') && !content.includes('useHistory')) {
      console.log(`⏭️  Already fixed: ${relativePath}`);
      return true;
    }

    // Replace imports
    if (content.includes('import { useHistory, useLocation }')) {
      content = content.replace(/import \{ useHistory, useLocation \}/g, 'import { useNavigate, useLocation }');
      modified = true;
    }
    if (content.includes('import { useLocation, useHistory }')) {
      content = content.replace(/import \{ useLocation, useHistory \}/g, 'import { useLocation, useNavigate }');
      modified = true;
    }
    if (content.includes('import { useHistory, useParams }')) {
      content = content.replace(/import \{ useHistory, useParams \}/g, 'import { useNavigate, useParams }');
      modified = true;
    }
    if (content.includes('import { useHistory }')) {
      content = content.replace(/import \{ useHistory \}/g, 'import { useNavigate }');
      modified = true;
    }

    // Replace hook usage
    if (content.includes('const history = useHistory();')) {
      content = content.replace(/const history = useHistory\(\);/g, 'const navigate = useNavigate();');
      modified = true;
    }

    // Replace history.push() calls
    if (content.includes('history.push(')) {
      content = content.replace(/history\.push\(/g, 'navigate(');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed: ${relativePath}`);
      return true;
    } else {
      console.log(`⚠️  No changes needed: ${relativePath}`);
      return true;
    }
  } catch (error) {
    console.log(`❌ Error fixing ${relativePath}:`, error.message);
    return false;
  }
}

console.log('🔧 Fixing all React Router v6 compatibility issues...\n');

let totalFixed = 0;
let totalFailed = 0;

filesToFix.forEach(file => {
  if (fixFile(file.path)) {
    totalFixed++;
  } else {
    totalFailed++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Successfully processed: ${totalFixed}`);
console.log(`   ❌ Failed: ${totalFailed}`);
console.log(`\n🎉 All files updated! Restart your dev server.`);
