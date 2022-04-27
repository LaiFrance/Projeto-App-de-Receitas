import React from 'react';
import { useHistory } from 'react-router-dom';
import BarraInferior from '../components/BarraInferior';

export default function ExploreFoods() {
  const history = useHistory();
  const [getRandomFood] = useContext();

  return (
    <div>
      <h2>ExploreFoods</h2>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => {
          getRandomFood();
          history.push('/foods/{id-da-receita}');
        } }
      >
        Surprise me!
      </button>
      <BarraInferior />
    </div>

  );
}
