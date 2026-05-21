require('dotenv').config();
const mongoose = require('mongoose');
const Stall = require('./models/Stall');
const User = require('./models/User');

const stallsData = [
  {
    name: "Domino's", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    description: "Classic pizzas, garlic bread & more", category: "Pizza", rating: 4.5, deliveryTime: "30-40 min", isOpen: true,
    menu: [
      { name: "Margherita Pizza", price: 149, category: "Pizza", description: "Classic cheese & tomato", isAvailable: true },
      { name: "Peppy Paneer Pizza", price: 179, category: "Pizza", description: "Loaded with paneer", isAvailable: true },
      { name: "Chicken Dominator", price: 249, category: "Pizza", description: "Double chicken toppings", isAvailable: true },
      { name: "Garlic Bread", price: 89, category: "Sides", description: "Crispy garlic bread", isAvailable: true },
      { name: "Pasta Italiano", price: 129, category: "Pasta", description: "Creamy white sauce pasta", isAvailable: true },
      { name: "Choco Lava Cake", price: 79, category: "Dessert", description: "Warm molten cake", isAvailable: true }
    ]
  },
  {
    name: "Lapinoz Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    description: "Loaded pizzas & fresh wraps", category: "Pizza", rating: 4.3, deliveryTime: "25-35 min", isOpen: true,
    menu: [
      { name: "Cheese Burst Pizza", price: 169, category: "Pizza", description: "Cheese filled crust", isAvailable: true },
      { name: "BBQ Chicken Pizza", price: 219, category: "Pizza", description: "Smoky BBQ chicken", isAvailable: true },
      { name: "Paneer Tikka Wrap", price: 99, category: "Wrap", description: "Spicy paneer wrap", isAvailable: true },
      { name: "Club Sandwich", price: 89, category: "Sandwich", description: "Triple layer sandwich", isAvailable: true },
      { name: "Cold Coffee", price: 69, category: "Drinks", description: "Creamy cold coffee", isAvailable: true }
    ]
  },
  {
    name: "Ajay's", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    description: "Authentic Indian home-style meals", category: "Indian", rating: 4.6, deliveryTime: "20-30 min", isOpen: true,
    menu: [
      { name: "Full Thali", price: 120, category: "Thali", description: "Dal, sabzi, rice, roti, salad", isAvailable: true },
      { name: "Dal Rice", price: 70, category: "Meals", description: "Yellow dal with rice", isAvailable: true },
      { name: "Paneer Sabzi + Roti", price: 90, category: "Meals", description: "3 rotis with paneer curry", isAvailable: true },
      { name: "Sweet Lassi", price: 40, category: "Drinks", description: "Thick chilled lassi", isAvailable: true },
      { name: "Mango Lassi", price: 50, category: "Drinks", description: "Fresh mango lassi", isAvailable: true }
    ]
  },
  {
    name: "Brownico", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    description: "Brownies, waffles & shakes", category: "Desserts", rating: 4.7, deliveryTime: "15-25 min", isOpen: true,
    menu: [
      { name: "Classic Brownie", price: 79, category: "Brownie", description: "Rich chocolate brownie", isAvailable: true },
      { name: "Nutella Brownie", price: 99, category: "Brownie", description: "Brownie stuffed with Nutella", isAvailable: true },
      { name: "Belgian Waffle", price: 119, category: "Waffle", description: "Crispy waffle with maple syrup", isAvailable: true },
      { name: "Oreo Shake", price: 99, category: "Shake", description: "Thick Oreo milkshake", isAvailable: true },
      { name: "Cold Coffee", price: 79, category: "Drinks", description: "Blended cold coffee", isAvailable: true }
    ]
  },
  {
    name: "Jagdish", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
    description: "Traditional Gujarati snacks & chai", category: "Gujarati", rating: 4.4, deliveryTime: "15-25 min", isOpen: true,
    menu: [
      { name: "Dhokla", price: 50, category: "Snacks", description: "Soft steamed dhokla", isAvailable: true },
      { name: "Fafda Jalebi", price: 60, category: "Snacks", description: "Crispy fafda with jalebi", isAvailable: true },
      { name: "Khandvi", price: 55, category: "Snacks", description: "Rolled gram flour delicacy", isAvailable: true },
      { name: "Masala Chai", price: 20, category: "Drinks", description: "Ginger spiced chai", isAvailable: true }
    ]
  },
  {
    name: "Indian Salt", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
    description: "Mumbai street food favourites", category: "Street Food", rating: 4.5, deliveryTime: "20-30 min", isOpen: true,
    menu: [
      { name: "Pav Bhaji", price: 80, category: "Main", description: "Spicy bhaji with 3 pavs", isAvailable: true },
      { name: "Misal Pav", price: 70, category: "Main", description: "Spicy moth curry with pav", isAvailable: true },
      { name: "Vada Pav", price: 30, category: "Snacks", description: "Mumbai's favourite snack", isAvailable: true },
      { name: "Bhel Puri", price: 50, category: "Chaat", description: "Tangy puffed rice chaat", isAvailable: true }
    ]
  },
  {
    name: "Size-Zero", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    description: "Healthy bowls, salads & smoothies", category: "Healthy", rating: 4.2, deliveryTime: "20-30 min", isOpen: true,
    menu: [
      { name: "Protein Bowl", price: 149, category: "Bowl", description: "Quinoa, chickpeas, veggies", isAvailable: true },
      { name: "Garden Salad", price: 99, category: "Salad", description: "Fresh greens with vinaigrette", isAvailable: true },
      { name: "Green Smoothie", price: 99, category: "Smoothie", description: "Spinach banana blend", isAvailable: true },
      { name: "Detox Water", price: 49, category: "Drinks", description: "Cucumber mint detox", isAvailable: true }
    ]
  },
  {
    name: "Day Night Vada Pav", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
    description: "Best vada pav & dabeli on campus", category: "Street Food", rating: 4.6, deliveryTime: "10-20 min", isOpen: true,
    menu: [
      { name: "Vada Pav", price: 25, category: "Snacks", description: "Classic spicy vada", isAvailable: true },
      { name: "Double Vada Pav", price: 45, category: "Snacks", description: "Extra filling double vada", isAvailable: true },
      { name: "Dabeli", price: 40, category: "Snacks", description: "Sweet spicy Kutchi dabeli", isAvailable: true },
      { name: "Masala Maggi", price: 60, category: "Noodles", description: "Spicy Maggi noodles", isAvailable: true },
      { name: "Cutting Chai", price: 15, category: "Drinks", description: "Strong half-cup chai", isAvailable: true }
    ]
  },
  {
    name: "Mr. Puff", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
    description: "Freshly baked puffs & patties", category: "Bakery", rating: 4.3, deliveryTime: "15-25 min", isOpen: true,
    menu: [
      { name: "Veg Puff", price: 35, category: "Puff", description: "Flaky pastry with veg filling", isAvailable: true },
      { name: "Paneer Puff", price: 45, category: "Puff", description: "Paneer tikka filled puff", isAvailable: true },
      { name: "Chicken Puff", price: 55, category: "Puff", description: "Chicken keema filled puff", isAvailable: true },
      { name: "Samosa", price: 25, category: "Snacks", description: "Crispy potato samosa", isAvailable: true }
    ]
  },
  {
    name: "Marco's Pizza", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop",
    description: "Wood-fired artisan pizzas & Italian", category: "Pizza", rating: 4.5, deliveryTime: "35-45 min", isOpen: true,
    menu: [
      { name: "Margherita Wood-fire", price: 199, category: "Pizza", description: "Classic Italian margherita", isAvailable: true },
      { name: "Four Cheese Pizza", price: 269, category: "Pizza", description: "Mozzarella, cheddar, parmesan, gouda", isAvailable: true },
      { name: "Pasta Arrabbiata", price: 159, category: "Pasta", description: "Spicy tomato sauce pasta", isAvailable: true },
      { name: "Tiramisu", price: 119, category: "Dessert", description: "Classic Italian tiramisu", isAvailable: true }
    ]
  },
  {
    name: "Kudrati Kahumbo", image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=300&fit=crop",
    description: "Natural juices & healthy drinks", category: "Healthy", rating: 4.4, deliveryTime: "10-20 min", isOpen: true,
    menu: [
      { name: "Fresh Sugarcane Juice", price: 40, category: "Juice", description: "Chilled fresh sugarcane", isAvailable: true },
      { name: "Mixed Fruit Juice", price: 60, category: "Juice", description: "Seasonal mixed fruits", isAvailable: true },
      { name: "Coconut Water", price: 50, category: "Natural", description: "Fresh tender coconut", isAvailable: true },
      { name: "Fruit Chaat", price: 70, category: "Snacks", description: "Spiced fresh fruit bowl", isAvailable: true }
    ]
  },
  {
    name: "Santushti", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    description: "South Indian breakfast & meals", category: "South Indian", rating: 4.5, deliveryTime: "20-30 min", isOpen: true,
    menu: [
      { name: "Masala Dosa", price: 80, category: "Dosa", description: "Crispy dosa with potato masala", isAvailable: true },
      { name: "Plain Dosa", price: 60, category: "Dosa", description: "Thin crispy rice crepe", isAvailable: true },
      { name: "Idli Sambar (3 pcs)", price: 60, category: "Idli", description: "Soft idlis with sambar", isAvailable: true },
      { name: "Medu Vada (2 pcs)", price: 55, category: "Vada", description: "Crispy lentil donuts", isAvailable: true },
      { name: "Filter Coffee", price: 35, category: "Drinks", description: "Authentic South Indian coffee", isAvailable: true }
    ]
  },
  {
    name: "Boba 91", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Trendy bubble teas & boba drinks", category: "Drinks", rating: 4.6, deliveryTime: "15-25 min", isOpen: true,
    menu: [
      { name: "Classic Milk Tea Boba", price: 119, category: "Boba", description: "Creamy milk tea with tapioca", isAvailable: true },
      { name: "Taro Milk Tea", price: 129, category: "Boba", description: "Purple taro with boba pearls", isAvailable: true },
      { name: "Brown Sugar Boba", price: 139, category: "Boba", description: "Tiger boba with brown sugar", isAvailable: true },
      { name: "Matcha Latte", price: 119, category: "Latte", description: "Japanese matcha with milk", isAvailable: true }
    ]
  },
  {
    name: "Belgium Waffle", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=300&fit=crop",
    description: "Authentic Belgian waffles & crepes", category: "Desserts", rating: 4.7, deliveryTime: "20-30 min", isOpen: true,
    menu: [
      { name: "Classic Belgium Waffle", price: 109, category: "Waffle", description: "Crispy waffle with maple syrup", isAvailable: true },
      { name: "Nutella Waffle", price: 139, category: "Waffle", description: "Loaded with Nutella & banana", isAvailable: true },
      { name: "Ice Cream Waffle", price: 149, category: "Waffle", description: "Waffle with 2 scoops ice cream", isAvailable: true },
      { name: "Hot Chocolate", price: 89, category: "Drinks", description: "Rich Belgian hot chocolate", isAvailable: true }
    ]
  },
  {
    name: "Zorko", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop",
    description: "Chinese street food & momos", category: "Chinese", rating: 4.4, deliveryTime: "25-35 min", isOpen: true,
    menu: [
      { name: "Veg Momos (6 pcs)", price: 79, category: "Momos", description: "Steamed veggie dumplings", isAvailable: true },
      { name: "Paneer Momos (6 pcs)", price: 99, category: "Momos", description: "Paneer filled steamed momos", isAvailable: true },
      { name: "Veg Fried Rice", price: 99, category: "Rice", description: "Wok-tossed vegetable fried rice", isAvailable: true },
      { name: "Veg Hakka Noodles", price: 99, category: "Noodles", description: "Stir-fried hakka noodles", isAvailable: true },
      { name: "Veg Manchurian", price: 109, category: "Gravy", description: "Crispy balls in manchurian gravy", isAvailable: true }
    ]
  }
];

async function forceSeed() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected!');

    // Clear everything
    await Stall.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared old data');

    // Insert stalls
    await Stall.insertMany(stallsData);
    console.log('✅ 15 Food Stalls inserted!');

    // Create admin using User model directly
    // NOTE: We use 'new User + save()' so pre-save hook hashes password ONCE correctly
    const admin = new User({
      name: 'Admin',
      mobile: '9999999999',
      password: 'admin123',   // plain text - pre-save hook will hash it
      hostel: 'Admin Block',
      roomNumber: '001',
      isAdmin: true
    });
    await admin.save();
    console.log('✅ Admin created!');
    console.log('   Mobile:   9999999999');
    console.log('   Password: admin123');
    console.log('\n🎉 All done! Now restart backend: npm run dev');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

forceSeed();
