const fs = require('fs');
const path = require('path');

// List of files to update found via grep
const filesToUpdate = [
  'src/components/shop/wishlist/SingleWishProduct.js',
  'src/components/shop/wishlist/FetchApi.js',
  'src/components/shop/productDetails/ProductDetailsSection.js',
  'src/components/shop/productDetails/FetchApi.js',
  'src/components/shop/partials/FetchApi.js',
  'src/components/shop/partials/CartModal.js',
  'src/components/shop/order/FetchApi.js',
  'src/components/shop/order/CheckoutProducts.js',
  'src/components/shop/home/Slider.js',
  'src/components/shop/home/SingleProduct.js',
  'src/components/shop/home/ProductCategoryDropdown.js',
  'src/components/shop/home/ProductByCategory.js',
  'src/components/shop/dashboardUser/UserOrders.js',
  'src/components/shop/dashboardUser/FetchApi.js',
  'src/components/shop/auth/fetchApi.js',
  'src/components/admin/products/ProductTable.js',
  'src/components/admin/products/FetchApi.js',
  'src/components/admin/products/EditProductModal.js',
  'src/components/admin/orders/FetchApi.js',
  'src/components/admin/orders/AllOrders.js',
  'src/components/admin/dashboardAdmin/TodaySell.js',
  'src/components/admin/categories/FetchApi.js',
  'src/components/admin/dashboardAdmin/FetchApi.js',
  'src/components/admin/categories/AllCategories.js',
  'src/components/admin/dashboardAdmin/Customize.js'
];

let updatedCount = 0;

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('process.env.REACT_APP_API_URL')) {
      content = content.replace(/process\.env\.REACT_APP_API_URL/g, 'import.meta.env.VITE_API_URL');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${file}`);
      updatedCount++;
    } else {
      console.log(`⚠️  Already updated or not found: ${file}`);
    }
  } else {
    console.log(`❌ File not found: ${file}`);
  }
});

console.log(`\n🎉 Total files updated: ${updatedCount}`);
