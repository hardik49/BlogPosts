const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
require('dotenv').config();

const routes = require('./routes/routes');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 5000;
const app = express();

// app.use(express.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/css/'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(routes);
app.use('/user', userRoutes);


app.listen(port, () => {
  console.log(`Server started at https://localhost:${port}`);
})