import React from 'react';
import SearchBar from './SearchBar.jsx';
import { Link, NavLink } from 'react-router-dom';
import style from '../components/Nav.module.css';

function Nav({onSearch}) {
  return (
    <div className={style.navBar}>
      <Link to='/'>
        <span className={style.navButton}>Weather App</span>
      </Link>
      <Link to='/'>
        <button className={style.navButtonMobile}>Home</button>
      </Link>
      <NavLink to='/about' activeClassName={style.active}>
        <span className={style.navButton}>About</span>
      </NavLink>
      <div className={style.search}>
        <SearchBar
          onSearch={onSearch}
        />
      </div>
      <NavLink to='/about' activeClassName={`${style.active} ${style.info}`}>
        <button className={style.navButtonMobile}>i</button>
      </NavLink>
    </div>
  );
};

export default Nav;
