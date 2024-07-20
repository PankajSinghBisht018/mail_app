const express = require('express');
const cors = require('cors');
const connectDB = require('./conn/db');
const emailRoutes = require('./routes/emailRoutes');
const donationRoutes =require('./routes/donationRoutes')
const tempEmailRoutes = require('./routes/tempEmailRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const orderRoutes = require('./routes/orderRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', emailRoutes);
app.use('/api', donationRoutes);
app.use('/api', tempEmailRoutes);
app.use('/api', campaignRoutes);
app.use('/api', surveyRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
