import React from "react";
import style from "./Ciudad.module.css";
import { Link } from "react-router-dom";

export default function Ciudad({city}) {
    if (city !== null) return (
        <div className={style.ciudad}>
                <div>
                    <Link to="/">
                        <button className={style.goBack}>←</button>
                    </Link>
                    <div className={style.title}>
                        <h1>{city.name}, {city.pais}</h1>
                        <div>Lat {city.latitud}º  |  Lon {city.longitud}º</div>
                    </div>
                    <hr />
                    <div>
                        <h3>Temperatura: <br />{city.temp} ºC</h3>
                        <h5>Max: {city.max}ºC | Min: {city.min}ºC</h5>
                        <div className={style.info}>
                            <div>Sensación térmica: {city.sensacionTermica}ºC</div>
                            <div>Clima: {city.weather} ({city.weather2})</div>
                            <div>Nubosidad: {city.clouds}%</div>
                            <div>Humedad: {city.humedad}%</div>
                            <div>Viento: {city.wind} km/h</div>
                        </div>
                        <div className={style.containerIcon}>
                            <img className={style.icon} src={`http://openweathermap.org/img/wn/${city.img}@2x.png`} alt={city.weather} />
                        </div>
                    </div>
            </div>
        </div>
    ); else {
        return (
            <div className={style.error}>No se encontró la ciudad especificada :(
                <Link to="/">
                    <div>← Volver</div>
                </Link>
            </div>
        );
    }
}