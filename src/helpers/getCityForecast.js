export default async function getCityForecast (lat, lon) {
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat ? lat : '-31.41'}&lon=${lon ? lon : '-64.18'}&exclude=hourly,minutely&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric&lang=sp`
  )
  let forecast = await res.json();
  return forecast;
};
