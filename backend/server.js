const express    = require('express');
const dotenv     = require('dotenv');
const cors       = require('cors');
const path       = require('path');
const connectDB  = require('./utils/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders',   require('./routes/orderRoutes'));
app.use('/api/cart',     require('./routes/cartRoutes'));
app.use('/api/users',    require('./routes/userRoutes'));
app.use('/api/admin',    require('./routes/adminRoutes'));

app.get('/', (req, res) => res.json({ message: 'Petal & Bloom API running 🌸' }));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
