import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

export const randomContext = createContext();

const ExploreProvider = ({ children }) => {
  const [randomFood, setRandomFood] = useState([]);
  const [randomDrinks, setRandomDrinks] = useState([]);

  useEffect(() => {
    const getRandomFood = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        setRandomFood(data.meals[0].idMeal);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    getRandomFood();
  }, []);

  useEffect(() => {
    const getRandomDrinks = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        setRandomDrinks(data.drinks[0].idDrink);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    getRandomDrinks();
  }, []);

  return (
    <randomContext.Provider
      value={
        { randomFood, randomDrinks }
      }
    >
      {children}
    </randomContext.Provider>
  );
};

ExploreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useMyContext = () => useContext(randomContext);
export default ExploreProvider;
