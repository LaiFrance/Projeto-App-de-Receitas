import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BarraInferior from '../components/BarraInferior';
import Header from '../components/Header';
import { listAllIngredients } from '../services/index';

const doze = 12;

const ExploreFoodsIngredients = () => {
  const [allIngredients, setAllIngredients] = useState([]);

  const fetchAllIngredients = async () => {
    const result = await listAllIngredients();
    const ingredients = [...result];
    const listdoze = ingredients.splice(0, doze);
    setAllIngredients(listdoze);
  };

  useEffect(() => {
    fetchAllIngredients();
  }, []);

  return (
    <div>
      <Header pageName="Explore Ingredients" />
      {allIngredients.map(({ idIngredient, strIngredient }, index) => (
        <Link
          key={ idIngredient }
          data-testid={ `${index}-ingredient-card` }
          to={ `/foods?ingredient=${strIngredient}` }
        >
          <img
            data-testid={ `${index}-card-img` }
            // https://www.themealdb.com/images/ingredients/{nome-do-ingrediente}-Small.png
            // // exemplo com "Lime"
            // https://www.themealdb.com/images/ingredients/Lime-Small.png
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
          />
          <div data-testid={ `${index}-card-name` }>{strIngredient}</div>
        </Link>
      ))}
      <BarraInferior />
    </div>
  );
};
export default ExploreFoodsIngredients;
