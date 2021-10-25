import React, { useState, useEffect } from 'react';
import style from './Ciudad.module.css';
import { Link } from 'react-router-dom';
import { VscTriangleDown, VscArrowLeft } from 'react-icons/vsc';
import getCityForecast from '../helpers/getCityForecast';

export default function Ciudad({ city }) {
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    async function getForecast() {
      const daily = await getCityForecast(city?.latitud, city?.longitud);
      console.log('daily: ', daily);
      setForecast(daily);
    }
    getForecast();
  }, [city]);

  if (city !== null)
    return (
      <div className={style.container}>
        <div className={style.ciudad}>
          <Link to='/'>
            <button className={style.goBack}>
              <VscArrowLeft />
            </button>
          </Link>
          <div className={style.title}>
            <h1>
              {city?.name}, {city?.pais}
            </h1>
            <div>
              Lat {city?.latitud}º | Lon {city?.longitud}º
            </div>
          </div>
          <hr />
          <div>
            <h3>
              Temperatura: <br />
              {city?.temp} ºC
            </h3>
            <h5>
              Max: {city?.max}ºC | Min: {city?.min}ºC
            </h5>
            <div className={style.info}>
              <div>Sensación térmica: {city?.sensacionTermica}ºC</div>
              <div className={style.clima}>
                Clima: {city?.weather} ({city?.weather2})
              </div>
              <div>Nubosidad: {city?.clouds}%</div>
              <div>Humedad: {city?.humedad}%</div>
              <div>
                Viento: {city?.wind} m/s <VscTriangleDown style={{ transform: `rotate(${city?.direction}deg) scale(0.5, 2)` }} />
              </div>
            </div>
            <div className={style.containerIcon}>
              <img className={style.icon} src={`https://openweathermap.org/img/wn/${city?.img}@2x.png`} alt='' />
            </div>
          </div>
        </div>
        <div className={style.forecast}>
          {forecast?.hasOwnProperty('daily') ? (
            forecast?.daily.slice(1).map((day, i) => (
              <div key={i} className={style.day}>
                <div>
                  <div className={style.pronosticoHeader}>
                    <div>
                      <div className={style.weekday}>{new Date(day.dt * 1000).toLocaleDateString('es', { weekday: 'long' })}</div>
                      <div className={style.climaPronostico}>{day.weather[0].description}</div>
                    </div>
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
                  </div>
                  <div className={style.temp}>
                    <h3>{day.temp.day.toFixed(1)} ºC</h3>
                  </div>
                  <div className={style.minMax}>
                    <div>
                      Max
                      <br />
                      {day.temp.max.toFixed(1)} ºC
                    </div>
                    <div>
                      Min
                      <br />
                      {day.temp.min.toFixed(1)} ºC
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={style.error}>Cargando pronóstico semanal...</div>
          )}
        </div>
      </div>
    );
  else {
    return (
      <div className={style.error}>
        No se encontró la ciudad especificada :(
        <Link to='/'>
          <div>← Volver</div>
        </Link>
      </div>
    );
  }
}
