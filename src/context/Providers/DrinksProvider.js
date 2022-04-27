import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

export const DrinkContext = createContext();

export default function DrinkProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [splicedDrinks, setSplicedDrinks] = useState([]); // primeiros doze itens

  useEffect(() => {
    async function getDrinks() {
      try {
        const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const request = await fetch(URL);
        const response = await request.json();
        setDrinks(response.drinks);
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getDrinks();
  }, []);

  useEffect(() => {
    const doze = 12;
    if (drinks.length > 0) {
      const newDrinks = drinks.slice(0, doze);
      setSplicedDrinks(newDrinks);
    }
  }, [drinks]);

  return (
    <DrinkContext.Provider value={ { drinks, splicedDrinks } }>
      {children}
    </DrinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
