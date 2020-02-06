const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes/routes');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(routes);
app.use('/user',userRoutes);
app.listen(port, () => {
  console.log(`Server started at https://localhost:${port}`);
})