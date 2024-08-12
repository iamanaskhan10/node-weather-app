const axios = require("axios");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f85c9dba4bf4fdcc5e963388d6118c95&query=${latitude},${longitude}`;

  axios
    .get(url)
    .then((response) => {
      const body = response.data;

      if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(
          undefined,
          `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain.`
        );
      }
    })
    .catch((error) => {
      if (error.response) {
        callback(
          `Error: ${error.response.status} - ${error.response.statusText}`,
          undefined
        );
      } else if (error.request) {
        callback("Unable to connect to weather service!", undefined);
      } else {
        callback(`Error: ${error.message}`, undefined);
      }
    });
};

module.exports = forecast;
