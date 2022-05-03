import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMyContext } from '../context/Providers/ExploreProvider';
import BarraInferior from '../components/BarraInferior';
import Header from '../components/Header';

export default function ExploreDrinks() {
  const history = useHistory();
  const { randomDrinks } = useMyContext();
  return (
    <div>
      <div className="header-container">
        <Header pageName="Explore Drinks" />
      </div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => {
          history.push(`/drinks/${randomDrinks}`);
        } }
      >
        Surprise me!
      </button>
      <BarraInferior />
    </div>

  );
}
