import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({ temp, min, max, name, id, img, weather, onClose }) {
  // acá va tu código

  return (
    <div className={style.card}>
      <button className={style.close} onClick={() => onClose(id)}>
        +
      </button>
      <Link to={`/ciudad/${id}`}>
        <div className={style.header}>
          <h2>{name}</h2>
          <span>{weather}</span>
        </div>
        <div className={style.temp}>
          <div>
            <h3>{temp}ºC</h3>
          </div>
          <div className={style.minMax}>
            <div>Max {max}ºC</div>
            <div>Min {min}ºC</div>
          </div>
          <img src={`https://openweathermap.org/img/wn/${img}@2x.png`} alt='' />
        </div>
      </Link>
    </div>
  );
}
