import React from 'react';
import Card from './Card.jsx';

export default function Cards({cities, onClose}) {
  // acá va tu código
  // tip, podés usar un map
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
};