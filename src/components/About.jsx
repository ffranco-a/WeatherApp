import React from 'react';
import style from './About.module.css';
import { Link } from 'react-router-dom';
import { VscArrowLeft } from 'react-icons/vsc';

function About() {
  return (
    <div className={style.container}>
      <div className={style.about}>
        <Link to='/'>
          <button className={style.volver}>
            <VscArrowLeft />
          </button>
        </Link>
        <div>
          ¿Quieres saber qué temperatura hace en tu ciudad, y en cualquier parte del mundo? Escribe los nombres de las ciudades que quieras en la
          barra de búsqueda y se generará una tarjeta por cada una de ellas. ¿Quieres más detalles? haz click en cualquiera de las tarjetas que
          generaste para ampliar la información del clima de esa ciudad. — WeatherApp es una aplicación de página única (React SPA) creada por Franco
          Aparicio, alumne del bootcamp soyHenry.com. La aplicación brinda información en tiempo real del clima (extraída de openweathermap.org) de
          cualquier ciudad del mundo. <br />
          <br />
          <hr />
          <br />
          Would you like to know how's the weather in your city? or any city in the world, actually! Just type in their names in the search bar above,
          it will create a card for each one of them showing the main information. Would you like to see more details? Click in any of your city-cards
          to expand the weather information of that city. — WeatherApp is a React single-page app created by Franco Aparicio, student of
          soyHenry.com's bootcamp. The app offers real-time weather information (withdrawn from openweathermap.org) of any city in the world.
          <br />
          <br />
          <hr />
        </div>
        <footer>
          <br />
          JULIO — AGOSTO / 2021
        </footer>
      </div>
    </div>
  );
}

export default About;
