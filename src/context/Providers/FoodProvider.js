import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';

export default function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    async function getMeals() {
      try {
        const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const request = await fetch(URL);
        const response = await request.json();
        setFoods(response.meals);
        console.log(response.meals);
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getMeals();
  }, []);

  return (
    <Context.Provider value={ { foods } }>
      {children}
    </Context.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
