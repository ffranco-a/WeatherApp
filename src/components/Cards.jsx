import React from 'react';
import Card from './Card.jsx';

export default function Cards({cities, onClose}) {
  // acá va tu código
  // tip, podés usar un map
  if (cities.length === 0) return (
      <span>
        <h1>↑ </h1>
        <h2>Agregá una ciudad</h2>
      </span>
  ); else {
    return cities.map(function (elem) {
      return (
      <div key={elem.id}>
        <Card 
          id={elem.id}
          name={elem.name}
          max={elem.max}
          min={elem.min}
          img={elem.img}
          temp={elem.temp}
          onClose={onClose}>
        </Card>
      </div>)
    })
  }
};