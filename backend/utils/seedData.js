const Stall = require('../models/Stall');
const User = require('../models/User');

const stallsData = [
  {
    name: "Domino's",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    description: "Classic pizzas, garlic bread & more",
    category: "Pizza",
    rating: 4.5,
    deliveryTime: "30-40 min",
    isOpen: true,
    menu: [
      { name: "Margherita Pizza", price: 149, category: "Pizza", description: "Classic cheese & tomato" },
      { name: "Peppy Paneer Pizza", price: 179, category: "Pizza", description: "Loaded with paneer & peppers" },
      { name: "Chicken Dominator", price: 249, category: "Pizza", description: "Double chicken toppings" },
      { name: "Garlic Bread", price: 89, category: "Sides", description: "Crispy garlic bread with dip" },
      { name: "Pasta Italiano", price: 129, category: "Pasta", description: "Creamy white sauce pasta" },
      { name: "Choco Lava Cake", price: 79, category: "Dessert", description: "Warm molten chocolate cake" }
    ]
  },
  {
    name: "Lapinoz Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    description: "Loaded pizzas & fresh wraps",
    category: "Pizza",
    rating: 4.3,
    deliveryTime: "25-35 min",
    isOpen: true,
    menu: [
      { name: "Cheese Burst Pizza", price: 169, category: "Pizza", description: "Cheese filled crust" },
      { name: "BBQ Chicken Pizza", price: 219, category: "Pizza", description: "Smoky BBQ with chicken" },
      { name: "Paneer Tikka Wrap", price: 99, category: "Wrap", description: "Spicy paneer in wrap" },
      { name: "Club Sandwich", price: 89, category: "Sandwich", description: "Triple layer sandwich" },
      { name: "Cold Coffee", price: 69, category: "Drinks", description: "Creamy cold coffee" },
      { name: "Virgin Mojito", price: 59, category: "Drinks", description: "Refreshing mint mojito" }
    ]
  },
  {
    name: "Ajay's",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    description: "Authentic Indian home-style meals",
    category: "Indian",
    rating: 4.6,
    deliveryTime: "20-30 min",
    isOpen: true,
    menu: [
      { name: "Full Thali", price: 120, category: "Thali", description: "Dal, sabzi, rice, roti, salad" },
      { name: "Dal Rice", price: 70, category: "Meals", description: "Yellow dal with steamed rice" },
      { name: "Paneer Sabzi + Roti", price: 90, category: "Meals", description: "3 rotis with paneer curry" },
      { name: "Chole Bhature", price: 80, category: "Meals", description: "Spicy chole with 2 bhature" },
      { name: "Sweet Lassi", price: 40, category: "Drinks", description: "Thick chilled lassi" },
      { name: "Mango Lassi", price: 50, category: "Drinks", description: "Fresh mango lassi" }
    ]
  },
  {
    name: "Brownico",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    description: "Brownies, waffles & shakes",
    category: "Desserts",
    rating: 4.7,
    deliveryTime: "15-25 min",
    isOpen: true,
    menu: [
      { name: "Classic Brownie", price: 79, category: "Brownie", description: "Rich chocolate fudge brownie" },
      { name: "Nutella Brownie", price: 99, category: "Brownie", description: "Brownie stuffed with Nutella" },
      { name: "Belgian Waffle", price: 119, category: "Waffle", description: "Crispy waffle with maple syrup" },
      { name: "Oreo Shake", price: 99, category: "Shake", description: "Thick Oreo milkshake" },
      { name: "Cold Coffee", price: 79, category: "Drinks", description: "Blended cold coffee" },
      { name: "Brownie + Ice Cream", price: 129, category: "Combo", description: "Warm brownie with vanilla scoop" }
    ]
  },
  {
    name: "Jagdish",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
    description: "Traditional Gujarati snacks & chai",
    category: "Gujarati",
    rating: 4.4,
    deliveryTime: "15-25 min",
    isOpen: true,
    menu: [
      { name: "Dhokla", price: 50, category: "Snacks", description: "Soft steamed dhokla with chutney" },
      { name: "Fafda Jalebi", price: 60, category: "Snacks", description: "Crispy fafda with sweet jalebi" },
      { name: "Khandvi", price: 55, category: "Snacks", description: "Rolled gram flour delicacy" },
      { name: "Thepla", price: 40, category: "Roti", description: "3 methi theplas with pickle" },
      { name: "Masala Chai", price: 20, category: "Drinks", description: "Ginger spiced Indian chai" },
      { name: "Aam Ras", price: 60, category: "Drinks", description: "Thick mango pulp (seasonal)" }
    ]
  },
  {
    name: "Indian Salt",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
    description: "Mumbai street food favourites",
    category: "Street Food",
    rating: 4.5,
    deliveryTime: "20-30 min",
    isOpen: true,
    menu: [
      { name: "Pav Bhaji", price: 80, category: "Main", description: "Spicy bhaji with 3 pavs & butter" },
      { name: "Misal Pav", price: 70, category: "Main", description: "Spicy moth curry with pav" },
      { name: "Vada Pav", price: 30, category: "Snacks", description: "Mumbai's favourite street snack" },
      { name: "Bhel Puri", price: 50, category: "Chaat", description: "Tangy puffed rice chaat" },
      { name: "Sev Puri", price: 55, category: "Chaat", description: "Crispy puris with toppings" },
      { name: "Masala Soda", price: 30, category: "Drinks", description: "Tangy spiced soda" }
    ]
  },
  {
    name: "Size-Zero",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    description: "Healthy bowls, salads & smoothies",
    category: "Healthy",
    rating: 4.2,
    deliveryTime: "20-30 min",
    isOpen: true,
    menu: [
      { name: "Protein Bowl", price: 149, category: "Bowl", description: "Quinoa, chickpeas, veggies" },
      { name: "Garden Salad", price: 99, category: "Salad", description: "Fresh greens with vinaigrette" },
      { name: "Avocado Toast", price: 129, category: "Light Bites", description: "Multigrain toast with avocado" },
      { name: "Green Smoothie", price: 99, category: "Smoothie", description: "Spinach, banana, honey blend" },
      { name: "Berry Smoothie", price: 109, category: "Smoothie", description: "Mixed berry protein smoothie" },
      { name: "Detox Water", price: 49, category: "Drinks", description: "Cucumber mint detox drink" }
    ]
  },
  {
    name: "Day Night Vada Pav",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
    description: "Best vada pav & dabeli in campus",
    category: "Street Food",
    rating: 4.6,
    deliveryTime: "10-20 min",
    isOpen: true,
    menu: [
      { name: "Vada Pav", price: 25, category: "Snacks", description: "Classic spicy vada in pav" },
      { name: "Double Vada Pav", price: 45, category: "Snacks", description: "Extra filling double vada" },
      { name: "Dabeli", price: 40, category: "Snacks", description: "Sweet spicy Kutchi dabeli" },
      { name: "Masala Maggi", price: 60, category: "Noodles", description: "Spicy masala Maggi noodles" },
      { name: "Cutting Chai", price: 15, category: "Drinks", description: "Strong half-cup chai" },
      { name: "Butter Pav", price: 20, category: "Snacks", description: "Toasted butter pav" }
    ]
  },
  {
    name: "Mr. Puff",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
    description: "Freshly baked puffs & patties",
    category: "Bakery",
    rating: 4.3,
    deliveryTime: "15-25 min",
    isOpen: true,
    menu: [
      { name: "Veg Puff", price: 35, category: "Puff", description: "Flaky pastry with spicy veg filling" },
      { name: "Paneer Puff", price: 45, category: "Puff", description: "Paneer tikka filled puff" },
      { name: "Chicken Puff", price: 55, category: "Puff", description: "Chicken keema filled puff" },
      { name: "Veg Patty Burger", price: 79, category: "Burger", description: "Crispy patty with veggies" },
      { name: "Samosa", price: 25, category: "Snacks", description: "Crispy potato stuffed samosa" },
      { name: "Veg Sandwich", price: 69, category: "Sandwich", description: "Grilled veggie sandwich" }
    ]
  },
  {
    name: "Marco's Pizza",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop",
    description: "Wood-fired artisan pizzas & Italian",
    category: "Pizza",
    rating: 4.5,
    deliveryTime: "35-45 min",
    isOpen: true,
    menu: [
      { name: "Margherita Wood-fire", price: 199, category: "Pizza", description: "Classic Italian margherita" },
      { name: "Four Cheese Pizza", price: 269, category: "Pizza", description: "Mozzarella, cheddar, parmesan, gouda" },
      { name: "Chicken BBQ Pizza", price: 289, category: "Pizza", description: "BBQ chicken with onions" },
      { name: "Pasta Arrabbiata", price: 159, category: "Pasta", description: "Spicy tomato sauce pasta" },
      { name: "Calzone", price: 219, category: "Pizza", description: "Folded pizza with fillings" },
      { name: "Tiramisu", price: 119, category: "Dessert", description: "Classic Italian tiramisu" }
    ]
  },
  {
    name: "Kudrati Kahumbo",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=300&fit=crop",
    description: "Natural juices, fruits & healthy drinks",
    category: "Healthy",
    rating: 4.4,
    deliveryTime: "10-20 min",
    isOpen: true,
    menu: [
      { name: "Fresh Sugarcane Juice", price: 40, category: "Juice", description: "Chilled fresh sugarcane" },
      { name: "Mixed Fruit Juice", price: 60, category: "Juice", description: "Seasonal mixed fruits" },
      { name: "Coconut Water", price: 50, category: "Natural", description: "Fresh tender coconut" },
      { name: "Wheatgrass Shot", price: 40, category: "Health", description: "Pure wheatgrass juice" },
      { name: "Fruit Chaat", price: 70, category: "Snacks", description: "Spiced fresh fruit bowl" },
      { name: "Aloe Vera Juice", price: 45, category: "Health", description: "Fresh aloe vera drink" }
    ]
  },
  {
    name: "Santushti",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    description: "South Indian breakfast & meals",
    category: "South Indian",
    rating: 4.5,
    deliveryTime: "20-30 min",
    isOpen: true,
    menu: [
      { name: "Masala Dosa", price: 80, category: "Dosa", description: "Crispy dosa with potato masala" },
      { name: "Plain Dosa", price: 60, category: "Dosa", description: "Thin crispy rice crepe" },
      { name: "Idli Sambar (3 pcs)", price: 60, category: "Idli", description: "Soft idlis with sambar & chutney" },
      { name: "Medu Vada (2 pcs)", price: 55, category: "Vada", description: "Crispy lentil donuts" },
      { name: "Uttapam", price: 75, category: "Uttapam", description: "Thick dosa with onion tomato" },
      { name: "Filter Coffee", price: 35, category: "Drinks", description: "Authentic South Indian filter coffee" }
    ]
  },
  {
    name: "Boba 91",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Trendy bubble teas & boba drinks",
    category: "Drinks",
    rating: 4.6,
    deliveryTime: "15-25 min",
    isOpen: true,
    menu: [
      { name: "Classic Milk Tea Boba", price: 119, category: "Boba", description: "Creamy milk tea with tapioca" },
      { name: "Taro Milk Tea", price: 129, category: "Boba", description: "Purple taro with boba pearls" },
      { name: "Mango Boba", price: 119, category: "Boba", description: "Fresh mango with popping boba" },
      { name: "Brown Sugar Boba", price: 139, category: "Boba", description: "Tiger boba with brown sugar" },
      { name: "Strawberry Frappe", price: 109, category: "Frappe", description: "Blended strawberry frappe" },
      { name: "Matcha Latte", price: 119, category: "Latte", description: "Japanese matcha with milk" }
    ]
  },
  {
    name: "Belgium Waffle",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=300&fit=crop",
    description: "Authentic Belgian waffles & crepes",
    category: "Desserts",
    rating: 4.7,
    deliveryTime: "20-30 min",
    isOpen: true,
    menu: [
      { name: "Classic Belgium Waffle", price: 109, category: "Waffle", description: "Crispy waffle with maple syrup" },
      { name: "Nutella Waffle", price: 139, category: "Waffle", description: "Loaded with Nutella & banana" },
      { name: "Ice Cream Waffle", price: 149, category: "Waffle", description: "Waffle with 2 scoops ice cream" },
      { name: "Chocolate Crepe", price: 119, category: "Crepe", description: "Thin crepe with chocolate sauce" },
      { name: "Fruit Crepe", price: 129, category: "Crepe", description: "Fresh fruit filled crepe" },
      { name: "Hot Chocolate", price: 89, category: "Drinks", description: "Rich Belgian hot chocolate" }
    ]
  },
  {
    name: "Zorko",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop",
    description: "Chinese street food & momos",
    category: "Chinese",
    rating: 4.4,
    deliveryTime: "25-35 min",
    isOpen: true,
    menu: [
      { name: "Veg Momos (6 pcs)", price: 79, category: "Momos", description: "Steamed veggie dumplings" },
      { name: "Paneer Momos (6 pcs)", price: 99, category: "Momos", description: "Paneer filled steamed momos" },
      { name: "Fried Momos (6 pcs)", price: 89, category: "Momos", description: "Crispy fried momos" },
      { name: "Veg Fried Rice", price: 99, category: "Rice", description: "Wok-tossed vegetable fried rice" },
      { name: "Veg Hakka Noodles", price: 99, category: "Noodles", description: "Stir-fried hakka noodles" },
      { name: "Veg Manchurian", price: 109, category: "Gravy", description: "Crispy balls in manchurian gravy" }
    ]
  }
];

const seedData = async () => {
  try {
    const stallCount = await Stall.countDocuments();
    if (stallCount === 0) {
      await Stall.insertMany(stallsData);
      console.log('15 Food Stalls seeded successfully!');
    }

    const adminExists = await User.findOne({ isAdmin: true });
    if (!adminExists) {
      const adminMobile = process.env.ADMIN_MOBILE || '9999999999';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      await User.create({
        name: 'Admin',
        mobile: adminMobile,
        password: adminPassword,
        hostel: 'Admin Block',
        roomNumber: '001',
        isAdmin: true
      });
      console.log(` Admin user created! Mobile: ${adminMobile}`);
    }
  } catch (err) {
    console.log('Seed error:', err.message);
  }
};

module.exports = seedData;
