import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import './Header.css';
import { useDataFood } from '../context/Providers/FoodProvider';

function Header({ pageName }) {
  const { isClick, setIsClick } = useDataFood();
  const [isSearch, setIsSearch] = useState(true);
  const history = useHistory();

  const redirectAction = () => {
    history.push('/profile');
  };

  useEffect(() => {
    const searchVerification = () => {
      if (pageName === 'Foods') return setIsSearch(true);
      if (pageName === 'Drinks') return setIsSearch(true);
      if (pageName === 'Explore Nationalities') return setIsSearch(true);
      setIsSearch(false);
    };
    searchVerification();
  }, [pageName]);

  return (
    <div className="header-container">
      <button
        type="button"
        onClick={ redirectAction }
      >
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </button>
      <h2 data-testid="page-title">{pageName}</h2>
      {isSearch
          && (
            <button
              type="button"
              onClick={ () => setIsClick(!isClick) }
            >
              <img
                src={ searchIcon }
                alt="search-icon"
                data-testid="search-top-btn"
              />
            </button>)}
    </div>

  );
}

Header.propTypes = {
  pageName: PropTypes.string,
}.isRequired;

export default Header;
