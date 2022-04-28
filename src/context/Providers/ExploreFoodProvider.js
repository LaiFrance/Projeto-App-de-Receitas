import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const randomFoodContext = createContext();

const ExploreFoodProvider = ({ children }) => {
  const [randomFood, setRandomFood] = useState([]);

  const getRandomFood = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      setRandomFood(data.meals[0].idMeal);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <randomFoodContext.Provider value={ { randomFood, getRandomFood } }>
      {children}
    </randomFoodContext.Provider>
  );
};

ExploreFoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExploreFoodProvider;
