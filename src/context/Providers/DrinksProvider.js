import React, { useState, useEffect, createContext, useContext } from 'react';
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

  const allInformations = {
    splicedDrinks,
    setSplicedDrinks,
    categories,
    loading,
    setLoading,
    cocktail,
    setCocktail,
  };

  return (
    <DrinkContext.Provider value={ allInformations }>
      {children}
    </DrinkContext.Provider>
  );
}

export const useDataDrinks = () => useContext(DrinkContext);

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
