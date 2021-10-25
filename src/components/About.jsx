import React, { useState } from 'react';
import style from './About.module.css';
import { Link } from 'react-router-dom';
import { VscArrowLeft } from 'react-icons/vsc';
import { RiMailOpenFill } from 'react-icons/ri';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';

function About() {
  const [showTooltip, setShowTooltip] = useState(false);

  const timer = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1500);
  };

  //* for copypasting my e-mail
  const copyText = () => {
    navigator.clipboard.writeText('ffrancoaparicio@gmail.com');
    timer();
  };

  return (
    <div className={style.container}>
      <div className={style.about}>
        <Link to='/'>
          <button className={style.volver}>
            <VscArrowLeft />
          </button>
        </Link>
        <div>
          <i>¿Quieres saber qué temperatura hace en tu ciudad y en cualquier parte del mundo?</i> Escribe los nombres de las ciudades que quieras en
          la barra de búsqueda y se generará una tarjeta por cada una de ellas.{' '}
          <i>¿Quieres ver más detalles, y el pronóstico extendido de la semana?</i> Clickea en cualquiera de las tarjetas para ampliar la información
          del clima de esa ciudad. — WeatherApp es una aplicación de página única (React SPA) creada por Franco Aparicio, alumne del bootcamp{' '}
          <a href='https://www.soyhenry.com'>soyHenry</a>. La aplicación brinda información del clima en tiempo real (extraída de{' '}
          <a href='https://openweathermap.org/api'>API de openweathermap</a>) de cualquier ciudad del mundo. <br />
          <hr />
          <i>Would you like to know how's the weather like in your city? or any city in the world, actually!</i> Just type in their names in the
          search bar above, and you'll get a card for each one of them showing the main information.{' '}
          <i>Would you like to see more details, along with the nwxr week forecast?</i> Click in any of your city-cards to expand the weather
          information of that city. — WeatherApp is a React single-page app created by Franco Aparicio, student of{' '}
          <a href='https://www.soyhenry.com'>soyHenry</a>'s bootcamp. The app offers real-time weather information (withdrawn from{' '}
          <a href='https://openweathermap.org/api'>openweathermap's API</a>) of any city in the world.
          <br />
          <hr />
        </div>
        <footer>
          <span className={style.networks}>Franco Aparicio</span>
          <br />
          <span title='Click to copy mail to clipboard' className={style.a} onClick={copyText}>
            <RiMailOpenFill className={style.networks} /> ffrancoaparicio@gmail.com
          </span>
          {showTooltip && <div className={style.tooltip}>Mail copied to clipboard!</div>}
          <br />
          <a href='https://www.linkedin.com/in/franco-aparicio/' target='_blank' rel='noopener noreferrer'>
            <FaLinkedin className={style.networks} /> linkedin.com/in/franco-aparicio/
          </a>
          <br />
          <a href='https://github.com/ffranco-a/' target='_blank' rel='noopener noreferrer'>
            <FaGithubSquare className={style.networks} /> github.com/ffranco-a/
          </a>
          <br />
          JULIO / AGOSTO — 2021
        </footer>
      </div>
    </div>
  );
}

export default About;
