import React, { useContext, useState, useEffect } from 'react';
import { FoodContext } from '../context/Providers/FoodProvider';
import BarraInferior from '../components/BarraInferior';
import CategoryBtn from '../components/CategoryBtn';
import { searchFoodByCategory } from '../services/index';

export default function Foods() {
  const [foods, setFoods] = useState([]);
  const { splicedFoods, categories } = useContext(FoodContext);

  useEffect(() => {
    setFoods(splicedFoods);
  }, [splicedFoods]);

  const handleCategoryBtn = async (category) => {
    const foodsbyCategory = await searchFoodByCategory(category);
    setFoods(foodsbyCategory);
  };

  return (
    <div>
      <h2>Foods</h2>
      <CategoryBtn data={ categories } func={ handleCategoryBtn } />
      {foods.length > 0 ? foods.map((food, index) => (
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
