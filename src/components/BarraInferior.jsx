import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './BarraInferior.css';

export default function BarraInferior() {
  return (
    <footer data-testid="footer">
      <Link
        to="/drinks"
      >
        <img
          src={ drinkIcon }
          alt="drinks-icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link
        to="/explore"
      >
        <img
          src={ exploreIcon }
          alt="explore-icon"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link
        to="/foods"
      >
        <img
          src={ mealIcon }
          alt="food-icon"
          data-testid="food-bottom-btn"
        />
      </Link>

    </footer>
  );
}
