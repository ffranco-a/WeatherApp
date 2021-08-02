import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Cards from '../components/Cards.jsx';
import style from '../components/Style.module.css';
import { Route } from 'react-router-dom';
import About from '../components/About.jsx';
import Ciudad from '../components/Ciudad.jsx';
import Notificacion from '../components/Notificacion.jsx';


function App() {
  const [cities, setCities] = useState([]);
  const [notificacion, setNotificacion] = useState({mensaje: "Agregá una ciudad ↑", mostrar: true});

  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
    setNotificacion({...notificacion, mostrar: false}); // ← Solo una manera de limpiar la pantalla una vez que le usuarie interactue... una vez que aprenda a cronometrar la notifiación para que desaparezca automáticamente según el mensaje, no hará falta esta línea
  }
  function onSearch(ciudad) {
    //Llamado a la API del clima
    if (ciudad === '') {
      setNotificacion({mensaje: "Debes introducir una ciudad", mostrar: true});
      return;
    }
    else 
    setNotificacion({mensaje: `Buscando "${ciudad}"...`, mostrar: true})
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric`)
      .then(r => r.json())
      .then((recurso) => {
        if(recurso.main !== undefined){
          if (cities.some((elem) => elem.name === recurso.name)) setNotificacion({mensaje: `¡Ya hay tarjeta de ${recurso.name}!`, mostrar: true});
          else {
            const ciudad = {
              min: Math.round(recurso.main.temp_min),
              max: Math.round(recurso.main.temp_max),
              img: recurso.weather[0].icon,
              id: recurso.id,
              wind: recurso.wind.speed,
              temp: Math.round(recurso.main.temp),
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
          setNotificacion({mensaje: `No se encontró la ciudad "${ciudad}"`, mostrar: true});
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
  }
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
            ? <Notificacion mensaje={notificacion.mensaje} /> 
            : null }
            <Cards cities={cities} onClose={onClose} setNotificacion={setNotificacion}/>
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
