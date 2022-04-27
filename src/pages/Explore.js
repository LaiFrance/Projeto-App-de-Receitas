import React from 'react';
import { useHistory } from 'react-router-dom';
import BarraInferior from '../components/BarraInferior';

export default function Explore() {
  const history = useHistory();
  return (
    <div>
      <h2>Explore</h2>
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
