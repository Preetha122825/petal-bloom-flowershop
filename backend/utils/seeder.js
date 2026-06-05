require('dotenv').config({ path: __dirname + '/../.env' });

console.log("MONGO_URI:", process.env.MONGO_URI);
const connectDB = require('./db');
const Product   = require('../models/Product');
const User      = require('../models/User');

const products = [
  { name: 'Crimson Rose Bouquet', category: 'Roses', price: 4249, originalPrice: 5525, description: '12 fresh crimson roses with eucalyptus and baby breath.', care: 'Trim stems daily, cool water.', stock: 25, badge: 'Bestseller', isFeatured: true, rating: 4.8, numReviews: 142 },
  { name: 'White Lily Elegance',  category: 'Lilies', price: 3399, description: 'Graceful white lilies with lush greenery.', care: 'Change water every 2 days.', stock: 18, badge: 'New', rating: 4.7, numReviews: 89 },
  { name: 'Spring Tulip Mix',     category: 'Tulips', price: 2974, originalPrice: 3570, description: 'Cheerful pink, yellow and orange tulip mix.', care: 'Cool water, they keep growing after cutting.', stock: 30, badge: 'Sale', rating: 4.9, numReviews: 203 },
  { name: 'Wedding Bouquet Premium', category: 'Wedding', price: 12749, description: 'Luxury bridal bouquet with peonies, roses, ranunculus.', care: 'Hydrate overnight, refrigerate.', stock: 8, badge: 'Premium', isFeatured: true, rating: 5.0, numReviews: 67 },
  { name: 'Sunflower Sunshine',   category: 'Bouquets', price: 3144, description: 'Giant sunflowers to brighten any room.', care: 'Trim at angle, change water daily.', stock: 22, badge: 'Popular', rating: 4.8, numReviews: 176 },
  { name: 'Peace Lily Plant',     category: 'Indoor Plants', price: 2464, description: 'Air-purifying peace lily in ceramic pot.', care: 'Low light, water when soil is dry.', stock: 35, rating: 4.5, numReviews: 94 },
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany();
  await User.deleteMany({ role: 'admin' });
  await Product.insertMany(products);
  await User.create({ name: 'Admin', email: 'admin@petalandbloom.in', password: 'admin123', role: 'admin' });
  console.log('Seeded successfully');
  process.exit();
};
seed().catch(e => { console.error(e); process.exit(1); });

