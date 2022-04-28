import React, { useContext, useState, useEffect } from 'react';
import { DrinkContext } from '../context/Providers/DrinksProvider';
import BarraInferior from '../components/BarraInferior';
import CategoryBtn from '../components/CategoryBtn';
import { searchDrinkByCategory } from '../services/index';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const { splicedDrinks, categories } = useContext(DrinkContext);

  useEffect(() => {
    setDrinks(splicedDrinks);
  }, [splicedDrinks]);

  const handleCategoryBtn = async (category) => {
    const drinksbyCategory = await searchDrinkByCategory(category);
    setDrinks(drinksbyCategory);
  };

  return (
    <div>
      <h2>Drinks</h2>
      <CategoryBtn data={ categories } func={ handleCategoryBtn } />
      {drinks.length > 0 ? drinks.map((drink, index) => (
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
