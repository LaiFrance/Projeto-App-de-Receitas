import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BarraInferior from '../components/BarraInferior';

export default function ExploreDrinks() {
  const history = useHistory();
  const [getRandomDrinks] = useContext();
  return (
    <div>
      <h2>ExploreDrinks</h2>
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
          getRandomDrinks();
          history.push('/drinks/{id-da-receita}');
        } }
      >
        Surprise me!
      </button>
      <BarraInferior />
    </div>

  );
}
