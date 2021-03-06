require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
const flash = require('req-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');


const routes = require('./routes/routes');

const port = process.env.PORT || 5000;
const app = express();

app.use(session({
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}));

app.use(expressLayout);
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function(err, val) {
  if(err) {
    console.log('Error: Database connection can not established..!');
  } else {
    console.log('database connection established...!')
  }
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server started at https://localhost:${port}/`);
})