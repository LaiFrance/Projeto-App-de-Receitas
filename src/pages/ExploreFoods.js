import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMyContext } from '../context/Providers/ExploreProvider';
import BarraInferior from '../components/BarraInferior';
import Header from '../components/Header';

export default function ExploreFoods() {
  const history = useHistory();
  const { randomFood } = useMyContext();

  return (
    <div>
      <div className="header-container">
        <Header pageName="Explore Foods" />
      </div>

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
          history.push(`/foods/${randomFood}`);
        } }
      >
        Surprise me!
      </button>
      <BarraInferior />
    </div>

  );
}
