import React from "react";
import style from './About.module.css';
import { Link } from 'react-router-dom';

function About() {
    return (
    <div className={style.container}>
        <div className={style.about}>
            <Link to="/">
                <button className={style.volver}>←</button>
            </Link>
            <div>WeatherApp es una aplicación de página única (React SPA) creada por Franco Aparicio, alumne del Bootcamp soyHenry de la cohorte FT16a. La aplicación brinda información en tiempo real del clima (extraída de openweathermap.org) de cualquier ciudad del mundo. <br/><br/><hr/><br/>WeatherApp is a React single-page app created by Franco Aparicio, student of soyHenry's Bootcamp FT16a cohort. The app offers real-time weather information (withdrawn from openweathermap.org) of any city in the world.<br/><br/><hr/></div>
            <footer><br />JULIO 2021</footer>
        </div>
    </div>)
}

export default About;