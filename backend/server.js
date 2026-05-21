const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stalls', require('./routes/stalls'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/ai', require('./routes/ai'));

app.get('/', (req, res) => res.json({ message: 'CampusBite API Running 🚀' }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log('✅ MongoDB Connected!');
    // Auto seed on first run (only if DB empty)
    require('./utils/seedData');
  })
  .catch(err => console.log('❌ MongoDB Error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
