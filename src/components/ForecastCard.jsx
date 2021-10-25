import React from 'react';
import style from './ForecastCard.module.css';

function ForecastCard({ day }) {
  return (
    <div>
      <div className={style.pronosticoHeader}>
        <div>
          <div className={style.weekday}>{new Date(day?.dt * 1000).toLocaleDateString('es', { weekday: 'long' })}</div>
          <div className={style.clima}>{day?.weather[0]?.description}</div>
        </div>
        <img src={`https://openweathermap.org/img/wn/${day?.weather[0].icon}@2x.png`} alt="" />
      </div>
      <div className={style.temp}>
        <h3>{day?.temp.day.toFixed(1)} ºC</h3>
      </div>
      <div className={style.minMax}>
        <div>
          Max
          <br />
          {day?.temp.max.toFixed(1)} ºC
        </div>
        <div>
          Min
          <br />
          {day?.temp.min.toFixed(1)} ºC
        </div>
      </div>
    </div>
  );
}

export default ForecastCard;
