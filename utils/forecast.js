const request = require('request');

const forecast = (lat, long, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${lat},${long}&units=m`;

  request({ url: weatherUrl, json: true }, (err, res) => {
    if (err) {
      callback('Someting went wrong', undefined);
    } else if (res.body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        description: res.body.current.weather_descriptions[0],
        temperature: res.body.current.temperature,
        feelslike: res.body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
