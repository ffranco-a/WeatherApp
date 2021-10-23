export default function getCityForecast (lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=-31.41&lon=-64.18&exclude=hourly,minutely&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric&lang=sp`
  )
    .then((res) => res.json())
    .then((info) => {
      console.log(info);
      return info;
    });
};
