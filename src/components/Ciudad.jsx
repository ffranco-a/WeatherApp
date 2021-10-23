import React, { useState, useEffect } from 'react';
import style from './Ciudad.module.css';
import { Link } from 'react-router-dom';
import { VscTriangleDown, VscArrowLeft } from 'react-icons/vsc';
import getCityForecast from '../helpers/getCityForecast';

export default function Ciudad({ city }) {

  const [forecast, setForecast] = useState({});

  const getForecast = async () => {
    let daily = getCityForecast(city?.latitud, city?.longitud)
    console.log('daily: ', daily);
    setForecast(daily);
  }
  // getForecast();

  if (city === null)
    return (
      <div>
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
              <div>
                Clima: {city?.weather} ({city?.weather2})
              </div>
              <div>Nubosidad: {city?.clouds}%</div>
              <div>Humedad: {city?.humedad}%</div>
              <div>
                Viento: {city?.wind} m/s <VscTriangleDown style={{ transform: `rotate(${city?.direction}deg) scale(0.5, 2)` }} />
              </div>
            </div>
            <div className={style.containerIcon}>
              <img className={style.icon} src={`https://openweathermap.org/img/wn/${city?.img}@2x.png`} alt={city?.weather} />
            </div>
          </div>
        </div>
        <div className={style.forecast}>
          {forecast?.hasOwnProperty('daily') ? (
            forecast?.daily.map((day, i) => (
              <div>
                {day.weather.description}
              </div>
            ))
          ) : (
            <div>
              Cargando
            </div>
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
