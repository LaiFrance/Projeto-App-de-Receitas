import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BarraInferior from '../components/BarraInferior';
import Header from '../components/Header';
import { listAllIngredientsDrinks } from '../services/index';

const doze = 12;

const ExploreDrinksIngredients = () => {
  const [allIngredients, setAllIngredients] = useState([]);

  const fetchAllIngredients = async () => {
    const result = await listAllIngredientsDrinks();
    const ingredients = [...result];
    const listdoze = ingredients.splice(0, doze);
    setAllIngredients(listdoze);
  };

  useEffect(() => {
    fetchAllIngredients();
  }, []);

  return (
    <>
      <Header pageName="Explore Ingredients" />
      <div className="explore-ingredients ">

        {allIngredients.map(({ strIngredient1 }, index) => (
          <Link
            key={ strIngredient1 }
            data-testid={ `${index}-ingredient-card` }
            to={ `/drinks?ingredient=${strIngredient1}` }
          >
            <img
            // https://www.themealdb.com/images/ingredients/{nome-do-ingrediente}-Small.png
            // // exemplo com "Lime"
            // https://www.themealdb.com/images/ingredients/Lime-Small.png
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
            />
            <div data-testid={ `${index}-card-name` }>{strIngredient1}</div>
          </Link>
        ))}
        <BarraInferior />
      </div>

    </>
  );
};
export default ExploreDrinksIngredients;
