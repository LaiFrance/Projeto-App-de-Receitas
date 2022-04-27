import React, { useContext } from 'react';
import { DrinkContext } from '../context/Providers/DrinksProvider';
import BarraInferior from '../components/BarraInferior';

export default function Drinks() {
  const { splicedDrinks } = useContext(DrinkContext);

  return (
    <div>
      <h2>Drinks</h2>
      {splicedDrinks.length > 0 ? splicedDrinks.map((drink, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ `imagem de ${drink.strDrink}` }
          />
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </div>
      )) : ''}
      <BarraInferior />
    </div>

  );
}
