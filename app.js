const express = require('express');
const path = require('path');
const layouts = require('express-ejs-layouts');
const ejsmate = require('ejs-mate');
const methodOverride = require('method-override');

const ledgerRoutes = require('./routes/ledgerRoutes');
const billRoutes = require('./routes/billRoutes');
const stockRoutes = require('./routes/stockRoutes');
const mongoose = require('./config/monoDB');

const ExpressError = require('./error/error')
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(layouts);
app.set('layout', 'layouts/layout'); // default layout file
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// error handling middleware
// Your routes go here...
// app.use('/bill', billRoutes);

// ERROR HANDLER (last thing)
// Error handling middleware





app.use('/ledger', ledgerRoutes);
app.use('/bill', billRoutes);
app.use('/stock', stockRoutes);

app.get('/', (req, res) => {
  res.render('dashboard')
});

// 404 handler (optional)
app.use((req, res, next) => {
  next(new Error('Page Not Found'));
});

// ERROR HANDLER (MUST BE LAST)
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).render('error.ejs', { status, message });
});
// test route



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

