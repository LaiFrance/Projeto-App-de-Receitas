import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const randomDrinksContext = createContext();

const ExploreDrinksProvider = ({ children }) => {
  const [randomDrinks, setRandomDrinks] = useState([]);

  // Falta pegar o id da receitar e colocar no history
  useEffect(() => {
    const getRandomDrinks = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        console.log(data);
        setRandomDrinks(data.drinks);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    getRandomDrinks();
  }, []);

  return (
    <randomDrinksContext.Provider value={ { randomDrinks, getRandomDrinks } }>
      {children}
    </randomDrinksContext.Provider>
  );
};

ExploreDrinksProvider.protoType = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ExploreDrinksProvider;
