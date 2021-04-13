const request = require('request');
const dotenv = require('dotenv');
const geocoder = require('./utils/geocode');
const forecast = require('./utils/forecast');

dotenv.config({ path: './config.env' });

if (process.argv.length !== 3) {
  console.log('Usage : node app <location>\nExample : node app Ankara');
  process.exit();
}

const adress = process.argv[2];

geocoder(adress, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.location);
  forecast(data.latitude, data.longitude, (err, forecast) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(forecast);
  });
});
