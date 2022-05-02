import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { getDrinks, getDrinkCategories } from '../../services/index';

export const DrinkContext = createContext();

export default function DrinkProvider({ children }) {
  const [splicedDrinks, setSplicedDrinks] = useState([]); // primeiros doze itens
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = React.useState();
  const [cocktail, setCocktail] = React.useState(null);

  useEffect(() => {
    const firstDrinks = async () => {
      const info = await getDrinks();
      const category = await getDrinkCategories();
      setCategories(category);
      setSplicedDrinks(info);
    };
    firstDrinks();
  }, []);

  return (
    <DrinkContext.Provider
      value={ { splicedDrinks,
        categories,
        loading,
        setLoading,
        cocktail,
        setCocktail } }
    >
      {children}
    </DrinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
