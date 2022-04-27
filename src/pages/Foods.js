import React, { useContext } from 'react';
import { FoodContext } from '../context/Providers/FoodProvider';
import BarraInferior from '../components/BarraInferior';

export default function Foods() {
  const { splicedFoods } = useContext(FoodContext);

  return (
    <div>
      <h2>Foods</h2>
      {splicedFoods.length > 0 ? splicedFoods.map((food, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ food.strMealThumb }
            alt={ `imagem de ${food.strMeal}` }
          />
          <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
        </div>
      )) : ''}
      <BarraInferior />
    </div>
  );
}
