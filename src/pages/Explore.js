import React from 'react';
import { useHistory } from 'react-router-dom';
import BarraInferior from '../components/BarraInferior';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();
  return (
    <div>
      <div className="header-container">
        <Header pageName="Explore" />
      </div>
      <button
        data-testid="explore-foods"
        type="button"
        onClick={ () => history.push('/explore/foods') }
      >
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        type="button"
        onClick={ () => history.push('/explore/drinks') }
      >
        Explore Drinks
      </button>

      <BarraInferior />
    </div>

  );
}
