const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import models
const userModel = require("./models/users");
const categoryModel = require("./models/categories");
const productModel = require("./models/products");
const orderModel = require("./models/orders");

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Seed data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await userModel.deleteMany({});
    await categoryModel.deleteMany({});
    await productModel.deleteMany({});
    await orderModel.deleteMany({});
    console.log("🗑️  Existing data cleared");

    // Create Admin User
    const adminPassword = bcrypt.hashSync("pakistan123", 10);
    const admin = await userModel.create({
      name: "Admin User",
      email: "mehsanjadoon786@gmail.com",
      password: adminPassword,
      userRole: 1, // 1 = Admin
      phoneNumber: 923001234567,
    });
    console.log("✅ Admin user created:", admin.email);

    // Create Multiple Customer Users
    const users = await userModel.create([
      {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("password123", 10),
        userRole: 0,
        phoneNumber: 923001111111,
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: bcrypt.hashSync("password123", 10),
        userRole: 0,
        phoneNumber: 923002222222,
      },
      {
        name: "Ahmed Khan",
        email: "ahmed@example.com",
        password: bcrypt.hashSync("password123", 10),
        userRole: 0,
        phoneNumber: 923003333333,
      },
      {
        name: "Fatima Ali",
        email: "fatima@example.com",
        password: bcrypt.hashSync("password123", 10),
        userRole: 0,
        phoneNumber: 923004444444,
      },
      {
        name: "Michael Brown",
        email: "michael@example.com",
        password: bcrypt.hashSync("password123", 10),
        userRole: 0,
        phoneNumber: 923005555555,
      },
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        password: bcrypt.hashSync("password123", 10),
        userRole: 0,
        phoneNumber: 923006666666,
      },
      {
        name: "Ali Hassan",
        email: "ali@example.com",
        password: bcrypt.hashSync("password123", 10),
        userRole: 0,
        phoneNumber: 923007777777,
      },
      {
        name: "Maria Garcia",
        email: "maria@example.com",
        password: bcrypt.hashSync("password123", 10),
        userRole: 0,
        phoneNumber: 923008888888,
      },
      {
        name: "Hassan Mahmood",
        email: "hassan@example.com",
        password: bcrypt.hashSync("password123", 10),
        userRole: 0,
        phoneNumber: 923009999999,
      },
      {
        name: "Emily Davis",
        email: "emily@example.com",
        password: bcrypt.hashSync("password123", 10),
        userRole: 0,
        phoneNumber: 923000000000,
      },
    ]);
    console.log(`✅ ${users.length} customer users created`);

    // Create Categories
    const categories = await categoryModel.create([
      {
        cName: "Engine Parts",
        cDescription: "High-quality engine components and accessories",
        cImage: "engine-parts.jpg",
        cStatus: "Active",
      },
      {
        cName: "Brakes & Suspension",
        cDescription: "Brake systems and suspension components",
        cImage: "brakes.jpg",
        cStatus: "Active",
      },
      {
        cName: "Electrical",
        cDescription: "Electrical systems and components",
        cImage: "electrical.jpg",
        cStatus: "Active",
      },
      {
        cName: "Body Parts",
        cDescription: "Exterior and interior body components",
        cImage: "body-parts.jpg",
        cStatus: "Active",
      },
      {
        cName: "Filters",
        cDescription: "Oil, air, and fuel filters",
        cImage: "filters.jpg",
        cStatus: "Active",
      },
    ]);
    console.log(`✅ ${categories.length} categories created`);

    // Create Products
    const products = await productModel.create([
      // Engine Parts
      {
        pName: "Oil Filter OEM Quality",
        pDescription:
          "Premium oil filter compatible with most vehicles. Ensures clean oil circulation and optimal engine performance.",
        pPrice: 1500,
        pQuantity: 50,
        pCategory: categories[0]._id,
        pImages: ["oil-filter-1.jpg", "oil-filter-2.jpg"],
        pOffer: "10",
        pStatus: "Active",
      },
      {
        pName: "Spark Plug Set (4pcs)",
        pDescription:
          "High-performance spark plugs for better fuel efficiency and smooth ignition.",
        pPrice: 2500,
        pQuantity: 30,
        pCategory: categories[0]._id,
        pImages: ["spark-plug-1.jpg", "spark-plug-2.jpg"],
        pOffer: null,
        pStatus: "Active",
      },
      {
        pName: "Engine Oil 10W-40 (4L)",
        pDescription:
          "Synthetic blend engine oil for all-season protection and performance.",
        pPrice: 4500,
        pQuantity: 100,
        pCategory: categories[0]._id,
        pImages: ["engine-oil-1.jpg", "engine-oil-2.jpg"],
        pOffer: "15",
        pStatus: "Active",
      },

      // Brakes & Suspension
      {
        pName: "Front Brake Pads Set",
        pDescription:
          "Ceramic brake pads for superior stopping power and reduced noise.",
        pPrice: 5500,
        pQuantity: 25,
        pCategory: categories[1]._id,
        pImages: ["brake-pads-1.jpg", "brake-pads-2.jpg"],
        pOffer: null,
        pStatus: "Active",
      },
      {
        pName: "Shock Absorber Rear",
        pDescription:
          "Heavy-duty shock absorber for improved ride comfort and handling.",
        pPrice: 8500,
        pQuantity: 15,
        pCategory: categories[1]._id,
        pImages: ["shock-absorber-1.jpg", "shock-absorber-2.jpg"],
        pOffer: "20",
        pStatus: "Active",
      },

      // Electrical
      {
        pName: "Car Battery 12V 70Ah",
        pDescription:
          "Maintenance-free car battery with 2-year warranty. Reliable starting power.",
        pPrice: 12000,
        pQuantity: 20,
        pCategory: categories[2]._id,
        pImages: ["battery-1.jpg", "battery-2.jpg"],
        pOffer: null,
        pStatus: "Active",
      },
      {
        pName: "LED Headlight Bulbs H4",
        pDescription:
          "Super bright LED headlight bulbs with 6000K white light.",
        pPrice: 3500,
        pQuantity: 40,
        pCategory: categories[2]._id,
        pImages: ["headlight-1.jpg", "headlight-2.jpg"],
        pOffer: "25",
        pStatus: "Active",
      },

      // Body Parts
      {
        pName: "Side Mirror Left (Universal)",
        pDescription:
          "Replacement side mirror with manual adjustment. Fits most vehicles.",
        pPrice: 2800,
        pQuantity: 35,
        pCategory: categories[3]._id,
        pImages: ["mirror-1.jpg", "mirror-2.jpg"],
        pOffer: null,
        pStatus: "Active",
      },
      {
        pName: "Front Bumper Protector",
        pDescription:
          "Durable rubber bumper guard to protect from scratches and impacts.",
        pPrice: 1800,
        pQuantity: 60,
        pCategory: categories[3]._id,
        pImages: ["bumper-1.jpg", "bumper-2.jpg"],
        pOffer: "10",
        pStatus: "Active",
      },

      // Filters
      {
        pName: "Air Filter Element",
        pDescription:
          "High-efficiency air filter for improved engine performance and fuel economy.",
        pPrice: 1200,
        pQuantity: 80,
        pCategory: categories[4]._id,
        pImages: ["air-filter-1.jpg", "air-filter-2.jpg"],
        pOffer: null,
        pStatus: "Active",
      },
      {
        pName: "Fuel Filter",
        pDescription:
          "Premium fuel filter to keep your fuel system clean and running smoothly.",
        pPrice: 900,
        pQuantity: 70,
        pCategory: categories[4]._id,
        pImages: ["fuel-filter-1.jpg", "fuel-filter-2.jpg"],
        pOffer: "5",
        pStatus: "Active",
      },
    ]);

    // Add reviews to products
    await productModel.findByIdAndUpdate(products[0]._id, {
      $push: {
        pRatingsReviews: [
          {
            review: "Great quality! Fits perfectly in my car.",
            user: users[0]._id,
            rating: "5",
          },
          {
            review: "Good value for money. Recommended!",
            user: users[2]._id,
            rating: "4",
          },
        ],
      },
    });

    await productModel.findByIdAndUpdate(products[2]._id, {
      $push: {
        pRatingsReviews: [
          {
            review: "Excellent engine oil, noticed better performance.",
            user: users[1]._id,
            rating: "5",
          },
          {
            review: "My car runs smoother now. Worth every penny.",
            user: users[3]._id,
            rating: "5",
          },
        ],
      },
    });

    await productModel.findByIdAndUpdate(products[5]._id, {
      $push: {
        pRatingsReviews: [
          {
            review: "Battery works great! No issues so far.",
            user: users[4]._id,
            rating: "5",
          },
        ],
      },
    });

    console.log(`✅ ${products.length} products created with reviews`);

    // Create realistic orders with multiple items
    const orders = await orderModel.create([
      // Order 1 - Delivered (John Doe)
      {
        allProduct: [
          { id: products[0]._id, quantitiy: 2 }, // Oil Filter x2
          { id: products[9]._id, quantitiy: 1 }, // Air Filter x1
        ],
        user: users[0]._id,
        amount: 4200, // (1500*2) + 1200
        transactionId: "TXN1234567890",
        address: "House #123, Street 5, F-7 Markaz, Islamabad",
        phone: 923001111111,
        status: "Delivered",
      },

      // Order 2 - Shipped (Jane Smith)
      {
        allProduct: [
          { id: products[2]._id, quantitiy: 1 }, // Engine Oil x1
          { id: products[1]._id, quantitiy: 1 }, // Spark Plugs x1
        ],
        user: users[1]._id,
        amount: 7000,
        transactionId: "TXN2345678901",
        address: "Flat 4B, Blue Area Towers, Islamabad",
        phone: 923002222222,
        status: "Shipped",
      },

      // Order 3 - Processing (Ahmed Khan)
      {
        allProduct: [
          { id: products[5]._id, quantitiy: 1 }, // Car Battery x1
          { id: products[10]._id, quantitiy: 2 }, // Fuel Filter x2
        ],
        user: users[2]._id,
        amount: 13800,
        transactionId: "TXN3456789012",
        address: "Plot #45, G-11/3, Islamabad",
        phone: 923003333333,
        status: "Processing",
      },

      // Order 4 - Delivered (Fatima Ali)
      {
        allProduct: [
          { id: products[6]._id, quantitiy: 2 }, // LED Headlights x2
          { id: products[8]._id, quantitiy: 1 }, // Bumper Protector x1
        ],
        user: users[3]._id,
        amount: 8800,
        transactionId: "TXN4567890123",
        address: "House #67, Sector I-10, Islamabad",
        phone: 923004444444,
        status: "Delivered",
      },

      // Order 5 - Not processed (Michael Brown)
      {
        allProduct: [
          { id: products[3]._id, quantitiy: 1 }, // Brake Pads x1
          { id: products[4]._id, quantitiy: 2 }, // Shock Absorbers x2
        ],
        user: users[4]._id,
        amount: 22500,
        transactionId: "TXN5678901234",
        address: "Villa #12, DHA Phase 2, Islamabad",
        phone: 923005555555,
        status: "Not processed",
      },

      // Order 6 - Delivered (Sarah Johnson)
      {
        allProduct: [
          { id: products[7]._id, quantitiy: 1 }, // Side Mirror x1
        ],
        user: users[5]._id,
        amount: 2800,
        transactionId: "TXN6789012345",
        address: "Apartment 3C, Bahria Town Phase 4, Rawalpindi",
        phone: 923006666666,
        status: "Delivered",
      },

      // Order 7 - Shipped (Ali Hassan)
      {
        allProduct: [
          { id: products[0]._id, quantitiy: 1 }, // Oil Filter x1
          { id: products[9]._id, quantitiy: 1 }, // Air Filter x1
          { id: products[10]._id, quantitiy: 1 }, // Fuel Filter x1
        ],
        user: users[6]._id,
        amount: 3600,
        transactionId: "TXN7890123456",
        address: "House #234, PWD Road, Islamabad",
        phone: 923007777777,
        status: "Shipped",
      },

      // Order 8 - Processing (Maria Garcia)
      {
        allProduct: [
          { id: products[2]._id, quantitiy: 2 }, // Engine Oil x2
          { id: products[1]._id, quantitiy: 2 }, // Spark Plugs x2
        ],
        user: users[7]._id,
        amount: 14000,
        transactionId: "TXN8901234567",
        address: "House #89, E-11, Islamabad",
        phone: 923008888888,
        status: "Processing",
      },

      // Order 9 - Delivered (Hassan Mahmood)
      {
        allProduct: [
          { id: products[5]._id, quantitiy: 1 }, // Car Battery x1
        ],
        user: users[8]._id,
        amount: 12000,
        transactionId: "TXN9012345678",
        address: "Plot #56, Gulberg Greens, Islamabad",
        phone: 923009999999,
        status: "Delivered",
      },

      // Order 10 - Cancelled (Emily Davis)
      {
        allProduct: [
          { id: products[4]._id, quantitiy: 1 }, // Shock Absorber x1
        ],
        user: users[9]._id,
        amount: 8500,
        transactionId: "TXN0123456789",
        address: "House #345, F-6, Islamabad",
        phone: 923000000000,
        status: "Cancelled",
      },

      // Order 11 - Delivered (John Doe - 2nd order)
      {
        allProduct: [
          { id: products[6]._id, quantitiy: 1 }, // LED Headlights x1
          { id: products[8]._id, quantitiy: 2 }, // Bumper Protector x2
        ],
        user: users[0]._id,
        amount: 7100,
        transactionId: "TXN1122334455",
        address: "House #123, Street 5, F-7 Markaz, Islamabad",
        phone: 923001111111,
        status: "Delivered",
      },

      // Order 12 - Shipped (Ahmed Khan - 2nd order)
      {
        allProduct: [
          { id: products[3]._id, quantitiy: 1 }, // Brake Pads x1
          { id: products[0]._id, quantitiy: 1 }, // Oil Filter x1
        ],
        user: users[2]._id,
        amount: 7000,
        transactionId: "TXN2233445566",
        address: "Plot #45, G-11/3, Islamabad",
        phone: 923003333333,
        status: "Shipped",
      },
    ]);

    console.log(`✅ ${orders.length} orders created with realistic data`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - ${1} Admin user`);
    console.log(`   - ${users.length} Customer users`);
    console.log(`   - ${categories.length} Categories`);
    console.log(`   - ${products.length} Products`);
    console.log(`   - ${orders.length} Orders`);
    console.log("\n📋 Admin Login Credentials:");
    console.log("   Email: mehsanjadoon786@gmail.com");
    console.log("   Password: pakistan123");
    console.log("   Role: Admin\n");
    console.log("📋 Sample Customer Login:");
    console.log("   Email: john@example.com");
    console.log("   Password: password123\n");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

// Run seeder
const runSeeder = async () => {
  await connectDB();
  await seedDatabase();
};

runSeeder();
