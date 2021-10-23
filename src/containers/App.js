import React, { useState } from 'react';
import { Route } from 'react-router-dom';

//? Components
import Nav from '../components/Nav.jsx';
import Cards from '../components/Cards.jsx';
import About from '../components/About.jsx';
import Ciudad from '../components/Ciudad.jsx';
import Notification from '../components/Notification.jsx';

//? Module CSS
import style from '../components/Style.module.css';

function App() {
  //* Cities state where all city cards/info is storaged
  const [cities, setCities] = useState([]);

  //* Notification state where information about server is displayed to the user
  const [notificacion, setNotificacion] = useState({mensaje: "Agregá ciudades ↑", mostrar: true, iteracion: 7, opacity: 1, fill: "initial"});

  // var timeoutId;

  function onClose(id) {
    setCities(oldCities => oldCities.filter(city => city.id !== id));
    // setNotificacion({...notificacion, mostrar: false}); // ← Solo una manera de limpiar la pantalla una vez que le usuarie interactue... una vez que aprenda a cronometrar la notifiación para que desaparezca automáticamente según el mensaje, no hará falta esta línea
    // setTimeout(() => setNotificacion({...notificacion, mostrar: false}), 2500)
  }
  function onSearch(ciudad) {
    //Llamado a la API del clima
    // if (timeoutId) clearTimeout(timeoutId);
    if (ciudad === '') {
      // timeoutId = setTimeout(() => setNotificacion({...notificacion, mostrar: false}), 3500)
      setNotificacion({mensaje: "Debes introducir el nombre de una ciudad", mostrar: true, iteracion: 8, opacity: 0});
      setTimeout(() => setNotificacion({...notificacion, mostrar: false, opacity: 1, fill: "initial"}), 4200)
      return;
    }
    else 
    setNotificacion({mensaje: `Buscando "${ciudad}"...`, mostrar: true})
    // setTimeout(() => setNotificacion({...notificacion, mostrar: false}), 3000)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric&lang=sp`)
      .then(r => r.json())
      .then((recurso) => {
        if(recurso.main !== undefined){
          if (cities.some((elem) => elem.name === recurso.name)) {
            // if (timeoutId) clearTimeout(timeoutId);
            // timeoutId = setTimeout(() => setNotificacion({...notificacion, mostrar: false}), 3000)
            setNotificacion({mensaje: `¡Ya hay tarjeta de ${recurso.name}!`, mostrar: true, iteracion: 8, opacity: 0});
            setTimeout(() => setNotificacion({...notificacion, mostrar: false}), 4200)
            // setTimeout(() => setNotificacion({...notificacion, mostrar: false}), 3500)
          } 
          else {
            const ciudad = {
              min: Math.floor(recurso.main.temp_min),
              max: Math.ceil(recurso.main.temp_max),
              img: recurso.weather[0].icon,
              id: recurso.id,
              wind: recurso.wind.speed,
              direction: recurso.wind.deg,
              temp: recurso.main.temp.toFixed(1),
              name: recurso.name,
              weather: recurso.weather[0].main,
              weather2: recurso.weather[0].description,
              clouds: recurso.clouds.all,
              latitud: recurso.coord.lat,
              longitud: recurso.coord.lon,
              humedad: recurso.main.humidity,
              sensacionTermica: Math.round(recurso.main.feels_like),
              pais: recurso.sys.country
            };
            setCities(oldCities => [...oldCities, ciudad]);
            setNotificacion({...notificacion, mostrar: false})
          }
        } else {
          // if (timeoutId) clearTimeout(timeoutId);
          setNotificacion({mensaje: `No se encontró la ciudad "${ciudad}"`, mostrar: true, iteracion: 7, opacity: 1});
          // setTimeout(() => setNotificacion({...notificacion, mostrar: false}), 3500)
          // setTimeout(() => setNotificacion({...notificacion, mostrar: false}), 3500)
          return;
        }
      });
  }
  function onFilter(ciudadId) {
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
    if(ciudad.length > 0) {
      return ciudad[0];
    } else {
      return null;
    }
  } // setNotificacion={setNotificacion}
  return (
    <div className={style.body}>
      <Route
        path='/'
        render={() => <Nav onSearch={onSearch} />}
      />
      <Route
        path='/about'
        component={About}
      />
      <Route 
        exact path='/'
        render={() => (
          <div className={style.cards}>
            { (notificacion.mostrar) 
            ? <Notification mensaje={notificacion.mensaje} iteracion={notificacion.iteracion} opacity={notificacion.opacity} fill={notificacion.fill} /> 
            : null }
            <Cards cities={cities} onClose={onClose} setNotificacion={setNotificacion} /> 
          </div>
        )}
      /> 
      <Route
        exact path='/ciudad/:ciudadId'
        render={({match}) => <Ciudad
          city={onFilter(match.params.ciudadId)}
        />}
      />
    </div>
  );
}

export default App;
