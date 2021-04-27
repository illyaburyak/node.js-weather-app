const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

let loc = process.argv[2];

if (!loc) {
  console.log('Please provide the adress');
} else {
  geocode(loc, (err, { latitude, longitude, location } = {}) => {
    if (err) return;

    forecast(latitude, longitude, (err, forrecastData) => {
      if (err) return;

      console.log(location);
      console.log(`${forrecastData}℃`);
    });
  });
}
