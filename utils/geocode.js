const request = require('request');

const geocoder = (adress, callback) => {
  const adressInUrl = encodeURI(adress);

  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adressInUrl}.json?access_token=${process.env.MAPBOX_TOKEN}`;

  request({ url: geocodeUrl, json: true }, (err, res) => {
    if (err) {
      callback('something went wrong', undefined);
    } else if (res.body.features.length == 0) {
      callback('something went wrong', undefined);
    } else {
      callback(undefined, {
        longitude: res.body.features[0].center[0],
        latitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocoder;
