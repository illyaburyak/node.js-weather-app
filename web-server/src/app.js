const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirectoryPath = path.join(__dirname, '../public');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Illya Buryak',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Illya Buryak',
    title: 'Software Engineer',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Illya Buryak',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      err: 'Address must be provided',
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Illya Buryak',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Not Found',
    name: 'Illya Buryak',
    errorMessage: 'Page Not Found',
  });
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
