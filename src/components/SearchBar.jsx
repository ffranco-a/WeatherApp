import React, { useState } from 'react';
import style from '../components/SearchBar.module.css';
import { VscAdd } from 'react-icons/vsc';

export default function SearchBar({ onSearch }) {
  let [city, setCity] = useState('');

  return (
    <div>
      <input
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch(city);
            setCity('');
          }
        }}
        placeholder='Agregar ciudad...'
      />
      <button
        className={style.button}
        onClick={() => {
          onSearch(city);
          setCity('');
        }}>
        <VscAdd />
      </button>
    </div>
  );
}
