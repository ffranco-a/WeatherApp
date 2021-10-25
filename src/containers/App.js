import React, { useState /* useEffect */ } from 'react';
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
  const [notificacion, setNotificacion] = useState({ mensaje: 'Agregá ciudades ↑', mostrar: true, iteracion: 7, opacity: 1, fill: 'initial' });

  //* When user clicks Search button or otherwise searchs for a city
  function onSearch(ciudad) {
    //* If `ciudad` is an empty string, I won't make the Api call and let the user know that they must provide a city name
    if (ciudad === '') {
      setNotificacion({ mensaje: 'Debes introducir el nombre de una ciudad', mostrar: true, iteracion: 8, opacity: 0 });
      setTimeout(() => setNotificacion({ ...notificacion, mostrar: false, opacity: 1, fill: 'initial' }), 4200);
      return;
    } 
    
    // time to make the API call, and convert the response into json
    else setNotificacion({ mensaje: `Buscando "${ciudad}"...`, mostrar: true });
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric&lang=sp`)
      .then((r) => r.json())
      .then((recurso) => {

        //* If no city in API matches the name provided by user, I let them know
        if (recurso.main === undefined) {
          setNotificacion({ mensaje: `No se encontró la ciudad "${ciudad}"`, mostrar: true, iteracion: 7, opacity: 1 });
          return;
        } 
        
        else {
          //* If there's already a card for this city, I won't render a new card and will let user know about it
          if (cities.some((elem) => elem.name === recurso.name)) {
            setNotificacion({ mensaje: `¡Ya hay tarjeta de ${recurso.name}!`, mostrar: true, iteracion: 8, opacity: 0 });
            setTimeout(() => setNotificacion({ ...notificacion, mostrar: false }), 4200);
          } 
          
          //* If no other condition was met, that means everything is ok for a new card to be rendered;
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
              pais: recurso.sys.country,
            };
            setCities((oldCities) => [...oldCities, ciudad]);
            setNotificacion({ ...notificacion, mostrar: false });
          }
        }
      });
  }

  //* to delete a card from the list
  function onClose(id) {
    setCities((oldCities) => oldCities.filter((city) => city.id !== id));
  }

  //* When clicking a card, find that City info in state and plug it in Ciudad component
  function onFilter(ciudadId) {
    let ciudad = cities.filter((c) => c.id === parseInt(ciudadId));
    if (ciudad.length > 0) {
      return ciudad[0];
    } else {
      return null;
    }
  }

  //* Time to render!
  return (
    <div className={style.body}>
      <Route path='/' render={() => <Nav onSearch={onSearch} />} />
      <Route path='/about' component={About} />
      <Route
        exact
        path='/'
        render={() => (
          <div className={style.cards}>
            {notificacion.mostrar ? (
              <Notification
                mensaje={notificacion.mensaje}
                iteracion={notificacion.iteracion}
                opacity={notificacion.opacity}
                fill={notificacion.fill}
              />
            ) : null}
            <Cards cities={cities} onClose={onClose} setNotificacion={setNotificacion} />
          </div>
        )}
      />
      <Route exact path='/ciudad/:ciudadId' render={({ match }) => <Ciudad city={onFilter(match.params.ciudadId)} />} />
    </div>
  );
}

export default App;
