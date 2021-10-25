export default async function getCityForecast(lat, lon) {
  if (lat && lon) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric&lang=sp`
    );
    let forecast = await res.json();
    return forecast;
  }
}
