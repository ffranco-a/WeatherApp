import React from 'react';
import Logo from '../img/logoHenry.png';
import SearchBar from './SearchBar.jsx';
import { Link, NavLink } from 'react-router-dom';
import style from '../components/Nav.module.css';

function Nav({onSearch}) {
  return (
    <div className={style.navBar}>
      <Link to='/'>
        <img src={Logo} alt="Logo Henry" />
      </Link>
      <Link to='/'>
        <span className={style.navButton}>Weather App</span>
      </Link>
      <NavLink to='/about' activeClassName={style.active}>
        <span className={style.navButton}>About</span>
      </NavLink>
      <div className={style.search}>
        <SearchBar
          onSearch={onSearch}
        />
      </div>
    </div>
  );
};

export default Nav;
