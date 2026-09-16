require('dotenv').config();
const express = require('express');

const applicationRoutes = require('./src/routes/applicationRoutes');

const app = express();

app.use(express.json());

app.use('/applications', applicationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});