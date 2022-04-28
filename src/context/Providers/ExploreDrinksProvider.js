import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const randomDrinksContext = createContext();

const ExploreDrinksProvider = ({ children }) => {
  const [randomDrinks, setRandomDrinks] = useState([]);

  const getRandomDrinks = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const data = await response.json();
      setRandomDrinks(data.drinks[0].idDrink);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <randomDrinksContext.Provider value={ { randomDrinks, getRandomDrinks } }>
      {children}
    </randomDrinksContext.Provider>
  );
};

ExploreDrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExploreDrinksProvider;
