const request = require('request');

const forecast = (lan, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7218b374ddde8531fbd5dd746b40bb5a&query=${lat},${lan}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Could not fetch location', undefined);
    } else if (body.error) {
      callback('Problem with connection, please try again', undefined);
    } else {
      callback(undefined, body.current.temperature);
    }
  });
};

module.exports = forecast;
