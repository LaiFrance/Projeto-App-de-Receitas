import React, { useContext } from 'react';
import { DrinkContext } from '../context/Providers/DrinksProvider';
import BarraInferior from '../components/BarraInferior';
import CategoryBtn from '../components/CategoryBtn';

export default function Drinks() {
  const { splicedDrinks, categories } = useContext(DrinkContext);

  return (
    <div>
      <h2>Drinks</h2>
      <CategoryBtn data={ categories } />
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
