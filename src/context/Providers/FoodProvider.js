import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

export const FoodContext = createContext();

export default function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [splicedFoods, setSplicedFoods] = useState([]); // primeiros doze itens

  useEffect(() => {
    async function getMeals() {
      try {
        const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        // requisição genérica das comidas
        const request = await fetch(URL);
        const response = await request.json();
        setFoods(response.meals);
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getMeals();
  }, []);

  useEffect(() => {
    const doze = 12;
    if (foods.length > 0) {
      const newFoods = foods.slice(0, doze);
      setSplicedFoods(newFoods);
    }
  }, [foods]);

  return (
    <FoodContext.Provider value={ { foods, splicedFoods } }>
      {children}
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
