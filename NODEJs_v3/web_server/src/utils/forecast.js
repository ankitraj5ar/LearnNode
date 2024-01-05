import request from "request";

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=" +
    address;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        response.body
        // response.body.current.weather_descriptions[0] +
        //   ". It is currently " +
        //   response.body.current.temperature +
        //   " degress out."
      );
    }
  });
};

// forecast("Munger", (error, forecastData) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log(forecastData);
// });

export default forecast;
