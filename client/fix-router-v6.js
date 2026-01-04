// fix-router-v6.js - Fix all useHistory to useNavigate
const fs = require('fs');
const path = require('path');

const files = [
  'src/components/shop/partials/Navber.js',
  'src/components/shop/partials/CartModal.js',
  'src/components/admin/partials/AdminNavber.js',
  'src/components/admin/partials/AdminSidebar.js',
  'src/components/shop/dashboardUser/Sidebar.js',
  'src/components/shop/home/SingleProduct.js',
  'src/components/shop/home/ProductCategoryDropdown.js',
  'src/components/shop/home/ProductByCategory.js',
  'src/components/shop/wishlist/SingleWishProduct.js',
  'src/components/shop/order/CheckoutProducts.js',
  'src/components/shop/productDetails/Submenu.js',
  'src/components/admin/dashboardAdmin/TodaySell.js',
];

files.forEach((file) => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    console.log(`Updating ${file}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace imports
    content = content.replace(/import \{ useHistory, useLocation \}/g, 'import { useNavigate, useLocation }');
    content = content.replace(/import \{ useLocation, useHistory \}/g, 'import { useLocation, useNavigate }');
    content = content.replace(/import \{ useHistory, useParams \}/g, 'import { use Navigate, useParams }');
    content = content.replace(/import \{ useHistory \}/g, 'import { useNavigate }');
    
    // Replace hook usage
    content = content.replace(/const history = useHistory\(\);/g, 'const navigate = useNavigate();');
    
    // Replace history.push() calls
    content = content.replace(/history\.push\(/g, 'navigate(');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${file}`);
  } else {
    console.log(`✗ File not found: ${file}`);
  }
});

console.log('\n✅ All files updated!');
